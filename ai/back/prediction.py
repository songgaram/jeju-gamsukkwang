import tensorflow as tf
from keras.utils import load_img,img_to_array
from keras.models import load_model
import numpy as np
import pandas as pd
import urllib.request
from PIL import Image

def predictImage(imageURL):

  model = tf.keras.models.load_model('model/efficientModel.h5')

  res = urllib.request.urlopen(imageURL) 
  img = Image.open(res)
  # img = load_img('./test.jpg', target_size=(224,224))

  img = img.resize((224,224))
  img = img_to_array(img)
  img = img/255.0

  pred = model.predict(img.reshape((1, 224,224,3)))
  probsArgsort = tf.argsort(pred, direction='DESCENDING')
  
  category = pd.read_csv('categoryList.csv', encoding='cp949')

  summary = {}
  categoryDict = {}
  categoriesList = []
  for i in range(5):
    index = int(probsArgsort[0][i])

    categoryDict['ranking'] = int(probsArgsort[0][i])
    categoryDict['categoryName'] = category[category['categoryNumber']==index]['categoryName'].values[0]
    categoryDict['percentage'] = round(pred[0][[probsArgsort[0][i]]]*100, 2)
    categoriesList.append({
                            'ranking': i+1,
                            'categoryName':category[category['categoryNumber']==index]['categoryName'].values[0],
                            'percentage':round(pred[0][[probsArgsort[0][i]]]*100, 2)
                          })
  
  summary['summary'] = categoriesList
  
  return summary


