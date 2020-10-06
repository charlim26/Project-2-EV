CREATE TABLE EV_DATA (
	make VARCHAR(100),
    model VARCHAR(100),
    model_year numeric,
	city VARCHAR (100),
	states VARCHAR(100),
	zip numeric,
	dol_vechile_id INT,
	electric_range INT,
	electric_vehicle_type VARCHAR (100),
	vehicle_location VARCHAR (100),
	base_msrp numeric
);

ALTER TABLE ev_data
    ADD CONSTRAINT ev_data_pk PRIMARY KEY ("dol_vechile_id");
	
CREATE TABLE EV_STATIONS (
	station_id int PRIMARY KEY,
    charging_status VARCHAR(100),
    lat numeric,
	long numeric,
	address VARCHAR(100),
	zip_code numeric,
	outlet_counts numeric
);

select * from EV_STATIONS
select * from ev_data
