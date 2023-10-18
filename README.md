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
2. Acceder a la ruta dada (ej. http://localhost:5143)

## Tests
En thunder client, importar el archivo llamado "thunder-collection_ProyectoFinal.json".
En ese archivo se debera guardar la informacion de los test para las colecciones.
