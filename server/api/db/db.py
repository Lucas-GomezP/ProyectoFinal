from flask_mysqldb import MySQL
from api import app

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'user_api_flask'
app.config['MYSQL_PASSWORD'] ='password'
app.config['MYSQL_DB'] = 'db_api_flask'


mysql = MySQL(app)