class Client():
    def __init__(self, row):
        self._id_cliente= row[0] 
        self._nombre= row[1] 
        self._id_usuario= row[2] 
        self._cuitCuil = row[1]
        self._apellido = row[3]
        self._dni = row[4]
        self._domicilio = row[5]
        self._telefono = row[6]
        self._email = row[7] 
        self._estado = 1                

    def actualizar_datos_cliente(self, **kwargs):
        for key, value in kwargs.items():
            if key == "_nombre":
                self._nombre = value
            elif key == "_cuitCuil":
                self._cuitCuil = value
            elif key == "_apellido":
                self._apellido = value
            elif key == "_dni":
                self._dni = value
            elif key == "_domicilio":
                self._domicilio = value
            elif key == "_telefono":
                self._telefono = value
            elif key == "_email":
                self._email = value
            elif key == "_estado":
                self._estado = value
            else:
                return {"message: ": f"Atributo '{key}' no existe en la clase Client."}
            
    def eliminar_cliente(self):
        self._estado = 0
        return self


    def to_json(self):
        return {
            "id_cliente": self._id_cliente,
            "nombre": self._nombre,
            "id_usuario": self._id_usuario,
            "CUIT/CUIL": self._cuitCuil,
            "nombre": self._nombre,
            "apellido" : self._apellido,
            "dni": self._dni,
            "domicilio": self._domicilio,
            "telefono": self._telefono,
            "email": self._email,
            "estado": self._estado 
        }