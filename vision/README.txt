Images are sourced from testImages, and outputted to outputImages
    
    -The image is converted to grey scale and it is thresholded, i.e binarised

    -The following steps are applied to both an eroded, and normal binary image produced from the 
    above step

    -A number of contours are then located in the image. Contours are regions in the image which are
    connected to one another and share the same colour

    -We are trying to find a circular contour which represents the base of the petri dish, with a 
    number of child contours (bacteria)
        
        -This is done by getting the contour with the largest amount of child contours

    -These child contours are drawn onto an image, which can be found in output Images


Stats that I have thought up of so far that can be obtained.

    The circularity of each connected component(cc)
    The area of each cc
    The perimeter of each cc, (why?)

Im sure there are others that I can not think of though
