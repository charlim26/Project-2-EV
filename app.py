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
# SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/customer_db'
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
Base = automap_base()
Base.prepare(engine, reflect=True)
db = Base.classes.ev_data
print(db)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/electric')
def viz():
    session = Session(engine)
    result = session.query(db.make).all()
    data = [{"car_make:" : c.make} for c in result]
    print(data[0:5])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

