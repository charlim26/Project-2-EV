

fetch(`/electric`, {mode: "no-cors"})
    .then(function(response) {
        // console.log(response);
        var r = response.json();
        // console.log("response:");
        // console.log(r);
        return r;
    }).then(function(data){
        // console.log("data:");
        console.log(data[0]);
        passCarData(data);
});
// console.log("middle");
function passCarData(car_data) {
    fetch(`/stations`, {mode: "no-cors"})
        .then(function(response) {
            return response.json();
        }).then(function(data){
            console.log(data[0]);
            passStationData(car_data, data);
    })
};
function passStationData(car_data, station_data) {

    d3.json(`static/WA_counties_geo.json`, function(geo) {
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + "feature.properties.place" +
            "</h3><hr><p>" + "new Date(feature.properties.time)" + "</p>");
        }
        console.log(geo.features[0]);
        var geolayer = L.geoJSON(geo.features, {
            onEachFeature: onEachFeature
        });
        createMap(car_data, station_data, geolayer);
    })
}

// console.log("end");
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
    
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        data: geo
    };
    
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
        47.88, -120.64
        ],
        zoom: 7,
        layers: [streetmap, geo]
    });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
    
    heatMap(car_data).addTo(myMap);
}

function heatMap(data) {
  var heatArray = [];

  for (var i = 0; i < data.length; i++) {
    var str = data[i].vehicle_location;
    if (str) {
      var arr = str.split(" ");
      var long = arr[1].substring(1);
      var lat = arr[2].substring(0, arr[2].length - 1);
      // "+" to make sure a string becomes a numeric value
      heatArray.push([+lat, +long]);
    }
  }
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  });

  return heat;
}