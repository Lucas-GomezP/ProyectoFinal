CREATE DATABASE IF NOT EXISTS  db_api_facturacion;
USE db_api_facturacion;

-- CREATE TABLE IF NOT EXISTS personas(
--     id_persona INT(10) NOT NULL AUTO_INCREMENT,
--     tipo VARCHAR(255) NOT NULL, /*Persona fisica o juridica*/
--     cuil_cuit int (11),
--     nombre VARCHAR(255) NOT NULL,
--     apellido VARCHAR(255) NOT NULL,
--     dni INT(8) NOT NULL,
--     domicilio VARCHAR(255),
--     telefono INT(12),
--     email VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id_persona)
-- ); 

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT(10) NOT NULL AUTO_INCREMENT,
    nombreusuario VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_usuario)
);

/*PARA AGREGAR LOS CAMPOS RESTANTES*/
ALTER TABLE usuarios
ADD COLUMN nombre VARCHAR(255) NOT NULL,
ADD COLUMN apellido VARCHAR(255) NOT NULL,
ADD COLUMN dni VARCHAR(20) NOT NULL,
ADD COLUMN domicilio VARCHAR(255) NOT NULL,
ADD COLUMN telefono VARCHAR(15) NOT NULL,
ADD COLUMN email VARCHAR(255) NOT NULL;

/*
ALTER TABLE `db_api_facturacion`.`usuarios` 
ADD COLUMN `estado` INT(1) NOT NULL DEFAULT 1 AFTER `id_usuario`;
*/

CREATE TABLE IF NOT EXISTS clientes(
    id_cliente INT(10) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL, 
    id_usuario INT(10),
    PRIMARY KEY (id_cliente),
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario), 
    estado INT(1) NOT NULL
);

ALTER TABLE clientes
ADD COLUMN cuit_cuil VARCHAR(20) NOT NULL,
ADD COLUMN apellido VARCHAR(255) NOT NULL,
ADD COLUMN dni VARCHAR(15) NOT NULL,
ADD COLUMN domicilio VARCHAR(255),
ADD COLUMN telefono VARCHAR(20),
ADD COLUMN email VARCHAR(255);

/* EDICION TABLA CLIENTES PARA AGREGAR EL ESTADO
ALTER TABLE `db_api_facturacion`.`clientes` 
ADD COLUMN `estado` INT(1) NOT NULL DEFAULT 1 AFTER `id_usuario`;
*/

CREATE TABLE IF NOT EXISTS oferta(
    id_oferta INT(10) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    tipo CHAR(1), /*P si es producto, S si es servicio*/
    descripcion VARCHAR(255),
    precio decimal(10),
    stock INT(10),
    disponibilidad BOOLEAN,
    id_usuario INT(10),
    estado CHAR(1),-- 'A' Activo para la venta, 'I' Inactivo para la venta, cuando borremos un producto estara inactivo. Cuando lo demos de alta estara Activo.
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
    PRIMARY KEY (id_oferta)
);
/*
ALTER TABLE `db_api_facturacion`.`oferta` 
ADD COLUMN `id_usuario` INT(10) NOT NULL AFTER `disponibilidad`;
ADD COLUMN `estado` VARCHAR(1) NOT NULL DEFAULT '1' AFTER `id_usuario`;

ALTER TABLE `oferta`
ADD CONSTRAINT `oferta_ibfk_1`
FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`);
*/

CREATE TABLE IF NOT EXISTS facturas(
    id_factura INT(10) NOT NULL AUTO_INCREMENT,
    id_usuario INT(10),
    id_cliente INT(10),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    fecha DATE,
    importe_total DECIMAL(10,2),
    estado INT(4), /*CODIGOS DE ESTADOS POSIBLES: pago, impago...*/
    PRIMARY KEY (id_factura)
);

