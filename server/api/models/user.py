class User():
    def __init__(self, row):        
        self._id_usuario= row[0]        
        self._nombreusuario= row[1]        
        self._contrasenia= row[2]        
        # self._cuitCuil = row[1]
        # self._nombre = row[2]
        # self._apellido = row[3]
        # self._dni = row[4]
        # self._domicilio = row[5]
        # self._telefono = row[6]
        # self._email = row[7]
        # self._id_usuario = row[8]
        # self._nombre_usuario = row[9]
        #self._contrasenia = row[11]
    
    def to_json(self):
        return {
            "id_usuario": self._id_usuario,  
            "nombreusuario": self._nombreusuario,  
            "contrasenia": self._contrasenia
            # "cuitCuil": self._cuitCuil,
            # "nombre": self._nombre,
            # "apellido": self._apellido,
            # "dni": self._dni,
            # "domicilio": self._domicilio,
            # "telefono": self._telefono,
            # "email": self._email,
            # "id usuario": self._id_usuario,
            # "nombre usuario": self._nombre_usuario
    }