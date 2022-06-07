'''
label data, csv 파일로 정리
'''

import os
import json
import pandas as pd
from tqdm import tqdm

PATH = "../dataSet/splitLabels"

split = ['/train', '/test', '/val']

for part in split:

  df = pd.DataFrame(columns = {'categoryId', 'categoryName', 'fileName', 'bBoxX','bBoxY','bBoxW','bBoxH'})

  for (root, directories, files) in tqdm(os.walk(PATH+part)):
      for file in files:
          file_path = os.path.join(root, file)

          with open(file_path, encoding='UTF8') as (data_file):
            local = json.load(data_file)
          categoryId = local['categories'][0]['id']
          categoryName = local['categories'][0]['name']
          fileName = local['images'][0]['file_name']
          bBoxX,bBoxY,bBoxW,bBoxH = local['annotations'][0]['bbox']

          # print(categoryId, categoryName, fileName, bBoxX,bBoxY,bBoxW,bBoxH)
          newData = {'categoryId':categoryId, 'categoryName':categoryName, 'fileName':fileName,
              'bBoxX':bBoxX,'bBoxY':bBoxY,'bBoxW':bBoxW,'bBoxH':bBoxH}
          df = df.append(newData, ignore_index=True)

  df.to_csv('../labelsCsv'+part+'Labels.csv')
          