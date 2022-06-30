from flask import Flask, request, Response, jsonify, abort, send_from_directory
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
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

# 이미지 예측 결과를 순위별로 정렬해 반환
@application.route('/prediction', methods=['POST'])
def post():
  if request.method == 'POST':
    req = request.get_json()
    try:
      imageURL = req['imageURL']
    except KeyError:
      description = 'invalid request value (imageURL)'
      abort(400, description)

    # image 예측
    summary = prediction.predictImage(imageURL)
    
    if summary == 404:
      description = 'image not found, pleas check your URL and try again'
      abort(404, description)
    elif summary == 500:
      description = 'predict model not found, pleas check modle file'
      abort(500, description)

    # dictionary to Json
    summary['imageURL'] = imageURL
    summaryJson = json.dumps(summary)

    return Response(summaryJson, mimetype='application/json'), 200

# swagger
@application.route('/static/<path:path>')
def send_static(path):
  return send_from_directory('static, path')

SWAGGER_URL = '/api-docs'
API_URL = ('/static/swagger.json')

swaggerui_blueprint = get_swaggerui_blueprint(
  SWAGGER_URL,
  API_URL,
  config={
    'app_name' : "제주도 랜드마크 이미지 예측 API"
  }
)

application.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


if __name__ == '__main__':
  application.run(host='0.0.0.0', port=5003, debug=True)
