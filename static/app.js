// need to create a simple viz using d3.json(`/whatever_route`).then(function(something) {})
d3.select(".bar-plot").text("hello world")

var test = [1,2,3]

d3.json(`/electric`).then(function(data) {
    console.log(data);
})