from datetime import datetime
from api.db.db import mysql,DBError 
from flask import jsonify
class Factura():
    schema ={
        "id_usuario": int,
        "id_cliente": int,
        "fecha": str,
        "importe_total": float,
        "descripcion": str,
        "estado": int
    }

    @staticmethod
    def check_data_schema(data):
        # Verificamos si 'data' es nulo o no es un diccionario        
        if data is None or type(data) != dict:
            return False                
        # Iteramos sobre las claves del esquema de datos de Factura
        for key in Factura.schema:            
            # Verificamos si cada clave está presente en 'data'
            if key not in data:
                # Si falta alguna clave, retornamos False
                return False
            # Si la llave es fecha
            if key == "fecha":                
                # Verificamos si el tipo de dato de la clave coincide con el esquema
                if type(data['fecha']) != Factura.schema["fecha"]:
                    # Si no coincide                    
                    return False
                
                try:
                    # Intentamos convertir la fecha al formato esperado
                    datetime.strptime(data["fecha"], "%Y-%m-%d")
                
                except ValueError:                
                    # Si hay un error en la conversión, la fecha no tiene el formato esperado
                    return False
            # Para las demas llaves que no soy fecha verificamos que coincidan los 
            elif type(data[key]) != Factura.schema[key]:
                return False            
        print("-------*-----------*--------ok hasta aca")
        # Si hemos pasado todas las verificaciones, retornamos True        
        return True

    def __init__(self, row):
        print("-------*-----------*--------")
        print("----------")
        print(row,type(row))
        # self._id_factura = row['id_factura']
        # self._id_usuario = row['id_usuario']
        # self._id_cliente = row['id_cliente']
        # self._fecha = row['fecha']
        # self._importe = row['importe_total']
        # self._descripcion = row['descripcion']
        # self._estado = row['estado']
        self._id_factura = row[0]
        self._id_usuario = row[1]
        self._id_cliente = row[2]
        self._fecha = row[3]
        self._importe = row[4]
        self._descripcion = row[5]
        self._estado = row[6]

    def to_json(self):
        return {
            "id": self._id_factura,
            "id_usuario": self._id_usuario,
            "id_cliente": self._id_cliente,
            "fecha": self._fecha,
            "importe": self._importe,
            "descripcion": self._descripcion,
            "estado": self._estado
        }
    @staticmethod
    def update_total_fc(total,id):
        cur = mysql.connection.cursor()
        cur.execute("UPDATE facturas SET importe_total = %s WHERE id_factura = %s",(total,id))
        mysql.connection.commit()        
        if cur.rowcount > 0:
            cur.close()
            return True
        cur.close()
        return False
    
    def create_fc(user_id,data_fc):
        print("Creaando fc...")
        # Verificamos si 'data_fc' está vacío o no es un diccionario
        if not data_fc:# or not isinstance(data_fc, dict):
            raise ValueError("El JSON recibido está vacío o no es un diccionario")       

        # Verificamos si 'data_fc' contiene las claves 'encabezado' y 'detalle_fc'
        if 'encabezado' not in data_fc or 'detalle_fc' not in data_fc:            
            raise ValueError("El JSON no contiene las secciones 'encabezado' o 'detalle_fc'")

        # Obtenemos 'encabezado' y 'detalle_fc' del JSON recibido
        data_encabezado, data_detalle = data_fc["encabezado"], data_fc["detalle_fc"]
        # verificamos los datos                
        if Factura.check_data_schema(data_encabezado):# and ElementoDetalleFactura.check_data_schema(user_id,data_detalle):            
            print("check ok")
            CAMPOS_REQUERIDOS = list(Factura.schema.keys())   
            print(CAMPOS_REQUERIDOS)         
            info_campos = {campo: data_encabezado[campo] for campo in CAMPOS_REQUERIDOS}             
            print(info_campos)
            cur = mysql.connection.cursor()
            
            encabezado = 'INSERT INTO facturas ({}) VALUES ({})'.format(
            ', '.join(info_campos.keys()), ', '.join(['%s'] * len(info_campos)))     
            print("consulta",encabezado)       
            valores = tuple(info_campos.values())           
            print("valores",valores,type(valores))
            cur.execute(encabezado, valores)
            #cur.execute(encabezado, (valores,))     
            print("---------------------------------**")       
            mysql.connection.commit()
            print("rowcount ----->                 ", cur.rowcount)            
            if cur.rowcount > 0:  
                print("--------------------------------")                                      
                cur.execute("SELECT LAST_INSERT_ID()")   #devuelve el ultimo valor insertado en la tabla SQL             
                res = cur.fetchall()  #todo ver de reemplazar por fetchone()              
                id = res[0][0]                
                info_campos['id_factura'] = id 
                cur.close()               
                # aca iria el texto que crea los registros de la tabla detalle factura
                # digamos que dentro de los datos que recibo existe datos_detalle
                # schema = {        "id_factura" : int,        "id_oferta":int,        "detalle": str,        "importe": float,       "cantidad": int    }               
                detalle,total_fc = ElementoDetalleFactura.insertar_detalle(id, data_detalle)
                print("valores posterior a insert",detalle)
                print("valores posterior a insert",total_fc)
                Factura.update_total_fc(total_fc,id)
                info_campos['importe_total']=total_fc
                print("info campos", info_campos)
                #falta actualizar el stock
                print("/*/*/*/*/*//****************")
                print(detalle,type(detalle))                     
                for elemento in detalle:
                    if not Factura.update_stock_oferta(elemento[2], elemento[4]):
                        return 'Error al actualizar stock'                          
                return Factura(info_campos).to_json(),detalle                
            raise DBError("Error al insertar datos", encabezado)
        raise TypeError("Error tipos")
        
    @staticmethod
    def update_stock_oferta(id_oferta, cantidad_vendida):
        print("update stock oferta")
        print(id_oferta,cantidad_vendida)
        #actualiza el stock de una oferta
        cur = mysql.connection.cursor()
        cur.execute("SELECT stock FROM oferta WHERE id_oferta = %s ",(id_oferta,))
        stock_actual = cur.fetchone()
        nuevo_stock = stock_actual[0] - cantidad_vendida
        cur.execute("UPDATE oferta SET stock = %s WHERE id_oferta = %s",(nuevo_stock,id_oferta))
        mysql.connection.commit()   
        print("estamos locos")     
        if cur.rowcount > 0:
            cur.close()
            return True
        cur.close()
        return False
    