CREATE TABLE IF NOT EXISTS detalle_facturas(    
    id_detalle_factura INT(10) NOT NULL AUTO_INCREMENT,
    id_factura INT(10),
    FOREIGN KEY (id_factura) REFERENCES facturas(id_factura),    
    id_oferta INT(10),
    FOREIGN KEY (id_oferta) REFERENCES oferta(id_oferta),
    /*detalle VARCHAR(255),*/
    importe DECIMAL(10,2),
    cantidad INT(10),    
    PRIMARY KEY (id_detalle_factura)
);
/*
ALTER TABLE `db_api_facturacion`.`detalle_facturas` 
DROP FOREIGN KEY `detalle_facturas_ibfk_1`;
ALTER TABLE `db_api_facturacion`.`detalle_facturas` 
ADD COLUMN `cantidad` INT(10) NOT NULL DEFAULT 0 AFTER `importe`,
CHANGE COLUMN `detalle` `detalle` VARCHAR(255) NOT NULL AFTER `id_oferta`,
CHANGE COLUMN `id_factura` `id_factura` INT(10) NOT NULL ,
CHANGE COLUMN `id_oferta` `id_oferta` INT(10) NOT NULL ,
CHANGE COLUMN `importe` `importe` DECIMAL(10,2) NOT NULL ;
ALTER TABLE `db_api_facturacion`.`detalle_facturas` 
ADD CONSTRAINT `detalle_facturas_ibfk_1`
  FOREIGN KEY (`id_factura`)
  REFERENCES `db_api_facturacion`.`facturas` (`id_factura`);
*/
-- --------------------------------------------------------------
-- TRUNCATE HELP
-- --------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0; -- Deshabilitar comprobación de claves foráneas
-- Realizar las operaciones de eliminación o truncado
-- EJEMPLO -- TRUNCATE TABLE detalle_facturas; TRUNCATE TABLE facturas;
SET FOREIGN_KEY_CHECKS = 1; -- Volver a habilitar comprobación de claves foráneas
-- --------------------------------------------------------------
-- INSERT DE PRUEBA
-- --------------------------------------------------------------
INSERT INTO `db_api_facturacion`.`usuarios` (`nombreusuario`, `contrasenia`) VALUES ('ALE', '1234');
INSERT INTO `db_api_facturacion`.`usuarios` (`nombreusuario`, `contrasenia`) VALUES ('GABY', '1234');
INSERT INTO `db_api_facturacion`.`usuarios` (`nombreusuario`, `contrasenia`) VALUES ('LUQUITAS', '1234');
INSERT INTO `db_api_facturacion`.`usuarios` (`nombreusuario`, `contrasenia`) VALUES ('FACU', '1234');
INSERT INTO `db_api_facturacion`.`usuarios` (`nombreusuario`, `contrasenia`) VALUES ('PRUEBA', '1234');

UPDATE usuarios SET nombre = "ALE", apellido = "Grosso", dni = "27708257", domicilio = "Av. Siempreviva 223", telefono = "2915714472", email = "alegrosso@email.com" WHERE id_usuario = 1;

-- Para id_usuario = 2
UPDATE usuarios SET nombre = "GABY", apellido = "Rodríguez", dni = "27654321", domicilio = "Calle Azul 67", telefono = "3112345678", email = "elenarodriguez@email.com" WHERE id_usuario = 2;

-- Para id_usuario = 3
UPDATE usuarios SET nombre = "Lucas", apellido = "Gómez", dni = "28901234", domicilio = "Av. Primavera 123", telefono = "3312345678", email = "pablogomez@email.com" WHERE id_usuario = 3;

-- Para id_usuario = 4
UPDATE usuarios SET nombre = "Facundo", apellido = "Romo", dni = "29876543", domicilio = "Calle Naranja 89", telefono = "3412345678", email = "marinahernandez@email.com" WHERE id_usuario = 4;

-- Para id_usuario = 5
UPDATE usuarios SET nombre = "Javier", apellido = "López", dni = "30987654", domicilio = "Av. Sol 456", telefono = "3512345678", email = "javierlopez@email.com" WHERE id_usuario = 5;

