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

@app.route('/electric', methods=['GET'])
def viz():
    session = Session(engine)
    result = session.query(db_ev).all()
    data = [{
        "make" : c.make,
        "model" : c.model,
        "model_year" : c.model_year,
        "city" : c.city,
        "states" : c.states,
        "zip" : c.zip,
        "id" : c.dol_vechile_id,
        "range" : c.electric_range,
        "vehicle_type" : c.electric_vehicle_type,
        "vehicle_location" : c.vehicle_location,
        "base_msrp" : c.base_msrp
        } for c in result]
    # print(data[0:5])
    return jsonify(data)

#returns charging station data
@app.route('/stations', methods=['GET'])
def viz2():
    session = Session(engine)
    result = session.query(db_stations).all()
    data = [{
        "id" : c.station_id,
        "status" : c.charging_status,
        "lat" : c.lat,
        "long" : c.long,
        "address" : c.address,
        "zip" : c.zip_code,
        "outlets" : c.outlet_counts
        } for c in result]
    # print(data[0:5])
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)