function createMap() {
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
        });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
        });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
        };

    // Create a new map
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap]
        });

    // Create a layer control containing our baseMaps
    // Be sure to add an overlay Layer containing the earthquake GeoJSON
    L.control.layers(baseMaps, {
        collapsed: false
        }).addTo(myMap);

};
function addStations (station_data) {
    // address: "676 Woodland Square Loop SE"
    // id: 167633
    // lat: 47.04178372
    // long: -122.8259168
    // outlets: 4
    // status: "TRUE"
    // zip: 98503
}
function addCars (cars_data) {
    // base_msrp: 27300
    // city: "OLYMPIA"
    // id: 168473210
    // make: "Toyota"
    // model: "Prius Prime"
    // model_year: 2018
    // range: 25
    // states: "WA"
    // vehicle_location: "POINT (-122.97996899999998 47.078241)"
    // vehicle_type: "Plug-in Hybrid Electric Vehicle (PHEV)"
    // zip: 98502
}