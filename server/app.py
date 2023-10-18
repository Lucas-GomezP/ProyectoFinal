from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/prueba', methods=['GET'])
def prueba():
  return jsonify({"members": ["member1", "member2", "member3"]})

if __name__ == '__main__':
  app.run(debug=True, port=4500)