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
        return jsonify({"message": "No autorizado"}), 401       
            
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
def get_all_users():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM usuarios')
    data = cursor.fetchall()
    cursor.close()

    return str(data)


@app.route('/users', methods = ['POST'])
def create_user():
    try:
        cur = mysql.connection.cursor()
        cur = mysql.connection.cursor()
        #data = request.get_json() #para implementar con metodo de clase
        nombreusuario = request.get_json()['nombreusuario']
        contrasenia = request.get_json()['contrasenia']
        #surname = request.get_json()['surname']
        #dni = request.get_json()['dni']
        #email = request.get_json()['email']

        # Se verifica si el usuario ya existe
        cur.execute("SELECT * FROM usuarios WHERE nombreusuario = %s", (nombreusuario,))
        usuario_existente = cur.fetchone()

        if usuario_existente:
            return {"message: ": "El usuario ya existe."}, 400     
        # Insertar nuevo usuario
        cur.execute("INSERT INTO usuarios (nombreusuario, contrasenia) VALUES (%s, %s)", (nombreusuario, contrasenia))
        mysql.connection.commit()        
        cur.close()
        return {"message: ": "Usuario creado exitosamente"}, 201
    
    except Exception as e:
        return str(e), 500 #Error interno del servidor
    

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        cur = mysql.connection.cursor()
        # Se verifica si el usuario existe antes de actualizar
        cur.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (user_id,)) #Verifica si existe usuario
        usuario_existente = cur.fetchone()
        if not usuario_existente:
            return {"message": "Usuario no encontrado."}, 404
        
        nombreusuario = request.get_json()['nombreusuario']
        contrasenia = request.get_json()['contrasenia']
        # Se actualizan los datos del usuario en la BDD
        cur.execute("UPDATE usuarios SET nombreusuario = %s, contrasenia = %s WHERE id_usuario = %s", (nombreusuario, contrasenia, user_id))
        mysql.connection.commit()
        cur.close()

        return {"message": "Usuario actualizado exitosamente"}, 200
    except Exception as e:
        return str(e), 500  # Error interno del servidor
    
    
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        cur = mysql.connection.cursor()
        # Verificar si el usuario existe antes de eliminar
        cur.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (user_id,))
        usuario_existente = cur.fetchone()

        if not usuario_existente:
            return {"message": "Usuario no encontrado."}, 404
        cur.execute("DELETE FROM usuarios WHERE id_usuario = %s", (user_id,)) # Eliminar el usuario
        mysql.connection.commit()
        cur.close()
        return {"message": "Usuario eliminado exitosamente"}, 200
    except Exception as e:
        return str(e), 500  # Error interno del servidor