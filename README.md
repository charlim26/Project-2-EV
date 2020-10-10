# Project-2-EV
Project 2 BCS 

Sources:
https://eric.clst.org/tech/usgeojson/
ERIC CELESTE 
Saint Paul, Minnesota, efc@clst.org

https://openchargemap.org/
Open Charge Map
by Christopher Cook

https://catalog.data.gov/dataset/electric-vehicle-population-data
From Washington State, data.wa.gov

To use:
add config.py to base folder, 

SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:PASSWORD@localhost:5432/electric_db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

add config.js to static/

const API_KEY = "YourMapBoxKey";

load Electric_Vehicle_Population_Data.csv into ev_data and electric_data.csv into ev_stations according to ev_data_table.sql

run
py app.py
