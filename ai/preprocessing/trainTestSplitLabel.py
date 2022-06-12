'''
Train/Test/Validation 나누기 (label 데이터)
'''

import splitfolders

PATH = "../dataSet/labels"

splitfolders.ratio(PATH, output="../dataSet/splitLabels", seed=1337, ratio=(.8,.1,.1))