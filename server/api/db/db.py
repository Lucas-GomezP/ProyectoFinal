from api import app
from flask_mysqldb import MySQL
from flask import Flask, request, render_template


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'aleadmin'
app.config['MYSQL_PASSWORD'] ='123456'
app.config['MYSQL_DB'] = 'db_api_facturacion'

mysql = MySQL(app)

