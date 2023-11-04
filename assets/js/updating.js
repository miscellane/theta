window.addEventListener( "load", makeUpdates );
function makeUpdates(){

    // the data
    var initial = [['mary', 1], ['jane', 4], ['anne', 2]];
    var next = [['anne', 5], ['jane', 3]];

    var scX = d3.scaleLinear().domain([0, 6]).range([50, 300]);
    var scY = d3.scaleLinear().domain([0, 3]).range([50, 150]);

    // vertical position trackers -> text & circle
    var j = -1, k = -1;

    var svg = d3.select('#updates');

    // text labels, https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
    svg.selectAll('text')
        .data(initial).enter().append('text')
        .attr('x', 20).attr('y', d => scY(++j)).text(d => d[0]);

    // circles
    svg.selectAll('circle')
        .data(initial).enter().append('circle')
        .attr('r', 5).attr('fill', 'red')
        .attr('cx', d => scX(d[1]))
        .attr('cy', d => scY(++k) - 5);

    svg.on('click', function(){

        var cs = svg.selectAll('circle').data(next, d => d[0]);
    
        cs.transition().duration(1000).attr('cx',d => scX(d[1]));
        cs.exit().attr('fill', 'blue');
        
    });

}