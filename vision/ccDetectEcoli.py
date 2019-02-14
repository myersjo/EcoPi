
import numpy as np
import cv2 as cv


testImageFolder="../testImages/"
outputImageFolder="../outputImages/"

img=cv.imread(testImageFolder+"petriDish.png")
img=cv.cvtColor(img, cv.COLOR_BGR2GRAY)
#img=cv.GaussianBlur(img, (5, 5), 0)

retVal, threshImg=cv.threshold(img, 0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU)
cv.imwrite(outputImageFolder+"binarisedImage.png", threshImg)

connectComponentsImg,contours, hierarchy = cv.findContours(threshImg,cv.RETR_TREE,cv.CHAIN_APPROX_SIMPLE)


cv.drawContours(connectComponentsImg, contours, -1, (0,255,0), 3)
connectComponentsImn=cv.bitwise_not(connectComponentsImg)
cv.imwrite(outputImageFolder+"connectComponents.png", connectComponentsImg)

kernel = np.ones((3,3),np.uint8)
connectComponentsImg = cv.erode(connectComponentsImg,kernel,iterations = 1)
cv.imwrite(outputImageFolder+"erodedConnectComponents.png", connectComponentsImg)
