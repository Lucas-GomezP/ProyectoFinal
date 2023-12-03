# Proyecto Final

# Tabla de Contenidos

- [Proyecto Final](#proyecto-final)
- [Tabla de Contenidos](#tabla-de-contenidos)
  - [Integrantes](#integrantes)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Ejecución](#ejecución)
    - [Server](#server)
    - [Client](#client)
  - [Tests](#tests)
  - [Directorios](#directorios)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
- [Pasos a seguir para usarlo de forma local](#pasos-a-seguir-para-usarlo-de-forma-local)
  - [Documentacion de la API](#documentacion-de-la-api)
    - [/login \[POST\]](#login-post)
    - [/users \[POST\]](#users-post)
    - [/users/\<user\_id\> \[PUT\]](#usersuser_id-put)
    - [/users/\<user\_id\> \[DELETE\]](#usersuser_id-delete)
    - [/user/\<user\_id\>/oferta \[GET\]](#useruser_idoferta-get)
    - [/user/\<user\_id\>/oferta/\<oferta\_id\> \[GET\]](#useruser_idofertaoferta_id-get)
    - [/user/\<user\_id\>/oferta \[POST\]](#useruser_idoferta-post)
    - [/user/\<user\_id\>/oferta/\<oferta\_id\> \[PUT\]](#useruser_idofertaoferta_id-put)
    - [/user/\<user\_id\>/oferta/\<oferta\_id\> \[DELETE\]](#useruser_idofertaoferta_id-delete)
    - [/user/\<user\_id\>/client \[GET\]](#useruser_idclient-get)
    - [/user/\<user\_id\>/client/\<client\_id\> \[GET\]](#useruser_idclientclient_id-get)
    - [/user/\<user\_id\>/client \[POST\]](#useruser_idclient-post)
    - [/user/\<user\_id\>/client/\<client\_id\> \[PUT\]](#useruser_idclientclient_id-put)
    - [/user/\<user\_id\>/client/\<client\_id\> \[DELETE\]](#useruser_idclientclient_id-delete)
    - [/user/\<user\_id\>/facturas \[GET\]](#useruser_idfacturas-get)
    - [/user/\<user\_id\>/facturas \[GET\]](#useruser_idfacturas-get-1)
    - [/user/\<user\_id\>/client/\<client\_id\>/facturas \[POST\]](#useruser_idclientclient_idfacturas-post)
    - [/user/\<user\_id\>/facturas/\<factura\_id\> \[PUT\]](#useruser_idfacturasfactura_id-put)
    - [/user/\<user\_id\>/facturas/\<factura\_id\> \[DELETE\]](#useruser_idfacturasfactura_id-delete)
    - [Pruebas de endpoints](#pruebas-de-endpoints)
    - [UML de la API](#uml-de-la-api)

## Integrantes
* Alejandro Grosso
* Gabriel Huck
* Facundo Romo
* Lucas Gomez Peña

## Requisitos
* Python 3.x
* Node.js
* npm
* Git

## Instalación
1. Clonar el repositorio al tu maquina local:
```bash
git clone https://github.com/Lucas-GomezP/ProyectoFinal
```

### Backend
Modulos utilizados:
* flask
* flask-mysqldb
* PyJWT
* flask-cors

1. Para inicializar un entorno virtual:
```bash
py -3 -m venv .venv
```
2. Para activar este entorno virtual:
```bash
.venv\Scripts\activate
```
3. Para instalar dependencias (detro de la ruta ./server):
```bash
pip install -r requirements.txt
```

### Frontend
* Framework: React (con Vite como empaquetador)
* React
* React Dom
* Tailwind CSS 3
* React Router DOM
* React Hook Form
* Chart.js
* React Chartjs2
* React Code Blocks
* React Hot Toast

1. Para instalar dependencias (dentro de la ruta ./client):
```bash
npm install
```
2. Para ejecutarlo:
```bash
npm run dev
```

## Ejecución
En cualquier caso primero se debe realizar la ejecucion del backend para luego ejecutar el frontend.

### Server
1. Desde la ruta ./server :
```bash
py app.py
```
2. El backend estara disponible en http://localhost:4500

### Client
1. Desde la ruta ./client :
```bash
npm run dev
```
2. Acceder a la ruta dada (ej. http://localhost:5173)

## Tests
En thunder client, importar el archivo llamado "thunder-collection_ProyectoFinal.json".
En ese archivo se debera guardar la informacion de los test para las colecciones.

## Directorios
Se empleao un sistema de archivos en particular para cada seccion del proyecto

### Backend
```
server/
|
|-- .venv/
|
|-- api/
|   |-- db/              <- configuracion de la base de datos
|   |   |-- db.py
|   |
|   |-- models/          <- modelos para formatear datos, clases
|   |   |-- client.py
|   |   |-- user.py
|   |   |-- ...
|   |
|   |-- routes/          <- rutas, todo el crud, loging, logica para las rutas
|   |   |-- client.py
|   |   |-- user.py
|   |   |-- ...
|   |
|   |-- __init__.py      <- realizamos las conecciones para que crear la api en si
|   |-- utils.py         <- funcionalidades generales, como wrapers, token, recursos
|
|-- main.py              <- punto de inicio donde lanzamos la aplicacion
|-- db_init.sql          <- datos de inicio de la base de datos
|-- requirements.txt
```

### Frontend
```
client/
|
|-- node_modules/
|
|-- public/              <- recursos multimedia publicos
|   |-- ...
|
|-- src/
|   |-- assets/          <- archivos multimedia generales para visualizar
|   |   |-- ...
|   |
|   |-- components/      <- componentes de react con la logica interna de cada uno
|   |   |-- Header.jsx
|   |   |-- Icons.jsx
|   |   |-- Loader.jssx
|   |   |-- Menu.jsx
|   |
|   |-- hooks/           <- custom hooks
|   |   |-- useFetch.jsx
|   |
|   |-- pages/           <- paginas de cada seccion
|   |   |-- Bills.jsx
|   |   |-- Clients.jsx
|   |   |-- Dashboard.jsx
|   |   |-- Products.jsx
|   |
|   |-- routes/          <- logica de las rutas de redireccion y URL de la API
|   |   |-- apiUrl.js
|   |   |-- routes.jsx
|   |
|   |-- index.css
|   |-- main.jsx         <- punto de entrada de la aplicacion
|
|-- .eslintrc.cjs
|-- index.html
|-- papckage-lock.json
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
|-- vite.config.js
```

# Pasos a seguir para usarlo de forma local
1. inicializar el XAMMP
  * Si no se tiene creado el usuario se debe realizar con la misma informacion puesta en el archivoo db.py
  * A continuacion crear la base de datos y sus respectivas tablas con la informacion del archivo database.sql
2. Inicializar el servidor:
  * Desde la carpeta ./server utilizar:
  ```
  .venv\Scripts\activate

  py main.py
  ```
3. Inicializar el servidor:
  * Si no se tienen instaladas las dependencias, desde la carpeta ./client:
  ```
  npm install
  ```
  * Una vez instaladas las dependencias:
  ```
  npm run dev
  ```
4. Una vez funcionando la base de datos con la informacion dada, desde la pagina base del front (http://localhost:5173) ingresar con uno de los usuarios ya registrados

## Documentacion de la API
### /login [POST]
Endpoint para el ingreso de sesión de un usuario ya registrado. Se aplica con el método de Autorización Básica.
Consulta la tabla usuarios.
Recibe nombre de usuario y contraseña.
Devuelve id del usuario, token y nombre de usuario.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(data.username + ':' + data.password)
      }
    }
```
* Ejemplo Respuesta
```javascript
{
  id: 3,
  token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZXhwIjoxNzAxNTI2Mzg0fQ.Qt9UmxRf3dQNqH2iIRZioc3h-oelQ5WP7ImKvGWVwII",
  username: "LUQUITAS"
}
```

### /users [POST]
Endpoint para registrar un nuevo usuario.
Consulta la tabla usuarios.
Recibe un nombre de usuario, contraseña, nombre, apellido, dni, telefono y email.
Devuelve un mensaje de creación exitosa con un código HTTP 201.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreusuario: data.username,
        contrasenia: data.password,
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        telefono: data.telefono,
        email: data.email
      })
    }
```
* Ejemplo Respuesta
```javascript
{message: "Usuario creado exitosamente"}, 201
```

### /users/<user_id> [PUT]
Endpoint para actualizar la información de un usuario.
Consulta la tabla usuarios.
Recibe un nombre de usuario, contraseña, nombre, apellido, dni, telefono y email.
Devuelve un mensaje de creación exitosa con un código HTTP 200.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify({
        nombreusuario: data.username,
        contrasenia: data.password,
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        telefono: data.telefono,
        email: data.email
      })
    }
```
* Ejemplo Respuesta
```javascript
{message: "Usuario actualizado exitosamente"}, 200
```

### /users/<user_id> [DELETE]
Endpoint para eliminar un usuario. Cambia el estado de activo a inactivo a un usuario (eliminación lógica).
ESTE ENDPOINT NO ESTÁ IMPLEMENTADO
Está realizado el código pero no se aplicó, desde el frontend, esta funcionalidad ya que depende de cada lógica de negocio el poder eliminar o no los usuarios.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
```
* Ejemplo Respuesta
```javascript
{message: "Usuario eliminado exitosamente"}, 200
```

### /user/<user_id>/oferta [GET]
Endpoint para consultar toda la oferta del usuario, ya sean productos o servicios.
Consulta la tabla oferta.
Recibe el id del usuario y su token.
Devuelve un JSON con toda la lista de la tabla oferta.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
```
* Ejemplo Respuesta
```javascript
[{
    descripcion: "The Football Is Good For Training And Recreational Purposes"
    disponibilidad: 1
    estado: "A"
    id_oferta: 9
    id_usuario: 3
    nombre: "Awesome Soft Bacon"
    precio: "85"
    stock: 0
    tipo: "P"
    },
    ...
  ]
```

### /user/<user_id>/oferta/<oferta_id> [GET]
Endpoint para consultar un producto o servicio en particular del usuario.
Consulta la tabla oferta.
Recibe el id del usuario, su token y el id de la oferta.
Devuelve un JSON con el producto o servicio en particular.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
```
* Ejemplo Respuesta
```javascript
[{
    descripcion: "The Football Is Good For Training And Recreational Purposes"
    disponibilidad: 1
    estado: "A"
    id_oferta: 9
    id_usuario: 3
    nombre: "Awesome Soft Bacon"
    precio: "85"
    stock: 0
    tipo: "P"
    }
  ]
```

### /user/<user_id>/oferta [POST]
Endpoint para crear una nueva oferta.
Consulta la tabla oferta.
Recibe el id del usuario, su token y todos los campos de la tabla oferta.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          descripcion: "mountain bike rodado 29",
          disponibilidad: "1",
          estado: "A",
          id_usuario: "3",
          nombre: "bicicleta",
          precio: "100000",
          stock: "10",
          tipo: "P"
      })
    }
```
* Ejemplo Respuesta
```javascript
{"message": "Inserción exitosa"}, 201
```

### /user/<user_id>/oferta/<oferta_id> [PUT]
Endpoint para actualizar una oferta ya creada.
Consulta la tabla oferta.
Recibe el id del usuario, su token, el id de la oferta y todos los campos de la tabla oferta.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          descripcion: "mountain bike rodado 29",
          disponibilidad: "1",
          estado: "A",
          id_usuario: "3",
          nombre: "bicicleta",
          precio: "155999",
          stock: "7",
          tipo: "P"
      })
    }
```
* Ejemplo Respuesta
```javascript
{"message": "Actualización exitosa"}, 200
```

### /user/<user_id>/oferta/<oferta_id> [DELETE]
Endpoint para realizar una eliminacion logica una oferta ya creada, cambiando su estado a inactivo (I).
Consulta la tabla oferta.
Recibe el id del usuario, su token, el id de la oferta.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
```
* Ejemplo Respuesta
```javascript
{"message": "Oferta desactivada exitosamente"}, 200
```

### /user/<user_id>/client [GET]
Endpoint para obtener el listado de todos los clientes de un usuario en particular.
Consulta la tabla clientes.
Recibe el id del usuario y su token.
Devuelve un JSON con toda la lista de la tabla clientes.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
```
* Ejemplo Respuesta
```javascript
[
  {
    apellido: "florez"
    cuitCuil: "12212222"
    dni: "245995910"
    domicilio: "calle random 22"
    email: "pepe@mail.com"
    estado: 1
    id_cliente: 13
    id_usuario: 3
    nombre: "pepe"
    telefono: "3939939929"
  },
  ...
]
```

### /user/<user_id>/client/<client_id> [GET]
Endpoint para obtener la información de un cliente en particular que pertenezca a un usuario en particular.
Consulta la tabla clientes.
Recibe el id del usuario, su token y el id del cliente.
Devuelve un JSON con el registro en particular del cliente solicitado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
```
* Ejemplo Respuesta
```javascript
[
  {
    apellido: "florez"
    cuitCuil: "12212222"
    dni: "245995910"
    domicilio: "calle random 22"
    email: "pepe@mail.com"
    estado: 1
    id_cliente: 13
    id_usuario: 3
    nombre: "pepe"
    telefono: "3939939929"
  }
]
```

### /user/<user_id>/client [POST]
Endpoint para crear un cliente nuevo.
Consulta la tabla clientes.
Recibe el id del usuario, su token y los campos requeridos del cliente, como apellido, cuitCuil, dni, domicilio, email, nombre y telefono.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          apellido: "Gonzales",
          cuitCuil: "888777999",
          dni: "40555666",
          domicilio: "Calle 23",
          email: "javier@mail.com",
          nombre: "Javier",
          telefono: "2929858585"
        })
    }
```
* Ejemplo Respuesta
```javascript
{"message": "Cliente creado exitosamente"}, 201
```

### /user/<user_id>/client/<client_id> [PUT]
Endpoint para actualizar la informacion de un cliente ya creado.
Consulta la tabla clientes.
Recibe el id del usuario, su token y los campos requeridos del cliente, como apellido, cuitCuil, dni, domicilio, email, nombre y telefono.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          apellido: "Gonzales",
          cuitCuil: "999777888",
          dni: "39777888",
          domicilio: "Calle 23",
          email: "javier@mail.com",
          nombre: "Javier",
          telefono: "2929858585"
        })
    }
```
* Ejemplo Respuesta
```javascript
{"message": "Cliente actualizado exitosamente"}, 200
```

### /user/<user_id>/client/<client_id> [DELETE]
Endpoint para eliminar de manera logica un cliente ya creado, cambiando su estado a inactivo.
Consulta la tabla clientes.
Recibe el id del usuario, su token y el id del cliente a eliminar.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }}
```
* Ejemplo Respuesta
```javascript
{"message": "Cliente eliminado exitosamente"}, 200
```

### /user/<user_id>/facturas [GET]
Endpoint para obtener el listado de todas las facturas de un usuario en particular.
Consulta la tabla facturas.
Recibe el id del usuario y su token.
Devuelve un JSON con toda la lista de la tabla de facturas.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }}
```
* Ejemplo Respuesta
```javascript
[
  {
    detalle:
      [{
        cantidad: 1,
        id_oferta: 9,
        importe: "85.00",
        nombre_oferta: "Awesome Soft Bacon",
        subtotal: "85.00",
        tipo: "P"
      },
      ... ],
    encabezado:
      {
        apellido_cliente: "florez",
        apellido_usuario: "Gómez",
        cuit_cuil: "12212222",
        domicilio: "calle random 22",
        email: "pepe@mail.com",
        estado: 3,
        fecha: "2023-11-29",
        id_cliente: 13,
        id_factura: 18,
        id_usuario: 3,
        importe_total: "85.00",
        nombre_cliente: "pepe",
        nombre_usuario: "Lucas",
        telefono: "3939939929",
      }
  },
  ...
]
```

### /user/<user_id>/facturas [GET]
Endpoint para obtener la informacion de una factura en particular que pertenezca a un usuario en particular.
Consulta la tabla facturas.
Recibe el id del usuario, su token y el id de la factura.
Devuelve un JSON con toda la informacion de la factura en particular.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }}
```
* Ejemplo Respuesta
```javascript
[
  {
    detalle:
    [{
      cantidad: 1,
      id_oferta: 9,
      importe: "85.00",
      nombre_oferta: "Awesome Soft Bacon",
      subtotal: "85.00",
      tipo: "P"
    },
    ... ],
    encabezado:
      {
        apellido_cliente: "florez",
        apellido_usuario: "Gómez",
        cuit_cuil: "12212222",
        domicilio: "calle random 22",
        email: "pepe@mail.com",
        estado: 3,
        fecha: "2023-11-29",
        id_cliente: 13,
        id_factura: 18,
        id_usuario: 3,
        importe_total: "85.00",
        nombre_cliente: "pepe",
        nombre_usuario: "Lucas",
        telefono: "3939939929",
      }
  }
]
```

### /user/<user_id>/client/<client_id>/facturas [POST]
Endpoint para crear una factura nueva relacionando productos y/o servicios con un cliente, todos pertenecientes a un usuario en particular.
Consulta la tabla facturas.
Recibe el id del usuario, su token, el id del usuario y la informacion requerida para crear una factura, que es que producto y/o servicio se va a facturar y su cantidad.
Devuelve un JSON con la factura recien creada.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          detalle_fc: [
            { id_oferta: 39, cantidad: 1 }, 
            { id_oferta: 42, cantidad: 2 } 
          ]
        }
      )}
```
* Ejemplo Respuesta
```javascript
[
  {
    detalle:
    [{
      cantidad: 1,
      id_oferta: 39,
      importe: "99.00",
      nombre_oferta: "Unbranded Wooden Chips",
      subtotal: "99.00",
      tipo: "S"
    },
    {
      cantidad: 2,
      id_oferta: 42,
      importe: "99.00",
      nombre_oferta: "Oriental Cotton Mouse",
      subtotal: "198.00",
      tipo: "P"
    },
    ... ],
    encabezado:
      {
        apellido_cliente: "Gonzales",
        apellido_usuario: "Gómez",
        cuit_cuil: "888777999",
        domicilio: "Calle 23",
        email: "javier@mail.com",
        estado: 1,
        fecha: "2023-11-29",
        id_cliente: 15,
        id_factura: 26,
        id_usuario: 3,
        importe_total: "297.00",
        nombre_cliente: "Javier",
        nombre_usuario: "Lucas",
        telefono: "2929858585",
      }
  }
]
```

### /user/<user_id>/facturas/<factura_id> [PUT]
Endpoint para actualizar el estado de una factura, este endpoint esta pensado solo para poder cobrar la factura y es el unico dato que se modifica, pasando de 1 (sin pagar), a 3(efectivo), 4(debito) o 5(cheque).
Consulta la tabla facturas.
Recibe el id del usuario, su token, el id de la factura y el estado al que se desea pasar la factura.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify({ forma_pago: 3 })}
```
* Ejemplo Respuesta
```javascript
{"message": "Registro exitoso"}, 201
```

### /user/<user_id>/facturas/<factura_id> [DELETE]
Endpoint para eliminar una factura de manera logica, pasando a estar inactiva (2), esta funcionalidad a pesar de que esta implementada esta pensada para una posible mejora a futuro con notas de credito.
Consulta la tabla facturas.
Recibe el id del usuario, su token y el id de la factura.
Devuelve un JSON con un mensaje de estado.

* Ejemplo Petición
```javascript
const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }}
```
* Ejemplo Respuesta
```javascript
{"message": "FC anulada exitosamente"}, 200
```

### Pruebas de endpoints
Para realizar los testeos de los endpoints se utilizo ThunderClient, una extension de VSCode. Para la facilitacion de estos test, se proporciona en la carpeta raiz del proyecto un archivo llamado "thunder-collection_Proyecto Final.json", si este archivo se importa en thunder client, se tendran toda la coleccion utilizada para los test.

### UML de la API
A continuacion se presentan 2 UML, el primero para las clases que se implementan en la API y el segundo de la base de datos
![UML Clases API](./doc/UML_API.jpg)
![UML Base de datos](./doc/UML_BD.png)