// need to create a simple viz using d3.json(`/whatever_route`).then(function(something) {})
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
//app.use(allowCrossDomain);



d3.select(".bar-plot").text("hello world")

var test = [1,2,3]

d3.json(`http://127.0.0.1:5000/electric`, {mode: "no-cors"})
    .then(function(data) {
        console.log(data.car_make);
});

// fetch(`http://127.0.0.1:5000/electric`, {mode: "no-cors"})
//     .then(function(response) {
//         return response.json();
//     }).then(function(data){
//         console.log(data);
// });

fetch(`http://127.0.0.1:5000/stations`, {mode: "no-cors"})
    .then(function(response) {
      return response.json();
    }).then(function(data){
      console.log(data);
});