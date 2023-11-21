from api import app
from api.models.factura import Factura,ElementoDetalleFactura
from flask import jsonify, request #permite devolver json
from api.utils import token_required, factura_resource, user_resources, client_resource
from api.db.db import mysql


# retorna todas las facturas resumidas del usuario solicitado
@app.route('/user/<int:user_id>/client/<int:client_id>/facturas', methods = ['GET'])
@token_required
@user_resources
@client_resource
def get_all_factura_resumen_by_user_id(user_id,client_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM facturas WHERE id_usuario = {0}'.format(user_id))
    data = cur.fetchall()
    cur.close()
    #-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    fcList = []
    for row in data:
        objFactura = Factura(row)
        fcList.append(objFactura.to_json())
    if (len(fcList) > 0):    
        return jsonify(fcList)
    #-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --    
    return jsonify({"messaje": "No se encontraron Facturas relacionadas con el usuario"})

# retorna la factura id, del usuario solicitado
@app.route('/user/<int:user_id>/client/<int:client_id>/facturas/<int:factura_id>', methods=['GET'])
@token_required
@user_resources
@client_resource
@factura_resource  # Verificamos que la factura solicitada puede ser accedida por el usuario
def get_factura_by_id(user_id, client_id,factura_id):
    cur = mysql.connection.cursor()

    # 1ero. consultamos para obtener la factura
    cur.execute('SELECT * FROM facturas WHERE id_usuario = %s AND id_factura = %s', (user_id, factura_id))
    data = cur.fetchall()

    # ToDo borrar luego
    print(data)

    if cur.rowcount > 0:
        objFactura = Factura(data[0])

        # 2do. consultamos el detalle de la factura
        cur.execute('SELECT * FROM detalle_facturas WHERE id_factura = %s', (factura_id,))
        data_detalle = cur.fetchall()

        if cur.rowcount > 0:
            # procesamos los resultados de la segunda consulta
            # creamos una lista detalle de la Factura
            detalles_factura = [ElementoDetalleFactura(detalle).to_json() for detalle in data_detalle]
            # Cierre del cursor 
            cur.close()          
            # creamos un diccionario que incluya la información de la factura y los detalles
            response_data = {
                "factura": objFactura.to_json(),
                "detalles": detalles_factura
            }

            # Cierre del cursor y retorno de la respuesta
            cur.close()
            return jsonify(response_data)

    # Cierre del cursor y respuesta para el caso de que la factura no se encuentre
    cur.close()
    return jsonify({"message": "ID not found"}), 404

# crea factura. y en caso de exito retorna la factura creada. de lo contrario retorna el error.
@app.route('/user/<int:user_id>/facturas', methods=['POST'])
@token_required
@user_resources
@client_resource
def crear_fc(user_id):
    try:       
        datos = request.get_json() 
        print(datos)
        new_factura,detalle_new_fc = Factura.create_fc(user_id,datos)
        return jsonify({"encabezado":new_factura,"detalle":detalle_new_fc,"message": "Se creo FC de forma exitosa"}), 201
    except: # mysql.connector.Error as e:
        return jsonify({"message":"erorrada"}), 408
       # return jsonify({"message": f"Error en la base de datos: {e}"}), 500
    
"""
@app.route('/user/<int:user_id>/oferta/<int:oferta_id>', methods=['DELETE'])
@token_required
@user_resources
@oferta_resource
def desactivar_oferta(user_id, oferta_id):
    try:
        # Comprobamos si la oferta pertenece al usuario
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM oferta WHERE id_oferta = %s AND id_usuario = %s AND estado = "A"', (oferta_id, user_id))
        oferta = cur.fetchone()
        cur.close()

        if not oferta:
            return jsonify({"message": "Oferta no encontrada"}), 404

        print("borrando oferta: ",oferta)
        # Cambiamos el estado de la oferta a inactivo ('I')
        cur = mysql.connection.cursor()
        cur.execute('UPDATE oferta SET estado = %s WHERE id_oferta = %s', ('I', oferta_id))
        mysql.connection.commit()
        cur.close()

        return jsonify({"message": "Oferta desactivada exitosamente"}), 200
    except mysql.connector.Error as e:
        return jsonify({"message": f"Error en la base de datos: {e}"}), 500
    
@app.route('/user/<int:user_id>/oferta/<int:oferta_id>', methods=['PUT'])
@token_required
@user_resources
@oferta_resource
def update_oferta(user_id, oferta_id):
    try:
        # campos que pueden ser actualizados
        CAMPOS_ACTUALIZABLES = ['nombre', 'tipo', 'descripcion', 'precio', 'stock', 'disponibilidad','id_usuario','estado']
        TIPO_OFERTA = ['P','S']

        # datos json
        datos = request.get_json() 
        
        # comprobamos si se proporcionaron los datos necesarios    
        if not datos or not all(campo in datos for campo in CAMPOS_ACTUALIZABLES):
            return jsonify({"message": "Datos incompletos"}), 400

        # extraemos la información de los campos
        info_campos = {campo: datos[campo] for campo in CAMPOS_ACTUALIZABLES}
        
        # verificamos si el tipo es válido
        if info_campos['tipo'] not in TIPO_OFERTA:
            return jsonify({"message": "Tipo de oferta incorrecto"}), 400

        # armamos la query para la actualización en la base de datos
        cur = mysql.connection.cursor()
        consulta = 'UPDATE oferta SET {} WHERE id_oferta = %s AND id_usuario = %s'.format(
            ', '.join([f"{campo} = %s" for campo in info_campos.keys()])
        )
        valores = list(info_campos.values()) + [oferta_id, user_id]
        cur.execute(consulta, valores)
        mysql.connection.commit()
        cur.close()

        return jsonify({"message": "Actualización exitosa"}), 200

    except mysql.connector.Error as e:
        return jsonify({"message": f"Error en la base de datos: {e}"}), 500
        """