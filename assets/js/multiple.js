function makeMultiple() {
    d3.tsv("https://raw.githubusercontent.com/miscellane/theta/develop/data/multiple.tsv")
        .then(function(data){

            var width = 300, height = 150, 
                margin = {top: 20, right: 20, bottom: 20, left: 20};

            var scX = d3.scaleLinear()
                .domain(d3.extent(data, d => d["x"]))
                .range([margin.left, width - margin.right]);

            var scY1 = d3.scaleLinear()
                .domain(d3.extent(data, d => d["y1"]))
                .range([height - margin.bottom, margin.top]);

            var scY2 = d3.scaleLinear()
                .domain(d3.extent(data, d => d["y2"]))
                .range([height - margin.bottom, margin.top]);

            d3.select("svg")
                .append("g").attr("id", "ds1")  // The SVG <g> element provides a logical grouping.
                .selectAll("circle")
                .data(data).enter()
                .append("circle")
                .attr("r", 3).attr("fill", "green")
                .attr("cx", d => scX(d["x"]))
                .attr("cy", d => scY1(d["y1"]));

            d3.select("svg")
                .append("g").attr("id", "ds2")
                .attr("fill", "blue")
                .selectAll("circle")
                .data(data).enter()
                .append("circle")
                .attr("r", 3)       // inherits the fill style of the parent element <g>
                .attr("cx", d => scX(d["x"]))
                .attr("cy", d => scY2(d["y2"]));

            var lineMaker = d3.line()
                .x(d => scX(d["x"]))
                .y(d => scY1(d["y1"]));

            d3.select("#ds1")   // Selects the <g> element of a data set via its 'id' attribiute
                .append("path")
                .attr("fill", "none").attr("stroke", "black")
                .attr("d", lineMaker(data));

            lineMaker.y(d => scY2(d["y2"]));

            d3.select("#ds2")
                .append("path")
                .attr("fill", "none").attr("stroke", "black")
                .attr("d", lineMaker(data));

        })

}