from api import app
from api.models.user import User
from flask import request, jsonify
#from api.utils import token_required, client_resource, user_resources
from api.db.db import mysql
import jwt
import datetime

@app.route('/login', methods = ['POST'])
def login():
    print("print [0]")
    auth = request.authorization
    print(auth)

    """ Control: existen valores para la autenticacion? """
    if not auth or not auth.username or not auth.password:
        return jsonify({"message": "No autorizado hello"}), 401       
            
    """ Control: existe y coincide el usuario en la BD? """
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM usuarios WHERE nombreusuario = %s AND contrasenia = %s', (auth.username, auth.password))
    row = cur.fetchone()

    if not row:
       return jsonify({"message": "No autorizado"}), 401  
    
    """ El usuario existe en la BD y coincide su contraseña """
    print("print row[0]",row[0])
    token = jwt.encode({'id': row[0],
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=100)}, app.config['SECRET_KEY'])
    print("token",token)
    print("row",row[0])
    print('entro')
    return jsonify({"token": token, "username": auth.username , "id": row[0]})


@app.route('/users')
def get_all():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM usuarios')
    data = cursor.fetchall()
    cursor.close()

    return str(data)
