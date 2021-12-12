function bar_plot(data,ax,title=""){
    console.log(data);
    var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin

//console.log(height)
let xScale = d3.scaleBand().range([0,width]).padding(0.4);
let yScale = d3.scaleLinear().range([height, 0]);
let axis = d3.select(`${ax}`)
var g = axis.append("g")
            .attr("transform", "translate(" + 100+ "," + 100 + ")");
    data.then(data => {
    xScale.domain(data.map(function(d) { return d.date; }));
    yScale.domain([0, d3.max(data, function(d) { return d.close; })]);

    g.append("g")
    .attr("class","axisLabel")
     .attr("transform", "translate(0," + 800 + ")")
     .call(d3.axisBottom(xScale)
     .tickFormat(d3.timeFormat("%b")));
    g.append("text")             
      .attr("transform",
      "translate(" +300 +"," + 850 + ")")
      .style("text-anchor", "middle")
      .text("Date");

    g.append("g")
    .attr("class","axisLabel")
     .call(d3.axisLeft(yScale));
    g.append("text")
     .attr("transform","translate(" + -50 + "," + 300 + ")",)
  .style("text-anchor", "middle")
  .text("Close_value");    
    let colors = ["#FF36AB", "#3D0021", "#FF1F39", "#F9CAC8"];
    axis.append('text')
        .attr('x',500)
        .attr('y',80)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","title")


    g.selectAll(".bar")
     .data(data)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return xScale(d.date); })
     .attr("y", function(d) { return yScale(d.close); })
     .attr("width", 50)
     .attr("height", function(d) { return height - yScale(d.close); })
    });

}