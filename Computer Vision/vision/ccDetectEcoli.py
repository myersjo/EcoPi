import numpy as np
import cv2 as cv
import json
import math
import time
import sys
if not len(sys.argv)==2:
    print("Invalid Number of arguments")
    print("Usage python <script> <image> ")
    sys.exit(-1)

start=time.time()
imgName = sys.argv[1]


img = cv.imread(str(imgName))
h, w, c=img.shape
half_h=h//2
half_w=w//2

q1=img[0:half_h, 0:half_w]
q2=img[0:half_h, half_w+1:w]
q3=img[half_h+1:h, 0:half_w]
q4=img[half_h+1:h, half_w+1:w]
imgList=[q1, q2, q4, q4]
#####temp batch id#######
batch_id=0
imgNum=0
contourDict={}
jsonDict={}
for img in imgList:
    
    greyImg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    # img=cv.GaussianBlur(img, (5, 5), 0)

    retVal, threshImg = cv.threshold(greyImg, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

    connectComponentsImg = img.copy()
    contours, hierarchy = cv.findContours(threshImg, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    maxContourArea = 0
    maxContourIndex = 0
    i = 0
    maxChildList = []
    jsonList = []
    # The contour with the most children is likely to be circle containing the bacteria
    # This loop finds this contour, and creates a list of the indices of these child contours (bacteria)
    contourArea=0
    nonContourArea=0
    for contour in contours:
        nextContour = hierarchy[0][i][2]
        parent = i
        innerIndexes = []

        contourVals = []
        totalContourArea=0
        totalNonContourArea=cv.contourArea(contour)
        while nextContour > -1 and parent == i:
            innerIndexes.append(nextContour)
            perimeter = cv.arcLength(contour, True)
            contour = contours[nextContour]
            area = cv.contourArea(contour)
            hull = cv.convexHull(contour)
            hullArea = cv.contourArea(hull)
            mask = np.zeros(greyImg.shape, np.uint8)
            epsilon = .1 * perimeter
            approx = cv.approxPolyDP(contour, epsilon, True)
            cv.drawContours(mask, contours, nextContour, 255, -1)
            mean = cv.mean(greyImg, mask=mask)[0]
            totalContourArea+=area
            values = {
               
                "Contour ID": int(nextContour),
                "Perimeter": float(perimeter),
                "Area": float(area),
                "Solidity": float(float(area) / hullArea),
                "Circularity": float(4 * math.pi * area / (perimeter * perimeter)),
                "Mean Color (Greyscale)": mean,
                "Line Segments": len(approx)
            }
            nextContour = hierarchy[0][nextContour][0]
            parent = hierarchy[0][nextContour][3]
            contourVals.append(values)

        if len(innerIndexes) > len(maxChildList):
            maxChildList = innerIndexes

            jsonList = contourVals
            contourArea=totalContourArea
            
            nonContourArea=totalNonContourArea

        i += 1
    
    contourDict[imgNum]={}
    contourDict[imgNum]["BacteriaPercentage"]=float((100/nonContourArea)*contourArea)
    contourDict[imgNum]["ContourValues"]= jsonList
    # Drawing only the child bacteria
    for i in range(len(maxChildList)):
        cv.drawContours(connectComponentsImg, contours, maxChildList[i], (0, 255, 0), -1)

    cv.imwrite("detectedBacteria"+str(imgNum)+".png", connectComponentsImg)
    imgNum+=1
with open("results.json", "w+") as file:
        jsonDict[batch_id]={}
        jsonDict["dateTaken"]=start
        jsonDict[batch_id]["Dishes"]=contourDict
        
        json.dump(jsonDict, file)
end=time.time()
print(end-start)
