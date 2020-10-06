## Team Electric Flask App ##
# to run the app use command python app.py or py app.py (you can paramter port=0000 to change the prt)
### 1. Import libraries and dependencies
from flask import Flask, jsonify, render_template
# from flask_sqlalchemy import sqlalchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import config
import numpy as np


# 2. Create an app and pass parameter "__name__"
app = Flask(__name__)

# Using the "customer_db" database from our previous assignment
# SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:PASSWORD@localhost:5432/customer_db'
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
Base = automap_base()
Base.prepare(engine, reflect=True)
db_ev = Base.classes.ev_data
db_stations = Base.classes.ev_stations
#print(db)

@app.route('/')
def home():
    return render_template("index.html")
# CREATE TABLE EV_DATA (
# 	make VARCHAR(100),
#     model VARCHAR(100),
#     model_year numeric,
# 	city VARCHAR (100),
# 	states VARCHAR(100),
# 	zip numeric,
# 	dol_vechile_id INT,
# 	electric_range INT,
# 	electric_vehicle_type VARCHAR (100),
# 	vehicle_location VARCHAR (100),
# 	base_msrp numeric
# );
# ​

@app.route('/electric', methods=['GET'])
def viz():
    session = Session(engine)

    result = session.query(db_ev).all()

    data = [{
        "car_make" : c.make,
        "year" : c.model_year
        } for c in result]
    #print(result)
    return jsonify(data)
# import json
# from bson import json_util
# from bson.objectid import ObjectId
# @app.route("/data", methods = ['GET'])
# def index():
#     data = list(db.zones.find())
#     return json.dumps(data)
	
# CREATE TABLE EV_STATIONS (
# 	station_id int PRIMARY KEY,
#     charging_status VARCHAR(100),
#     lat numeric,
# 	long numeric,
# 	address VARCHAR(100),
# 	zip_code numeric,
# 	outlet_counts numeric

@app.route('/stations', methods=['GET'])
def viz2():
    session = Session(engine)
    result = session.query(db_stations).all()
    # print(data[0:5])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

