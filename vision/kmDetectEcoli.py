import numpy as np
import cv2 as cv


testImages="../testImages/"
outputImages="../outputImages/"


img=cv.imread(testImages+"petriDish.png")


#https://docs.opencv.org/3.0-beta/doc/py_tutorials/py_ml/py_kmeans/py_kmeans_opencv/py_kmeans_opencv.html
Z = img.reshape((-1,3))

# convert to np.float32
Z = np.float32(Z)

# define criteria, number of clusters(K) and apply kmeans()
criteria = (cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, 10, 1.0)
K = 2
ret,label,center=cv.kmeans(Z,K,None,criteria,10,cv.KMEANS_RANDOM_CENTERS)

# Now convert back into uint8, and make original image
center = np.uint8(center)
res = center[label.flatten()]
res2= res.reshape((img.shape))

res2=cv.cvtColor(res2, cv.COLOR_BGR2GRAY)
#://docs.opencv.org/3.0-beta/doc/py_tutorials/py_ml/py_kmeans/py_kmeans_opencv/py_kmeans_opencv.html
retVal, threshImg=cv.threshold(res2, 0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU)
cv.imwrite(outputImages+"binarisedImage.png", threshImg)

connectComponentsImg,contours, hierarchy = cv.findContours(threshImg,cv.RETR_TREE,cv.CHAIN_APPROX_SIMPLE)


cv.drawContours(connectComponentsImg, contours, -1, (0,255,0), 3)
connectComponentsImn=cv.bitwise_not(connectComponentsImg)
cv.imwrite(outputImages+"connectComponents.png", connectComponentsImg)

kernel = np.ones((3,3),np.uint8)
connectComponentsImg = cv.erode(connectComponentsImg,kernel,iterations = 1)
cv.imwrite(outputImages+"erodedConnectComponents.png", connectComponentsImg)

cv.imwrite(outputImages+"kmeansImg.png", res2)
