from flask import Flask, request, Response, jsonify, abort
from flask_cors import CORS
import json
import prediction
from flask_swagger_ui import get_swaggerui_blueprint

application = Flask(__name__)
cors = CORS(application)


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Seans-Python-Flask-REST-Biolerplate"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

app.register_blueprint(request_api.get_blueprint())


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
