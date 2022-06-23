from ast import expr_context
from urllib.error import URLError
import tensorflow as tf
from keras.utils import img_to_array
from keras.models import load_model
import pandas as pd
import urllib.request
from PIL import Image

def predictImage(imageURL):

  try:
    model = load_model('model/epoch_0027.h5')
  except:
    return 500

  try:
    res = urllib.request.urlopen(imageURL) 
    img = Image.open(res)
  except:
    return 404

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


