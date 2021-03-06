// need to create a simple viz using d3.json(`/whatever_route`).then(function(something) {})
// let allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
//     next();
//   }
// //app.use(allowCrossDomain);

// d3.select("#bar-plot").text("hello world");

// var test = [1,2,3]

fetch(`/electric`, {mode: "no-cors"})
    .then(function(response) {
        // console.log(response);
        var r = response.json();
        // console.log("response:");
        // console.log(r);
        return r;
    }).then(function(car_data){
        // console.log("data:");
        console.log(car_data[0]);
        passCarData(car_data);
});

for (var i =0; i < DataCue.length)









console.log("middle");
function passCarData(car_data) {
    fetch(`/stations`, {mode: "no-cors"})
        .then(function(response) {
            return response.json();
        }).then(function(station_data){
            console.log(station_data[0]);
            passStationData(car_data, station_data);
    })
};
function passStationData(car_data, station_data) {

    d3.json(`static/WA_counties_geo.json`, function(geo) {
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.NAME + "</h3>");
        }
        console.log(geo.features[0]);
        var geolayer = L.geoJSON(geo.features, {
            onEachFeature: onEachFeature
        });
        createMap(car_data, station_data, geolayer);
    })
}

console.log("end");
function createMap(car_data, station_data, geo) {
    // Define streetmap and darkmap layers
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
    
    // An array which will be used to store created stationMarkers
    var stationMarkers = [];
    
    for (var i = 0; i < station_data.length; i++) {
        // loop through the station array, create a new marker, push it to the stationMarkers array
        stationMarkers.push(
        L.marker([station_data[i].lat, station_data[i].long]).bindPopup("<h1>" + station_data[i].address + "</h1> <hr> <h3>Number of outlets " + station_data[i].outlets + "</h3> <hr> <h3>Operational status " + station_data[i].status + "</h3>"));
    }
    
    // Add all the stationMarkers to a new layer group.
    // Now we can handle them as one group instead of referencing each individually
    var stationLayer = L.layerGroup(stationMarkers);

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        counties: geo,
        stations: stationLayer
    };
    
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
        47.88, -120.64
        ],
        zoom: 7,
        layers: [streetmap, geo, stationLayer]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
}