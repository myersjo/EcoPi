import numpy as np
import cv2 as cv
import json
import math
import time
import sys
import requests


#####temp batch id#######
#Need to figure out how and when I.D's are assigned to petri dish
batch_id=0
port="3000"
apiPrefix = '/api'
apiVersion = '/v1.0'
##Unique to my own set up
ipAddress="http://192.168.192.41:"


def readImage(imgName, pos):

    
    img = cv.imread(str(imgName))
    h, w, c=img.shape
    half_h=h//2
    half_w=w//2
    if pos==0:
        q1=img[0:half_h, 0:half_w]
        return q1
    elif pos==1:
        
        q2=img[half_h+1:h, 0:half_w]
        return q2
    elif pos==2:
        q3=img[0:half_h, half_w+1:w]
        return q3
    else:
        q4=img[half_h+1:h, half_w+1:w]
        return q4





def countBacteria(img, jsonData):
    
   
    snapshots=jsonData["snapshots"]
    newSnapshot={}
    newSnapshot["timestamp"]=time.time()
    newSnapshot["incubator_state"]={}
    newSnapshot["incubator_state"]["temperature"]=-1
    newSnapshot["incubator_state"]["humidity"]=-1
    newSnapshot["image_analysis"]={}
    greyImg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    # img=cv.GaussianBlur(img, (5, 5), 0)

    retVal, threshImg = cv.threshold(greyImg, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

    connectComponentsImg = img.copy()
    contours, hierarchy = cv.findContours(threshImg, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    maxChildList = []
    jsonList = []
    jsonList,bacteriaPercentage, numbRegions=parseContours(hierarchy, contours, greyImg)
    
    # The contour with the most children is likely to be circle containing the bacteria
    # This loop finds this contour, and creates a list of the indices of these child contours (bacteria)
    
    newSnapshot["image_analysis"]["BacteriaPercentage"]=bacteriaPercentage
    newSnapshot["image_analysis"]["number_regions"]=numbRegions
    newSnapshot["image_analysis"]["regions"]= jsonList
    # Drawing only the child bacteria
    for i in range(len(maxChildList)):
        cv.drawContours(connectComponentsImg, contours, maxChildList[i], (0, 255, 0), -1)

    cv.imwrite("detectedBacteria"+str(batch_id)+".png", connectComponentsImg)
    
    snapshots.append(newSnapshot)
    jsonData["snapshots"]=snapshots
    return newSnapshot
    
    

def parseContours(hierarchy, contours, greyImg): 
    
    i = 0
    maxChildList = []
    jsonList = []
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
    bacteriaPercentage=float((100/nonContourArea)*contourArea)
    return jsonList, bacteriaPercentage, len(maxChildList)
def sendToServer(snapshot, img):
   
    r=requests.post(ipAddress+port+apiPrefix+apiVersion+"/snapshot", json=snapshot)
    print(r.status_code)
    print(r.content)

    #for image
    #r=requests.post(ipAddress+port+apiPrefix+apiVersion+"/image", data=img)
    #print(r.status_code)

def main():

    if not len(sys.argv)==3:
        print("Invalid Number of arguments")
        print("Usage python <script> <image> <json file name>")
        sys.exit(-1)
    imgName = sys.argv[1]
    jsonName=sys.argv[2]
    snapshot={}
    with open(jsonName, "r+") as jsonFile:
        jsonData=json.load(jsonFile)
        pos=jsonData["position"]
        img=readImage(imgName,pos)
        
        snapshot=countBacteria(img, jsonData)
        jsonFile.seek(0)
        json.dump(jsonData, jsonFile)
        jsonFile.truncate()
    sendToServer(snapshot, img)
        
   

if __name__=="__main__":
    main()