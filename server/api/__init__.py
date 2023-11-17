from flask import Flask
from flask_cors import CORS


#creamos app
app = Flask(__name__)
# Modelo cors. para controlar permisos para acceder a tus recursos
# Habilita CORS para todos los dominios
CORS(app)

app.config['SECRET_KEY'] = 'app_123'

import api.routes.client
import api.routes.users
import api.routes.oferta
import api.routes.factura
