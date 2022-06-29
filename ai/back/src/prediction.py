import tensorflow as tf
from keras.utils import img_to_array
from keras.models import load_model
import pandas as pd
import urllib.request
from PIL import Image

def predictImage(imageURL):

  MODELPATH = '../public/model/model.h5'
  CATEGORYPATH = '../public/categoryList.csv'

  try:
    model = load_model(MODELPATH)
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
  
  category = pd.read_csv(CATEGORYPATH, encoding='cp949')

  summary = {}
  categoriesList = []
  for i in range(5):
    index = int(probsArgsort[0][i])

    categoriesList.append({
                            'ranking': i+1,
                            'categoryName':category[category['categoryNumber']==index]['categoryName'].values[0],
                            'percentage':round(pred[0][probsArgsort[0][i]]*100, 2)
                          })
  
  summary['summary'] = categoriesList
  
  return summary

