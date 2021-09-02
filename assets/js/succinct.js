function makeSuccinct(){
    d3.tsv("https://raw.githubusercontent.com/miscellane/theta/develop/data/succinct.tsv")
        .then(function(data){

            var svg = d3.select("svg");


            // SVG area specification
            var width = svg.attr("width");
            var height = svg.attr("height");
            var margin = {top: 20, right: 20, bottom: 20, left: 20};
            

            // scaling
            var makeScale = function(accessor, range){
                return d3.scaleLinear()
                    .domain(d3.extent(data, accessor))
                    .range(range).nice();
            }
            var scX = makeScale(d => d["x"], [margin.left, width - margin.right]);
            var scRoot = makeScale(d => d["root"], [height - margin.bottom, margin.top]);
            var scStem = makeScale(d => d["stem"], [height - margin.bottom, margin.top]);


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

        })
}