-- Para id_usuario = 6
UPDATE usuarios SET nombre = "Lucía", apellido = "Sánchez", dni = "31765432", domicilio = "Calle Luna 78", telefono = "3612345678", email = "luciasanchez@email.com" WHERE id_usuario = 6;

-- Para id_usuario = 7
UPDATE usuarios SET nombre = "Alejandro", apellido = "Fernández", dni = "32432109", domicilio = "Av. Estrella 234", telefono = "3712345678", email = "alejandrofernandez@email.com" WHERE id_usuario = 7;

-- Para id_usuario = 8
UPDATE usuarios SET nombre = "Cecilia", apellido = "Torres", dni = "33109876", domicilio = "Calle Arcoiris 56", telefono = "3812345678", email = "ceciliatorres@email.com" WHERE id_usuario = 8;

-- Para id_usuario = 9
UPDATE usuarios SET nombre = "Martín", apellido = "Díaz", dni = "34210987", domicilio = "Av. Montaña 789", telefono = "3912345678", email = "martindiaz@email.com" WHERE id_usuario = 9;

-- Para id_usuario = 10
UPDATE usuarios SET nombre = "Camila", apellido = "Ruiz", dni = "35321098", domicilio = "Calle Mar 12", telefono = "4012345678", email = "camilaruiz@email.com" WHERE id_usuario = 10;

-- Para id_usuario = 11
UPDATE usuarios SET nombre = "Lucas", apellido = "González", dni = "36432109", domicilio = "Av. Playa 34", telefono = "4112345678", email = "lucasgonzalez@email.com" WHERE id_usuario = 11;

-- --------------------------------------------------------------
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('CLIENTE 1', '1');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('CLIENTE 2', '1');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('CLIENTE 3', '2');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('CLIENTE 4', '3');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('CLIENTE 5', '4');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('Pepe', '5');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('Maria', '5');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('Jose', '5');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('Julieta', '5');
INSERT INTO `db_api_facturacion`.`clientes` (`nombre`, `id_usuario`) VALUES ('Javier', '5');

/*PARA AGREGAR CAMPOS*/
UPDATE clientes
SET cuit_cuil = '12345678901', apellido = 'Apellido 1', dni = '98765463', domicilio = 'Calle 1',
    telefono = '5551234', email = 'nuevo@email.com' WHERE id_cliente = 1;

UPDATE clientes
SET cuit_cuil = '12345678902',  apellido = 'Apellido 2', dni = '98765555', domicilio = 'Calle 2',
    telefono = '4321234', email = 'cualquiera@email.com' WHERE id_cliente = 2;

UPDATE clientes
SET cuit_cuil = '12345678905', apellido = 'Apellido 3', dni = '98765432', domicilio = 'Calle 3',
    telefono = '2681234', email = 'blablabla@email.com' WHERE id_cliente = 3;

UPDATE clientes
SET cuit_cuil = '12345675248', apellido = 'Apellido 4', dni = '98765222', domicilio = 'Calle 4',
    telefono = '5661234', email = 'unica@email.com' WHERE id_cliente = 4;

UPDATE clientes
SET cuit_cuil = '12345679875', apellido = 'Apellido 5', dni = '98765123', domicilio = 'Calle 5',
    telefono = '1231234', email = 'a@email.com' WHERE id_cliente = 5;

UPDATE clientes
SET cuit_cuil = '1234567519', apellido = 'Florez', dni = '98765785', domicilio = 'Calle Aleatoria 22', estado = 1,
    telefono = '2299555666', email = 'pepe@email.com' WHERE id_cliente = 6;
UPDATE clientes
SET cuit_cuil = '999887546', apellido = 'Gonzales', dni = '55446684', domicilio = 'Otra Calle 56', estado = 1,
    telefono = '2299888777', email = 'maria@email.com' WHERE id_cliente = 7;
    UPDATE clientes
SET cuit_cuil = '8475962525', apellido = 'Perez', dni = '25361425', domicilio = 'Pellegrini 888', estado = 1,
    telefono = '2299646454', email = 'jose@email.com' WHERE id_cliente = 8;
    UPDATE clientes
