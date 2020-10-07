//include logic.js
//d3.select("#bar-plot").text("hello world")

var test = [1,2,3]
console.log("start");

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
        addStations(data);
});

console.log("middle");

fetch(`/stations`, {mode: "no-cors"})
    .then(function(response) {
        return response.json();
    }).then(function(data){
        console.log(data[0]);
        
        addCars(data);
});

console.log("end");

createMap();



