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
    }).then(function(data){
        // console.log("data:");
        console.log(data);
        createMap(data);
});
console.log("middle");
fetch(`/stations`, {mode: "no-cors"})
    .then(function(response) {
        return response.json();
    }).then(function(stations){
        console.log(stations);
        // createMap(stations);
});
console.log("end");
function createMap(data) {
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
    
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        data: data
    };
    
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
        47.88, -120.64
        ],
        zoom: 7,
        layers: [streetmap, data]
    });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

    for (var i = 0; i < data.make; i++) {
        console.log(data.make);

    // var make = data[i]; // here we are assigning a variable to an object within the array, as we iterate through, city will be ONE object of the array and move onto the next as we iterate through
    // L.marker(data.vehicle_location) // we grab the value within that object's key - here we are grabbing the lat and long values from the key, location
    //   .bindPopup("<h1>" + data.make + "</h1> <hr>")
    //   .addTo(myMap);
    }

}