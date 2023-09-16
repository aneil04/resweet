import cv2
import pytesseract
import imutils
from imutils.perspective import four_point_transform
import re
import argparse

original=cv2.imread('/content/drive/MyDrive/receipt_examples/example5.jpg')
im=original.copy()
im = imutils.resize(im, width=500)
ratio = original.shape[1] / float(im.shape[1])
gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5,), 0)
edge = cv2.Canny(blur, 75, 200)
cnts = cv2.findContours(edge.copy(), cv2.RETR_EXTERNAL,
	cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)
cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
receiptCnt = None
for c in cnts:
	peri = cv2.arcLength(c, True)
	approx = cv2.approxPolyDP(c, 0.02 * peri, True)
	if len(approx) == 4:
		receiptCnt = approx
		break
if receiptCnt is None:
	raise Exception(("Could not find receipt outline. "
		"Try debugging your edge detection and contour steps."))
output = im.copy()
cv2.drawContours(output, [receiptCnt], -1, (0, 255, 0), 2)
receipt = four_point_transform(original, receiptCnt.reshape(4, 2) * ratio)
gray2=cv2.cvtColor(receipt, cv2.COLOR_BGR2GRAY)
ret1, th1 = cv2.threshold(gray2, 158, 255, cv2.THRESH_BINARY)
ret2, th2 = cv2.threshold(th1, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
b = cv2.GaussianBlur(th2, (1, 1), 0)
th3 = cv2.adaptiveThreshold(b,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,\
            cv2.THRESH_BINARY,11,2)

options = "--psm 4"
text = pytesseract.image_to_string(im,config=options)
print(text)