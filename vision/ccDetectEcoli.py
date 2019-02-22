import numpy as np
import cv2 as cv
import json
import math
import time

start=time.time()
testImageFolder = "../testImages/"
outputImageFolder = "../outputImages/"

img = cv.imread(testImageFolder + "petriDish.png")

greyImg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
# img=cv.GaussianBlur(img, (5, 5), 0)

retVal, threshImg = cv.threshold(greyImg, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

connectComponentsImg = img.copy()
contours, hierarchy = cv.findContours(threshImg, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
maxContourArea = 0
maxContourIndex = 0
i = 0
maxChildList = []
jsonDict = []
# The contour with the most children is likely to be circle containing the bacteria
# This loop finds this contour, and creates a list of the indices of these child contours (bacteria)

for contour in contours:
    nextContour = hierarchy[0][i][2]
    parent = i
    innerIndexes = []

    contourVals = []
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

        jsonDict = contourVals

    i += 1
with open("results.json", "w+") as file:
    json.dump(jsonDict, file)
# Drawing only the child bacteria
for i in range(len(maxChildList)):
    cv.drawContours(connectComponentsImg, contours, maxChildList[i], (0, 255, 0), -1)

cv.imwrite(outputImageFolder + "detectedBacteria.png", connectComponentsImg)
end=time.time()
print(end-start)
