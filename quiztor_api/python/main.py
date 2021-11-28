import os
from re import search
import sys

def testMeasure(fileName):
    s = 'python ./python/label_image.py \
    --input_mean 0 --input_std 255 --num_threads 12 \
    --model_file ./python/new_m_model.tflite --label_file ./python/class_labels.txt \
    --image ./' + fileName

    return s

  

def main(filename):
    s = filename
    stream = os.popen(testMeasure(s))
    output = stream.read()
    arr = output.split(": ")

    arr2 = arr[1].split("\n")
    print(arr2[0])

if __name__ == '__main__':
    main(sys.argv[1])