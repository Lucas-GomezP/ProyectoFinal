class Factura():
    def __init__(self, row):
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
    
class ElementoDetalleFactura:
    #tipo de dato de la lista de facturas
    def __init__(self, id_detalle_factura, id_factura, id_oferta, importe, detalle):
        self.id_detalle_factura = id_detalle_factura
        self.id_factura = id_factura
        self.id_oferta = id_oferta
        self.importe = importe
        self.detalle = detalle

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