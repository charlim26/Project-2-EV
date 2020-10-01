## Team Electric Flask App ##
# to run the app use command python app.py or py app.py (you can paramter port=0000 to change the prt)
### 1. Import libraries and dependencies
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import config
import numpy as np

# 2. Create an app and pass parameter "__name__"
app = Flask(__name__)

engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
Base = automap_base()
Base.prepare(engine, reflect=True)
db = Base.classes.customer_name
print(Base.classes.keys())
# pull the URI and other configurations from the config file in the app
# app.config.from_pyfile('config.py')
# Creating the database by using this function
# db = sqlachemy()
# db.init_app(app)
# db.Model = automap_base(db.Model)

@app.route('/electric')
def viz():
    session = Session(engine)
    results = session.query(db.county_name)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
