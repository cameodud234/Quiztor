# import libraries
import csv
from pprint import pprint
import os
import sys

import numpy

import cv2
import pytesseract


def pre_processing(image):
    """
    This function take one argument as
    input. this function will convert
    input image to binary image
    :param image: image
    :return: thresholded image
    """
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # converting it to binary image
    threshold_img = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    # saving image to view threshold image
    cv2.imwrite('thresholded.png', threshold_img)

    #cv2.imshow('threshold image', threshold_img)
    # Maintain output window until
    # user presses a key
    #cv2.waitKey(0)
    # Destroying present windows on screen
    #cv2.destroyAllWindows()

    return threshold_img


def parse_text(threshold_img):
    """
    This function take one argument as
    input. this function will feed input
    image to tesseract to predict text.
    :param threshold_img: image
    return: meta-data dictionary
    """
    # configuring parameters for tesseract
    tesseract_config = r'--oem 3 --psm 11'
    # now feeding image to tesseract
    details = pytesseract.image_to_data(threshold_img, output_type=pytesseract.Output.DICT,
                                        config=tesseract_config, lang='eng')
    return details


def format_text(details):
    """
    This function take one argument as
    input.This function will arrange
    resulted text into proper format.
    :param details: dictionary
    :return: list
    """
    parse_text = []
    word_list = []
    last_word = ''
    for word in details['text']:
        if word != '':
            word_list.append(word)
            last_word = word
        if (last_word != '' and word == '') or (word == details['text'][-1]):
            parse_text.append(word_list)
            word_list = []

    return parse_text


def write_text(formatted_text):
    """
    This function take one argument.
    it will write arranged text into
    a file.
    :param formatted_text: list
    :return: None
    """
    with open('resulted_text.txt', 'w', newline="") as file:
        csv.writer(file, delimiter=" ").writerows(formatted_text)


if __name__ == "__main__":
    # this is for your windows device : 
    pytesseract.pytesseract.tesseract_cmd=r'Tesseract-OCR/tesseract.exe'

    # this is for my mac device: 
    # pytesseract.pytesseract.tesseract_cmd=r'/usr/local/Cellar/tesseract/4.1.3/bin/tesseract'

    image = cv2.imread(sys.argv[1])
    thresholds_image = pre_processing(image)

    parsed_data = parse_text(thresholds_image)

    arranged_text = format_text(parsed_data)

    #write_text(arranged_text)
    for i in range(len(arranged_text) - 1):
        if (i < len(arranged_text)):
            if (not arranged_text[i]) :
                arranged_text.pop(i)

    final_str = ''
    for i in arranged_text:
        for j in i:
            final_str += j + '_'
    
    print(final_str)
