# from flask import Flask, jsonify      python  py -m venv .venv pip install flask .\.venv\Scripts\activate
# from flask_cors import CORS
# Importa y registra las rutas
#from api.routes import client
#from api.db.db import mysql 
from api import app
import sys


# app = Flask(__name__)

# CORS(app)

# @app.route('/', methods=['GET'])
# def prueba():
#   return jsonify({"members": ["member1", "member2", "member3"]})

# @app.route('/user', methods = ['GET'])
# def get_users():
#     cur = mysql.connection.cursor()
    
#     cur.execute('SELECT * FROM usuarios')
#     data = cur.fetchall()
   
#     return jsonify({"messaje":[data]})
  
if len(sys.argv) > 1 and sys.argv[1] == 'list':
  print(app.url_map)
elif __name__ == '__main__':
  app.run(debug=True, port=4500)