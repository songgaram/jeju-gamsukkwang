from distutils.log import debug
from flask import Flask, request, Response
from flask_cors import CORS
import json
import prediction

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/prediction', methods=['POST'])
def post():
  if request.method == 'POST':
    res = request.get_json()
    imageURL = res['imageURL']
    summary = prediction.predictImage(imageURL)
    summary['imageURL'] = imageURL
    summaryJson = json.dumps(summary)

    return summaryJson, 200
    

if __name__ == '__main__':
  app.run(port=5001, debug=True)