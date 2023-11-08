# Proyecto Final

# Tabla de Contenidos

- [Integrantes](#Integrantes)
- [Requisitos](#Requisitos)
- [Instalación](#Instalación)
  - [Backend](#Backend)
  - [Frontend](#Frontend)
- [Ejecución](#Ejecución)
  - [Server](#Server)
  - [Client](#Client)
- [Tests](#Tests)
- [Directorios](#Directorios)
  - [Backend](#Backend)
  - [Frontend](#Frontend)

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
* Tailwind CSS 3
* React Router DOM
* React Hook Form

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
  1. Si no se tiene creado el usuario se debe realizar con la misma informacion puesta en el archivoo db.py
  2. A continuacion crear la base de datos y sus respectivas tablas con la informacion del archivo database.sql
2. Inicializar el servidor:
  1. Desde la carpeta ./server utilizar:
  ```
  .venv\Scripts\activate

  py main.py
  ```
3. Inicializar el servidor:
  1. Si no se tienen instaladas las dependencias, desde la carpeta ./client:
  ```
  npm install
  ```
  2. Una vez instaladas las dependencias:
  ```
  npm run dev
  ```
4. Una vez funcionando la base de datos con la informacion dada, desde la pagina base del front (http://localhost:5173) ingresar con uno de los usuarios ya registrados