SET cuit_cuil = '6485320015', apellido = 'Gomez', dni = '26154836', domicilio = 'Irigoyen 888', estado = 1,
    telefono = '2299779955', email = 'julieta@email.com' WHERE id_cliente = 9;
    UPDATE clientes
SET cuit_cuil = '9785456294', apellido = 'Lopez', dni = '30258496', domicilio = 'Passo 844', estado = 1,
    telefono = '2299989888', email = 'javier@email.com' WHERE id_cliente = 10;


-- --------------------------------------------------------------
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', 'P', 'Modelo Ryzen 3 3200G | Socket AM4 APU 3th Gen | Núcleos 4 | Frecuencia 3600.00 mhz | Proceso De Fabricación 12 nm | Chipset Gpu Radeon Vega 8 | Hilos 4 |Frecuencia Turbo 4000 mhz | Familia AMD RYZEN 3', '102750.00', '15', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Procesador AMD RYZEN 5 3600 4.2GHz Turbo AM4 Wraith Stealth Cooler', 'P', 'Modelo Ryzen 5 3600 | Socket AM4 Ryzen 3th Gen | Núcleos 6 | Frecuencia 3600.00 mhz | Proceso De Fabricación 7 nm | Chipset Gpu NO Posee Gráficos Integrados | Hilos 12 | Frecuencia Turbo 4200 mhz | Familia AMD RYZEN 5', '149450.00', '8', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Fuente Be Quiet 1000W 80 Plus Gold PURE POWER 11 Full Modular', 'P', 'Watts Nominal 1000 w | Watts Reales 1000 w | Formato ATX | Compatible Con Posición Inferior Si | Certificacion 80 Plus 80 PLUS Gold | Modo Híbrido No | Tipo De Cableado Full Modular | Ampers En Linea +12V 84 a | Fuente Digital No | Color Negro | Iluminación Sin Iluminación', '150750.00', '12', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Gabinete Antec NX292 MESH RGB Vidrio Templado', 'P', 'Ancho 206 mm | Alto 450 mm | Profundidad 406 mm | Largo Máximo Vga 320 mm | Altura Máxima Del Cooler Cpu 155.00 mm', '60500.00', '3', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Notebook Dell Inspiron 3525 IPS FHD 15.6" Ryzen 5 5625U 8GB 256GB SSD NVMe W11 Home 120Hz', 'P', 'Color Plateado | Sistema Operativo Windows 11 Home | Tipo De Cpu AMD | Tipo De Gpu AMD Integrated Graphics | Batería Extraible No | Modelo Gpu AMD Radeon Graphics | Modelo Cpu Ryzen 5 5625U | Tipo Notebook | Lector De Huellas No | Familia Del Procesador AMD RYZEN 5', '610500.00', '8', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Notebook Gamer Asus TUF FX506L FHD IPS 15.6" Core I5 10300H 16GB 512GB SSD NVMe GTX 1650 W11 Home 144Hz', 'P', 'Color Negro | Sistema Operativo Windows 11 Home | Tipo De Cpu Intel | Tipo De Gpu Nvidia GeForce | Batería Extraible No | Modelo Gpu GTX 1650 | Modelo Cpu Core i5 10300H | Tipo Notebook | Memoria Gpu 4 gb | Lector De Huellas No | Familia Del Procesador Intel Core i5', '879400.00', '22', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Monitor Gamer Samsung 24" G50 Curvo 144Hz Full HD VA FreeSync', 'P', 'Ancho 547 mm | Alto 326 mm | Espesor 90 mm | Curvatura 1800 r', '199900.00', '13', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Disco Sólido SSD M.2 ADATA 1TB XPG Spectrix S40G RGB 3500MB/s NVMe PCI-E X4', 'P', 'Tipo De Conexión M2 | Consumo 4 w | Tipo De Disco Sólido', '107250.00', '35', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Disco Solido SSD Team 512GB GX2 530MB/s', 'P', 'Tipo De Conexión SATA | Consumo 4 w | Tipo De Disco Sólido', '33700.00', '1', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Auriculares HyperX Cloud Flight Black Wireless', 'P', 'Audio 2.0 | Colores Negro | Conexión Inalámbrico | Con Micrófono Si | Tipo De Audio Real | Tipo Headset', '94600.00', '43', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Gabinete Lian Li O11 Dynamic XL ROG Certify White ARGB', 'P', 'Ancho 285 mm | Alto 513 mm | Profundidad 471 mm | Largo Máximo Vga 446 mm | Altura Máxima Del Cooler Cpu 167.00 mm', '236950.00', '3', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Monitor Smart Samsung 27" M5 Full HD VA 60Hz AirPlay2/ Netflix/ Youtube/ HBO', 'P', 'Ancho 615 mm | Alto 368 mm | Espesor 42 mm | Curvatura 0 r', '169300.00', '3', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Gabinete Lian Li Lancool 205 Mesh W White', 'P', 'Ancho 205 mm | Alto 485 mm | Profundidad 415 mm | Largo Máximo Vga 350 mm | Altura Máxima Del Cooler Cpu 160.00 mm', '78850.00', '0', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Silla Gamer Vertagear Racing Series PL-4500 Crystals from Swarovski', 'P', 'Ergonomica', '704050.00', '4', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Fuente Be Quiet 850W 80 Plus Gold PURE POWER 11 Full Modular', 'P', 'Watts Nominal 850 w | Watts Reales 850 w | Formato ATX | Compatible Con Posición Inferior Si | Certificacion 80 Plus 80 PLUS Gold | Modo Híbrido No | Tipo De Cableado Full Modular | Ampers En Linea +12V 71 a | Fuente Digital No | Color Negro | Iluminación Sin Iluminación', '128650.00', '8', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Memoria Adata DDR4 16GB (2x8GB) 4133MHz XPG Spectrix D60G RGB', 'P', 'Capacidad 16 gb | Velocidad 4133 mhz | Tipo DDR4 | Cantidad De Memorias 2 | Latencia 19 cl | Voltaje 1.40 v', '78850.00', '7', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Armado de PC', 'S', 'Union y control de funcionamiento de los componentes', '7000.00', '1', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Limpieza de gabinete', 'S', 'Limpieza de componentes', '5000.00', '1', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Instalacion de antivirus', 'S', 'Antivirus certificado', '10000.00', '1', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Instalacion de SO', 'S', 'Instalacion de sistema operativo a eleccion entre Windows 10 / Windows 11', '20000.00', '1', '1', '5', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Instalacion herramientas Adobe', 'S', 'Instalacion de Photoshop, Illustrator, Premier', '20000.00', '1', '1', '5', 'A');

