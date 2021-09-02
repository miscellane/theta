function makeSimple(){
    d3.tsv("https://raw.githubusercontent.com/miscellane/theta/develop/data/simple.tsv")
        .then(function(data){
            d3.select("svg")            // return ... only the first matching node
                .selectAll("circle")    // return ... a collection of all matching nodes
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 3).attr("fill", "red")
                .attr("cx", function(d) {return d["x"]})
                .attr("cy", function(d) {return d["y"]})            
        });
}