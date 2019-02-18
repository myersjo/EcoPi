import numpy as np
import cv2 as cv

testImageFolder = "../testImages/"
outputImageFolder = "../outputImages/"

img = cv.imread(testImageFolder + "petriDish.png")

greyImg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
# img=cv.GaussianBlur(img, (5, 5), 0)

retVal, normalThreshImg = cv.threshold(greyImg, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)
# Eroding binary Image
erodedImg=normalThreshImg.copy()
kernel = np.ones((5, 5), np.uint8)
erodedImg = cv.erode(erodedImg, kernel, iterations=1)

threshImgs = [normalThreshImg, erodedImg]
resultImgs = []
for threshImg in threshImgs:
    connectComponentsImg=img.copy()
    contours, hierarchy = cv.findContours(threshImg, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    maxContourArea = 0
    maxContourIndex = 0
    i = 0
    maxChildList=[]
    # The contour with the most children is likely to be circle containing the bacteria
    # This loop finds this contour, and creates a list of the indices of these child contours (bacteria)
    for contour in contours:
        nextContour = hierarchy[0][i][2]
        parent = i
        innerIndexes = []
        while nextContour > -1 and parent == i:
            innerIndexes.append(nextContour)
            nextContour = hierarchy[0][nextContour][0]
            parent = hierarchy[0][nextContour][3]
        if len(innerIndexes) > len(maxChildList):
            maxChildList = innerIndexes
        i += 1

    # Drawing only the child bacteria
    for i in range(len(maxChildList)):
        cv.drawContours(connectComponentsImg, contours, maxChildList[i], (0, 255, 0), -1)
    resultImgs.append(connectComponentsImg)

cv.imwrite(outputImageFolder + "detectedBacteria.png", resultImgs[0])


cv.imwrite(outputImageFolder + "erodedDetectedBacteria.png", resultImgs[1])
