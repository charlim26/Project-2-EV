drop table EV_DATA
drop table EV_STATIONS

CREATE TABLE EV_DATA (
	make VARCHAR(100),
    model VARCHAR(100),
    model_year INT,
	city VARCHAR (100),
	states VARCHAR(100),
	zip INT,
	dol_vechile_id INT,
	electric_range INT,
	electric_vehicle_type VARCHAR (100),
	vehicle_location VARCHAR (100),
	base_msrp INT
);

ALTER TABLE ev_data
    ADD CONSTRAINT ev_data_pk PRIMARY KEY ("dol_vechile_id");
	
CREATE TABLE EV_STATIONS (
	station_id INT PRIMARY KEY,
    charging_status VARCHAR(100),
    lat float,
	long float,
	address VARCHAR(100),
	zip_code INT,
	outlet_counts INT
);