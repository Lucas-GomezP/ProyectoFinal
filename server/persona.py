class Persona():
    def __init__(self, row):
        self._id= row[0]
        self._tipo = row[1]
        self._cuitCuil = row[2]
        self._nombre = row[3]
        self._apellido = row[4]
        self._dni = row[5]
        self._domicilio = row[6]
        self._telefono = row[7]
        self._email = row[8]
    
    def to_json(self):
        return {
            "id": self._id,
            "tipo": self._tipo,
            "cuitCuil": self._cuitCuil,
            "nombre": self._nombre,
            "apellido": self._apellido,
            "dni": self._dni,
            "domicilio": self._domicilio,
            "telefono": self._telefono,
            "email": self._email
        }
    
class Cliente():
    def __init__(self, row, id_cliente, id_usuario,nombre_cliente, contrasenia):
        super().__init__(row)
        self._id_cliente = id_cliente
        self._id_usuario = id_usuario
        self._nombre_cliente = nombre_cliente
        self._contrasenia = contrasenia

class Usuario(Persona):
    def __init__(self, row, id_usuario, nombre_usuario, contrasenia):
        super().__init__(row)
        self._id_usuario = id_usuario
        self._nombre_usuario = nombre_usuario
        self._contrasenia = contrasenia