function makeSuccinct(){
    d3.tsv("https://raw.githubusercontent.com/miscellane/theta/develop/data/succinct.tsv")
        .then(function(data){

            var svg = d3.select("svg");


            // SVG area specification
            var width = svg.attr("width");
            var height = svg.attr("height");
            

            // scaling
            var makeScale = function(accessor, range){
                return d3.scaleLinear()
                    .domain(d3.extent(data, accessor))
                    .range(range).nice();
            }
            var scX = makeScale(d => d["x"], [0, width]);
            var scRoot = makeScale(d => d["root"], [height, 0]);
            var scStem = makeScale(d => d["stem"], [height, 0]);


            // drawing
            var drawData = function(g, accessor, curve){

                // draw circles
                g.selectAll("circle")
                    .data(data).enter()
                    .append("circle")
                    .attr("r", 3)
                    .attr("cx", d => scX(d["x"]))
                    .attr("cy", accessor);

                
                // draw lines
                var lineMaker = d3.line()
                    .curve(curve)
                    .x(d => scX(d["x"]))
                    .y(accessor);
                g.append("path")
                    .attr("fill", "none")
                    .attr("d", lineMaker(data));

            }

            var gRoot = svg.append("g");
            var gStem = svg.append("g");
            drawData(gRoot, d => scRoot(d["root"]), d3.curveStep);
            drawData(gStem, d => scStem(d["stem"]), d3.curveNatural);

            gRoot.selectAll("circle").attr("fill", "blue")
            gRoot.selectAll("path").attr("stroke", "blue")
            gStem.selectAll("circle").attr("fill", "green")
            gStem.selectAll("path").attr("stroke", "green")

            var axisMaker = d3.axisRight(scRoot); // draws tick labels on the right side of an axis
            axisMaker(svg.append("g"));
            axisMaker = d3.axisLeft(scStem);

            svg.append("g")
                .attr("transform", "translate(" + width + ",0)")
                .call(axisMaker);

            svg.append("g")
                .call(d3.axisTop(scX))
                .attr("transform", "translate(0," + height + ")")

        });
}