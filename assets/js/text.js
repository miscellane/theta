function makeElements() {
    var vs = ['east', 'west', 'north', 'south'];

    d3.select('body')
        .append('ul').selectAll('li')
        .data(vs).enter()
        .append('li').text(d => d)
        .on('click', function(){
            this.toggleState = !this.toggleState;
            d3.select(this)
                .transition().duration(1000) // milliseconds
                .style('color', this.toggleState ? 'red' : 'black')
        })
}