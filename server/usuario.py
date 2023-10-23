class Usuario(Persona):
    def __init__(self, row, id_usuario, nombre_usuario):
        super().__init__(row)
        self._id_usuario = id_usuario
        self._nombre_usuario = nombre_usuario