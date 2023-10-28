#Se llama oferta al producto o servicio
class Oferta():
    def __init__(self, row):
        self._id_oferta = row[0]
        self._nombre = row[1]
        self._tipo = row[2]
        self._descripcion = row[3]
        self._precio = row[4]
        self._stock = row[5]
        self._disponibilidad = row[6]
        
    def to_json(self):
        return {
            "id_oferta": self._if_oferta,
            "nombre": self._nombre,
            "tipo": self._tipo,
            "descripcion": self._descripcion,
            "precio": self._precio,
            "stock": self._stock,
            "disponibilidad": self._disponibilidad
        }