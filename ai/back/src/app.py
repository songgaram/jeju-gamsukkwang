from flask import Flask, request, Response, jsonify, abort
from flask_cors import CORS
import json
import prediction

application = Flask(__name__)
cors = CORS(application)

@application.errorhandler(400)
def resource_not_found(e):
    return jsonify(messager=str(e), code=e.code), 400

@application.errorhandler(404)
def resource_not_found(e):
    return jsonify(messager=str(e), code=e.code), 404

@application.errorhandler(500)
def resource_not_found(e):
    return jsonify(messager=str(e), code=e.code), 500

@application.route('/')
def index():
    return 'Hello World!'

@application.route('/prediction', methods=['POST'])
def post():
  if request.method == 'POST':
    req = request.get_json()
    try:
      imageURL = req['imageURL']
    except KeyError:
      description = 'invalid request value (imageURL)'
      abort(400, description)

    summary = prediction.predictImage(imageURL)
    
    if summary == 404:
      description = 'image not found, pleas check your URL and try again'
      abort(404, description)
    elif summary == 500:
      description = 'predict model not found, pleas check modle file'
      abort(500, description)

    summary['imageURL'] = imageURL
    summaryJson = json.dumps(summary)

    return Response(summaryJson, mimetype='application/json'), 200


if __name__ == '__main__':
  application.run(host='0.0.0.0', port=5003)
