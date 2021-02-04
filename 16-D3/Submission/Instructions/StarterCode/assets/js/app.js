// @TODO: YOUR CODE HERE!
$(document).ready(function() {
    makePlot();

    //event listener
    $(window).resize(function() {
        makePlot();
    });

});

function makePlot() {
    d3.csv("/assets/data/data.csv").then(function(census_data) {
        console.log(census_data)
    });
    // STEP 1: SET UP THE CANVAS
    $("#scatter").empty();

    // var svgWidth = 960;
    var svgWidth = window.innerWidth;
    var svgHeight = 500;

    var margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    };

    var chart_width = svgWidth - margin.left - margin.right;
    var chart_height = svgHeight - margin.top - margin.bottom;

    // STEP 2: CREATE THE SVG (if it doesn't exist already)
    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // STEP 3: PREPARE THE DATA
    census_data.forEach(function(row) {
        row.poverty = +row.poverty;
        row.healthcare = +row.healthcare;

        // STEP 4: Create the Scales
        var xScale = d3.scaleLinear()
            .domain(d3.extent(census_data, d => d.poverty))
            .range([0, chart_width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.extent(census_data, d => d.healthcare)])
            .range([chart_height, 0]);

    });


}