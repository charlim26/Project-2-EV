// need to create a simple viz using d3.json(`/whatever_route`).then(function(something) {})

d3.json(`http://localhost:5000/electric`).then(function(data) {
    console.log(data);
})