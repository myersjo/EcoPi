import numpy as np
import cv2 as cv
import json
import math
import time
import sys
from time import sleep
import requests
import os





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





def countBacteria(img, pos):
    
   
   
    newSnapshot={}
   
    greyImg = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    # img=cv.GaussianBlur(img, (5, 5), 0)

    retVal, threshImg = cv.threshold(greyImg, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

    
    contours, hierarchy = cv.findContours(threshImg, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
   
    jsonList = []
    jsonList,bacteriaPercentage, numbRegions=parseContours(hierarchy, contours, greyImg)
    
    # The contour with the most children is likely to be circle containing the bacteria
    # This loop finds this contour, and creates a list of the indices of these child contours (bacteria)
    if(numbRegions>0):
        newSnapshot["BacteriaPercentage"]=bacteriaPercentage
        newSnapshot["number_regions"]=numbRegions
        newSnapshot["regions"]= jsonList
    else:
        newSnapshot={}
    


    
    
    
    return newSnapshot
    
    

def parseContours(hierarchy, contours, greyImg): 
    
    i = 0
    maxChildList = []
    jsonList = []
    contourArea=0
    nonContourArea=0
    
    h, w=greyImg.shape
    imageArea=h*w
    for contour in contours:
        nextContour = hierarchy[0][i][2]
        
        parent = i
        innerIndexes = []

        contourVals = []
        totalContourArea=0
        totalNonContourArea=cv.contourArea(contour)
        if(totalNonContourArea>imageArea*.5):
        
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
                if hullArea==0:
                    solidity=-1
                else:
                    solidity=float(float(area) / hullArea)
                if perimeter==0:
                    circularity=-1
                else:
                    circularity=float(4 * math.pi * area / (perimeter * perimeter))
                cv.drawContours(mask, contours, nextContour, 255, -1)
                mean = cv.mean(greyImg, mask=mask)[0]
                totalContourArea+=area
                values = {
                
                    "Contour ID": int(nextContour),
                    "Perimeter": float(perimeter),
                    "Area": float(area),
                    "Solidity":solidity ,
                    "Circularity":circularity ,
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
    if nonContourArea>0:
        bacteriaPercentage=float((100/nonContourArea)*contourArea)
    else:
        bacteriaPercentage=0
    return jsonList, bacteriaPercentage, len(maxChildList)



def visionAnalysis(imgName):
   
    snapshotList={}
    
    for pos in range(4):
        snapshot={}
        img=readImage(imgName,pos)
        snapshot=countBacteria(img, pos)
        snapshotList[str(pos)]=snapshot
    with open('imageAnalysis.json', 'w') as outfile:
        json.dump(snapshotList, outfile)
    return snapshotList
        
   

