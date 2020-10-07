// need to create a simple viz using d3.json(`/whatever_route`).then(function(something) {})
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
//app.use(allowCrossDomain);

d3.select(".bar-plot").text("hello world")

var test = [1,2,3]

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
    }).then(function(data){
        console.log(data);
        createMap(data);
});
console.log("end");
function createMap (data) {
}