'''
Train/Test/Validation 나누기 (image 데이터)
'''

import splitfolders

PATH = "../dataSet/images"

splitfolders.ratio(PATH, output="../dataSet/splitImages", seed=1337, ratio=(.8,.1,.1))