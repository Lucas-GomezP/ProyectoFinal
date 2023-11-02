from api import app
from api.models.client import Client
from flask import jsonify, request #permite devolver json
from api.utils import token_required, client_resource, user_resources
from api.db.db import mysql

#from api.utils import token_required, client_resource, user_resources

# @app.route('/test_client', methods=['GET'])
# def test():   
#     return jsonify( {"message": "ejemplo test clientes"} ), 404



# @app.route('/users', methods=['GET'])
# def get_client_by_id():
#     cur = mysql.connection.cursor()
#     cur.execute('SELECT * FROM usuarios')
#     data = cur.fetchall()
    
#     return jsonify( {"message": [data]} ), 404


@app.route('/user/<int:user_id>/client/<int:client_id>', methods = ['GET'])
@token_required
@user_resources
@client_resource
def get_client_by_id(user_id,client_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM clientes WHERE  id_usuario = {0} and  id_cliente = {1}'.format(user_id,client_id))
    data = cur.fetchall()
    print("------",user_id,"--------------------------",client_id,"print data",data)
    print(cur.rowcount)
    print("--------------------------------")
    print(data)
    if cur.rowcount > 0:
        objClient = Client(data[0])
        return jsonify( objClient.to_json() )
    return jsonify( {"message": "id not ale editado found"} ), 404

# retorna todos los clientes del usuario solicitado
@app.route('/user/<int:user_id>/client', methods = ['GET'])
@token_required
@user_resources
def get_all_clients_by_user_id(user_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM clientes WHERE id_usuario = {0}'.format(user_id))
    data = cur.fetchall()
    clientList = []
    for row in data:
        objClient = Client(row)
        clientList.append(objClient.to_json())
    if (len(clientList) > 0):    
        return jsonify(clientList)
    return jsonify({"messaje": "No se encontraron clientes"})

# @app.route('/user/<int:id_user>/client/<int:id_client>', methods=['POST'])
# @token_required
# @user_resources
# def create_client():
#     # capturo los datos en formato JSON
#     data = request.get_json()  
    
#     # Asegúrate de que los datos requeridos estén presentes en 'data'
#     required_fields = ['name', 'id_usuario']  # Por ejemplo, suponiendo que 'name' y 'email' son campos obligatorios
#     if not all(field in data for field in required_fields):
#         return jsonify({"message": "Faltan datos obligatorios"}), 400
    
#     new_client = Client(data)  
#    # Conexión a la base de datos
#     connection = mysql.connector.connect(
#         host='tu_host',
#         user='tu_usuario',
#         password='tu_contraseña',
#         database='tu_base_de_datos'
#     )
    
#     cursor = connection.cursor()
    
#     # Insertar el nuevo cliente en la base de datos
#     cursor.execute("INSERT INTO clientes (name, id_usuario) VALUES (%s, %s)")#, (new_client.name, id_user))
    
#     # Guardar los cambios en la base de datos
#     connection.commit()
    
#     # Cerrar la conexión
#     cursor.close()
#     connection.close()
    
#     return jsonify({"message": "Cliente creado exitosamente", "client_id": new_client.id}), 201