## Team Electric Flask App ##
# to run the app use command python app.py or py app.py (you can paramter port=0000 to change the prt)
### 1. Import libraries and dependencies
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import sqlalchemy
from sqlalchemy.ext.automap import automap_base
import config

import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import numpy as np

# 2. Create an app and pass parameter "__name__"
app = Flask(__name__)

# pull the URI and other configurations from the config file in the app
app.config.from_pyfile('config.py')
# Creating the database by using this function
db = SQLAlchemy()
db.init_app(app)
db.Model = automap_base(db.Model)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('')
def viz(data):
    db.Model.prepare(db.engine, reflect=True)
    print(db.Model.classes.keys())
    #tables "customer_name" columns: id, county_name, license_count, county_id
    data = db.Model.classes['customer_name']
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
