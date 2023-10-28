class Client():
    def __init__(self, row):
        self._id_cliente= row[0] 
        self._cuitCuil = row[1]
        self._nombre = row[2]
        self._apellido = row[3]
        self._dni = row[4]
        self._domicilio = row[5]
        self._telefono = row[6]
        self._email = row[7]        
        self._id_usuario = row[8]        
        #self._contrasenia = contrasenia



    def to_json(self):
        return {
            "id_cliente": self._id_cliente,
            "CUIT/CUIL": self._cuitCuil,
            "nombre": self._nombre,
            "apellido" : self._apellido,
            "dni": self._dni,
            "domicilio": self._domicilio,
            "telefono": self._telefono,
            "email": self._email, 
            "id_usuario": self._id_usuario
        }