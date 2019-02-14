The two scripts in this directory use two slightly different methods to find the bacteria in the 
image. Images are sourced from "testImages" and exported to "outputImages".

kmDetectEcoli.py

    -The Kmeans algorith is first applied. This reduces the amount of colours allowed in the image
    to less than or equal to 2
    
    -The image is converted to grey scale and it is thresholded, i.e binarised

    -A number of contours are then located in the image. Contours are regions in the image which are
    connected to one another and share the same colour

    -The image is then eroded. This simply removes noise from the image by removing small connected 
    components, while expanding bigger ones

ccDetectEcoli.py

    Does the same as above, minus the kmeans step


Stats that I have thought up of so far that can be obtained.

    The circularity of each connected component(cc)
    The area of each cc
    The perimeter of each cc, (why?)

Im sure there are others that I can not think of though