INSERT INTO `db_api_facturacion`.`facturas` (`id_usuario`, `id_cliente`, `fecha`, `importe_total`, `estado`) VALUES ('5', '7', '2023-11-30', '320900', '1');
INSERT INTO `db_api_facturacion`.`facturas` (`id_usuario`, `id_cliente`, `fecha`, `importe_total`, `estado`) VALUES ('5', '7', '2023-12-1', '257300', '3');
INSERT INTO `db_api_facturacion`.`facturas` (`id_usuario`, `id_cliente`, `fecha`, `importe_total`, `estado`) VALUES ('5', '6', '2023-12-1', '340400', '1');
INSERT INTO `db_api_facturacion`.`facturas` (`id_usuario`, `id_cliente`, `fecha`, `importe_total`, `estado`) VALUES ('5', '6', '2023-12-2', '879400', '4');


INSERT INTO `db_api_facturacion`.`detalle_facturas` (`id_factura`, `id_oferta`, `importe`, `cantidad`) VALUES ('1', '1', '102750', '1'), ('1', '3', '150750', '1'), ('1', '9', '33700', '2');
INSERT INTO `db_api_facturacion`.`detalle_facturas` (`id_factura`, `id_oferta`, `importe`, `cantidad`) VALUES ('2', '15', '128650', '2');
INSERT INTO `db_api_facturacion`.`detalle_facturas` (`id_factura`, `id_oferta`, `importe`, `cantidad`) VALUES ('3', '16', '78850', '4'), ('3', '18', '5000', '1'), ('3', '21', '20000', '1');
INSERT INTO `db_api_facturacion`.`detalle_facturas` (`id_factura`, `id_oferta`, `importe`, `cantidad`) VALUES ('4', '6', '879400', '1');






























INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Elegant Soft Mouse', 'S', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', '844.00', '5', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Small Cotton Table', 'S', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '436.00', '3', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Luxurious Cotton Bacon', 'S', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '724.00', '8', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Rustic Bronze Car', 'S', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '537.00', '4', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Granite Ball', 'S', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '818.00', '1', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Small Cotton Keyboard', 'P', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '741.00', '4', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Tasty Fresh Bacon', 'S', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '382.00', '7', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Modern Concrete Mouse', 'S', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '146.00', '4', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Awesome Soft Bacon', 'P', 'The Football Is Good For Training And Recreational Purposes', '85.00', '5', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Unbranded Cotton Ball', 'S', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', '454.00', '5', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Recycled Fresh Shoes', 'P', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '540.00', '9', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Bespoke Soft Pants', 'P', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '746.00', '7', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Gorgeous Frozen Tuna', 'S', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '696.00', '1', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Recycled Metal Sausages', 'P', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', '671.00', '4', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Incredible Rubber Salad', 'S', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', '114.00', '2', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Elegant Bronze Pizza', 'S', 'The Football Is Good For Training And Recreational Purposes', '581.00', '4', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Handcrafted Rubber Bacon', 'P', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '147.00', '1', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Tasty Frozen Sausages', 'S', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '997.00', '1', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Electronic Bronze Tuna', 'S', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '551.00', '2', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Modern Bronze Table', 'P', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '798.00', '2', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Recycled Soft Towels', 'S', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '732.00', '8', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Unbranded Bronze Mouse', 'P', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '112.00', '4', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Intelligent Fresh Gloves', 'P', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '281.00', '6', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Handmade Soft Tuna', 'S', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '269.00', '3', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Gorgeous Bronze Chicken', 'P', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', '952.00', '6', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Sleek Concrete Table', 'P', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '935.00', '4', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Luxurious Bronze Mouse', 'P', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '716.00', '6', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Tasty Cotton Sausages', 'S', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '727.00', '2', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Modern Bronze Towels', 'P', 'The Football Is Good For Training And Recreational Purposes', '774.00', '4', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Tasty Fresh Chair', 'P', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '520.00', '5', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Ergonomic Plastic Salad', 'P', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '318.00', '6', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Incredible Bronze Pants', 'S', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', '797.00', '3', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Refined Plastic Ball', 'S', 'The Football Is Good For Training And Recreational Purposes', '417.00', '1', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Intelligent Bronze Chair', 'S', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '319.00', '2', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Steel Chips', 'S', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', '593.00', '6', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Modern Fresh Computer', 'P', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', '524.00', '7', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Granite Salad', 'S', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '512.00', '6', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Ergonomic Rubber Keyboard', 'P', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '357.00', '7', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Unbranded Wooden Chips', 'S', 'The Football Is Good For Training And Recreational Purposes', '287.00', '3', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Elegant Soft Shirt', 'S', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '673.00', '6', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Recycled Metal Shirt', 'S', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '900.00', '2', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Oriental Cotton Mouse', 'P', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', '454.00', '1', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Intelligent Steel Fish', 'S', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '556.00', '6', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Oriental Soft Table', 'P', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', '937.00', '8', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Oriental Granite Bike', 'S', 'The Football Is Good For Training And Recreational Purposes', '919.00', '9', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Tasty Plastic Table', 'P', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '350.00', '5', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Rustic Granite Pants', 'S', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '726.00', '6', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Oriental Granite Shirt', 'S', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '502.00', '4', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Sleek Concrete Computer', 'P', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '128.00', '9', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Intelligent Metal Bike', 'P', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '425.00', '3', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Fantastic Fresh Chicken', 'S', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '533.00', '4', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Rustic Concrete Fish', 'P', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '996.00', '3', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Luxurious Steel Table', 'P', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', '965.00', '7', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Luxurious Rubber Chair', 'S', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '24.00', '8', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Gorgeous Concrete Hat', 'S', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '377.00', '5', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Small Fresh Mouse', 'S', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '685.00', '5', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Electronic Plastic Shoes', 'S', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '14.00', '2', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Recycled Bronze Gloves', 'P', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '846.00', '3', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Bespoke Wooden Keyboard', 'S', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '165.00', '1', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Sleek Soft Car', 'S', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '96.00', '5', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Recycled Wooden Shirt', 'S', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', '63.00', '7', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Awesome Cotton Car', 'P', 'The Football Is Good For Training And Recreational Purposes', '735.00', '8', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Bespoke Soft Fish', 'S', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', '214.00', '1', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Practical Steel Keyboard', 'P', 'The Football Is Good For Training And Recreational Purposes', '729.00', '5', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Handcrafted Bronze Keyboard', 'P', 'The Football Is Good For Training And Recreational Purposes', '744.00', '1', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Practical Concrete Shoes', 'S', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '892.00', '1', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Rustic Granite Soap', 'P', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '606.00', '7', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Elegant Steel Table', 'S', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '823.00', '6', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Oriental Frozen Shirt', 'P', 'The Football Is Good For Training And Recreational Purposes', '458.00', '6', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Sleek Bronze Chips', 'P', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '323.00', '2', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Fresh Sausages', 'S', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '664.00', '8', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Fantastic Soft Pizza', 'P', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '474.00', '5', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Sleek Frozen Chicken', 'P', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', '258.00', '2', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Sleek Wooden Soap', 'P', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '759.00', '2', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Rubber Keyboard', 'P', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', '485.00', '5', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Incredible Frozen Table', 'P', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '802.00', '5', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Elegant Frozen Chips', 'P', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '237.00', '6', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Handcrafted Cotton Pizza', 'P', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', '185.00', '5', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Intelligent Wooden Pizza', 'S', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', '113.00', '9', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Refined Rubber Keyboard', 'S', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '405.00', '8', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Awesome Plastic Ball', 'S', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '972.00', '4', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Unbranded Plastic Mouse', 'S', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '365.00', '1', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Handmade Steel Chips', 'S', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '360.00', '5', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Small Granite Sausages', 'P', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', '85.00', '6', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Rustic Rubber Towels', 'P', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '922.00', '1', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Incredible Wooden Salad', 'S', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '343.00', '7', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Licensed Plastic Tuna', 'S', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '171.00', '4', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Refined Granite Mouse', 'P', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '5.00', '2', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Soft Tuna', 'P', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', '72.00', '4', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Rustic Rubber Car', 'S', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '459.00', '8', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Wooden Sausages', 'S', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '376.00', '8', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Tasty Rubber Sausages', 'P', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', '620.00', '7', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Modern Plastic Pants', 'P', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '356.00', '8', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Refined Steel Hat', 'P', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '926.00', '2', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Rustic Wooden Chips', 'S', 'Boston s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', '588.00', '2', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Unbranded Soft Chips', 'S', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', '552.00', '9', '1', '2', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Intelligent Concrete Car', 'P', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', '173.00', '1', '1', '3', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Practical Steel Keyboard', 'P', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', '463.00', '9', '1', '4', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Small Wooden Gloves', 'P', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', '50.00', '8', '1', '1', 'A');
INSERT INTO `db_api_facturacion`.`oferta` (`nombre`, `tipo`, `descripcion`, `precio`, `stock`, `disponibilidad`, `id_usuario`, `estado`) VALUES ('Generic Rubber Hat', 'S', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', '834.00', '7', '1', '2', 'A');