class ElementoDetalleFactura:
    schema = {        
        "id_oferta":int,   
        "importe":float, 
        "cantidad": int
    }
    @staticmethod
    def check_data_schema(user_id,elementos):
        # Verificamos si la lista de elementos está vacía
        if not elementos:
            return False, "Lista vacía"  # Retornamos False y mensaje de lista vacía
        print("lista de elementos", elementos)
        try:
            print("try")
            with mysql.connection.cursor() as cursor:
                print("try 1")
                # Iteramos sobre la lista
                for elemento in elementos:
                    print("try 2")
                    # Verificamos para cada 'elemento' es nulo o no es un diccionario
                    if elemento is None or not isinstance(elemento, dict):
                        print("1")
                        return False, "Elemento inválido"  # Retornamos False y mensaje de elemento inválido
                    
                    # Iteramos sobre las claves del esquema de detalla factura
                    #for key in ElementoDetalleFactura.schema:
                    for key in ["id_oferta", "cantidad"]:
                        # Verificamos si cada clave está presente en 'elemento'
                        if key not in elemento:
                            # Si falta alguna clave, retornamos False
                            print("2")
                            return False, f"Falta '{key}' en el elemento"  # Retornamos False y mensaje de clave faltante
                        
                        # Verificamos que coincidan los tipos en el elemento con los tipos en schema
                        if type(elemento[key]) != ElementoDetalleFactura.schema[key]:    
                            print("3")            
                            return False, f"Tipo incorrecto para '{key}' en el elemento"  # Retornamos False y mensaje de tipo incorrecto
                    
                        # Consultamos que cada elemento tenga stock / servicio disponible
                        query = """
                            SELECT 
                                COUNT(*) 
                            FROM 
                                oferta 
                            WHERE 
                                id_usuario = %s 
                                AND estado = 'A' 
                                AND id_oferta = %s
                                AND IF(
                                    (SELECT tipo FROM oferta WHERE id_oferta = %s) = 'P',
                                    stock >= %s, 
                                    disponibilidad = %s
                                ) 
                                
                        """
                        # Ejecutamos la consulta con los parámetros correspondientes
                        cursor.execute(query, (
                            user_id,
                            elemento["id_oferta"],
                            elemento["id_oferta"],
                            elemento["cantidad"],
                            elemento["cantidad"]                        
                        ))
                        print("4")
                        # Obtenemos el resultado de la consulta
                        result = cursor.fetchone()
                        print("5")

                        # Verificamos si el resultado es mayor a 0
                        if result[0] <= 0:
                            print("6")
                            return False, "No hay disponibilidad o el producto no pertenece al usuario"

        finally:
            mysql.connection.close()
        
        # Si todas las validaciones pasan para todos los elementos, retornamos True
        print("chequeo detalle")
        return True, "Todos los elementos son válidos"


    #tipo de dato de la lista de facturas
    def __init__(self, row):
        # self._id_detalle_factura = row["id_detalle_factura"]
        # self._id_factura = row["id_factura"]
        # self._id_oferta = row["id_oferta"]        
        # self._importe = row["importe"]        
        # self._cantidad = row["cantidad"]
        self._id_detalle_factura = row[0]
        self._id_factura = row[1]
        self._id_oferta = row[2]        
        self._importe = row[3]        
        self._cantidad = row[4]
    def to_json(self):
        return {
            "id_detalle": self._id_detalle_factura,
            "id_factura": self._id_factura,
            "id_oferta": self._id_oferta,            
            "importe": self._importe,
            "cantidad": self._cantidad            
        }
    @staticmethod
    def insertar_detalle(id_factura, datos_detalle):    
        # ya verificamos con check_data_schema, ya existe datos_detalle y son correctos
        #campos_detalle = ["id_factura", "id_oferta", "detalle", "importe", "cantidad"]
        # ahora armamos los campos de la tabla
        campos_detalle = ["id_factura"] + list(ElementoDetalleFactura.schema.keys())
        # preparamos la query
        cur = mysql.connection.cursor()
        
        print("campos detalle:",campos_detalle)
       
        # Creamos una lista de tuplas con los valores a insertar
        
        valores_detalle = []
        try:
            for detalle in datos_detalle:                
                query = """
                            SELECT 
                                precio
                            FROM 
                                oferta 
                            WHERE                             
                                id_oferta = %s                            
                        """
                cur.execute(query, (detalle["id_oferta"],))                
                importe = cur.fetchone()                
                detalle["importe"] = importe[0] if importe else 0
                valores_detalle.append((
                    id_factura,
                    detalle["id_oferta"],
                    detalle["importe"],
                    detalle["cantidad"]
                ))
        except Exception as e:
            print("Error:", e)

        

        # Insertar los datos del detalle
        consulta = 'INSERT INTO detalle_facturas ({}) VALUES ({})'.format(
            ', '.join(campos_detalle),
            ', '.join(['%s'] * len(campos_detalle))
        )
        print("consulta:",consulta)
        print("valores",valores_detalle) 
        cur.executemany(consulta, valores_detalle)
        mysql.connection.commit()
        
        # Verificar si se insertaron los datos
        # Verificar si se insertaron los datos
        
        if cur.rowcount > 0:
            # Obtener los registros recién insertados
            consulta_select = 'SELECT * FROM detalle_facturas WHERE id_factura = %s'
            
            cur.execute(consulta_select, (id_factura,))
            registros_creados = cur.fetchall()
            calcular_importe = 'SELECT sum(cantidad * importe) FROM detalle_facturas WHERE id_factura = %s'
            cur.execute(calcular_importe, (id_factura,))
            total_importe = cur.fetchone()
            cur.close()
            return registros_creados,total_importe  # Retornamos los registros creados y el total de la factura
        else:
            cur.close()
            return [], 0 # No se insertaron registros, retornar lista vacía
       



