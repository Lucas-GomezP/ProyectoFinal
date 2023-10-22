CREATE DATABASE IF NOT EXISTS  db_api_facturacion;
USE db_api_facturacion;

CREATE TABLE IF NOT EXISTS personas(
    id_persona INT(10) NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(255) NOT NULL, /*Persona fisica o juridica*/
    cuil_cuit int (11),
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    dni INT(8) NOT NULL,
    domicilio VARCHAR(255),
    telefono INT(12),
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
); 

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT(10) NOT NULL AUTO_INCREMENT,
    nombreusuario VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_usuario)
);

CREATE TABLE IF NOT EXISTS clientes(
    id_cliente INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
    PRIMARY KEY (id),
    id_user INT(10),
    FOREIGN KEY(id_user) REFERENCES users(id_usuario) 
);

CREATE TABLE IF NOT EXISTS oferta(
    id_oferta INT(10) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    tipo CHAR(1) /*P si es producto, S si es servicio*/
    descripcion VARCHAR(255),
    precio decimal(2),
    stock INT(10),
    disponibilidad BOOLEAN
);

CREATE TABLE IF NOT EXISTS facturas(
    id_factura INT(10) NOT NULL AUTO_INCREMENT,
    id_usuario INT(10),
    id_cliente INT(10),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    fecha DATE,
    importe_total DECIMAL(10,2),
    descripcion VARCHAR(255),
    estado INT(4) /*CODIGOS DE ESTADOS POSIBLES: pago, impago...*/
);

CREATE TABLE IF NOT EXISTS detalle_facturas(    
    id_detalle_factura INT(10) NOT NULL AUTO_INCREMENT,
    id_factura INT(10),
    FOREIGN KEY (id_factura) REFERENCES facturas(id_factura),    
    id_oferta INT(10),
    importe DECIMAL(10,2),
    detalle VARCHAR(255)
);