class ListadoElementoDetalleFactura:
    #lista del detalle de la factura y sus metodos
    def __init__(self):
        self._elementos = []

    def agregarElemento(self, elemento):
        self._elementos.append(elemento)

    def getElementosPorIdFactura(self, id_factura):
        return [elemento for elemento in self.elementos if elemento.id_factura == id_factura]

    def getAll(self):
        return self._elementos
    
#  @staticmethod
#     def check_data_schema(user_id,elementos):
#         # Verificamos si la lista de elementos está vacía
#         if not elementos:
#             return False, "Lista vacía"  # Retornamos False y mensaje de lista vacía
        
#         # Iteramos sobre la lista
#         for elemento in elementos:
#             # Verificamos para cada 'elemento' es nulo o no es un diccionario
#             if elemento is None or not isinstance(elemento, dict):
#                 return False, "Elemento inválido"  # Retornamos False y mensaje de elemento inválido
            
#             # Iteramos sobre las claves del esquema de detalla factura
#             #for key in ElementoDetalleFactura.schema:
#             for key in ["id_oferta", "cantidad"]:
#                 # Verificamos si cada clave está presente en 'elemento'
#                 if key not in elemento:
#                     # Si falta alguna clave, retornamos False
#                     return False, f"Falta '{key}' en el elemento"  # Retornamos False y mensaje de clave faltante
                
#                 # Verificamos que coincidan los tipos en el elemento con los tipos en schema
#                 if type(elemento[key]) != ElementoDetalleFactura.schema[key]:                
#                     return False, f"Tipo incorrecto para '{key}' en el elemento"  # Retornamos False y mensaje de tipo incorrecto
        
#         # Si todas las validaciones pasan para todos los elementos, retornamos True
#         return True, "Todos los elementos son válidos"