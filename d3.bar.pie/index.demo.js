// (function(){
  // 'use strict';


  var freqData = [
    {
      country: 'AL',
      freq: {
        low: 4786,
        mid: 1319,
        high: 249
      }
    }, {
      country: 'AZ',
      freq: {
        low: 1101,
        mid: 412,
        high: 674
      }
    }, {
      country: 'CT',
      freq: {
        low: 932,
        mid: 2149,
        high: 418
      }
    }, {
      country: 'DE',
      freq: {
        low: 832,
        mid: 1152,
        high: 1862
      }
    }, {
      country: 'FL',
      freq: {
        low: 4481,
        mid: 3304,
        high: 948
      }
    }, {
      country: 'GA',
      freq: {
        low: 1619,
        mid: 167,
        high: 1063
      }
    }, {
      country: 'IA',
      freq: {
        low: 1819,
        mid: 247,
        high: 1203
      }
    }, {
      country: 'IL',
      freq: {
        low: 4498,
        mid: 3852,
        high: 942
      }
    }, {
      country: 'IN',
      freq: {
        low: 797,
        mid: 1849,
        high: 1534
      }
    }, {
      country: 'KS',
      freq: {
        low: 162,
        mid: 379,
        high: 471
      }
    }
  ];
  freqData.forEach(function(d) {
    d.total = d.freq.low + d.freq.mid + d.freq.high;
  });

  var pieChartFirstRanderData = (function(dataA){
    var data = dataA.freq;
    var returnData = [];
    for(var i in data) {
      if(data.hasOwnProperty(i)){
        returnData.push({
          label: i,
          value: data[i],
          country: dataA.country
        });
      }
    }
    return returnData;
  })(freqData[0]);
  var pieChartObj = (function(){
    var pieChartData = pieChartFirstRanderData;
    var container = "pieChart",
      $container = $("#"+container),
      width = $container.width() || 500,
      height = $container.height() || 400;
    var pieChart = new D3pie("pieChart", {
      "data": {
        content: pieChartData
      },
      "header": {
        "title": {
          "text": freqData[0].country,
          "fontSize": 24,
          "font": "open sans"
        },
        "titleSubtitlePadding": 9
      },
      "size": {
        "canvasWidth": width,
        "canvasHeight": height
      },
      "effects": {
        "load": {
          "effect": "none"
        }
      },
      "labels": {
        "inner": {
          "hideWhenLessThanPercentage": 5
        }
      },
      "tooltips": {
        "enabled": true,
        "type": "placeholder",
        "string": "{label}: {value}, {percentage}%"
      },
    });
    pieChart.svg.select('path')
      .on('mouseover', function(){
        // console.log(arguments);
      });
    var pie = d3.layout.pie().sort(null).value(function(d) {
      return d.freq;
    });
    pieChart.update = function(nD) {
      pieChart.svg.selectAll(".p0_pieChart path")
        .data(pie(nD))
        .transition()
        .duration(500)
        .attrTween("d", arcTween);
    };
    // pieChart.bindPieEvent = function(ev, cb) {

    //   var cbClosure = function(){
    //     var argu = Array.apply(this,arguments);
    //     argu.push(pieChart);
    //     cb.apply(this, argu);
    //   };
    //   pieChart.svg
    //     .on(ev,cbClosure);
    // };
    /*
    var num = 4;
    function a(obj){
      obj = obj || {
        label: num+"",
        value: Math.floor(Math.random() * 10) + 1
      }
      pieChartData.push(obj);
      pieChart.updateProp("data.content", pieChartData);
      num++;
    }
    setInterval(function(){
      a();
    }, 2000);
    */
    return pieChart;
  })();
  window.pieChartObj = pieChartObj;
  

  function formatDashBoradData(data, type){
    var returnData;
    returnData = data.map(function(d) {
      var freq = d.freq, arr = [], i, obj;
      for(i in freq){
        if(freq.hasOwnProperty){
          obj = {
            label: i,
            value: freq[i],
            country: d.country
          };
          arr.push(obj);
        }
      }
      if(type === undefined){
        return [d.country, d.total, arr];
      } else {
        return [d.country, d.freq[type], arr];
      }
    });
    // console.log("156", data, type, returnData);
    return returnData;
  }

  var dashBoardObj = (function(){
    function dashBoardFunc(objArgu) {
      function noop() {}
      var barColor = 'steelblue',
        id = objArgu.id,
        data = objArgu.data,
        $container = $(id),
        mouseout = objArgu.mouseout || noop,
        mouseover = objArgu.mouseover || noop,
        width = $container.width() || 500,
        height = $container.height() || 300;

      // compute total for each country.
      

      // function to handle histogram.
      function histogram(formatData) {
        var hgHolder = {},
          boxModel = {
            top: 60,
            right: 0,
            bottom: 30,
            left: 0
          };
        boxModel.width = width - boxModel.left - boxModel.right;
        boxModel.height = height - boxModel.top - boxModel.bottom;

        //create svg for histogram.
        var svg = d3.select(id).append("svg")
          .attr("width", boxModel.width + boxModel.left + boxModel.right)
          .attr("height", boxModel.height + boxModel.top + boxModel.bottom);
        var svgG = svg.append("g")
          .attr("transform", "translate(" + boxModel.left + "," + boxModel.top + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, boxModel.width], 0.1)
          .domain(formatData.map(function(d) {
            return d[0];
          }));

        // Add x-axis to the histogram svg.
        svgG.append("g").attr("class", "x axis")
          .attr("transform", "translate(0," + boxModel.height + ")")
          .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([boxModel.height, 0])
          .domain([0, d3.max(formatData, function(d) {
            return d[1];
          })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = svgG.selectAll(".bar")
          .data(formatData).enter()
          .append("g")
          .attr("class", "bar");

        //create the rectangles.
        bars.append("rect")
          // .transition().duration(500)
          .attr("x", function(d) {
            return x(d[0]);
          })
          .attr("y", function(d) {
            return y(d[1]);
          })
          .attr("width", x.rangeBand())
          .attr("height", function(d) {
            return boxModel.height - y(d[1]);
          })
          .attr('fill', barColor)
          .on("mouseover", mouseoverHolder) // mouseover is defined below.
          .on("mouseout", mouseoutHolder); // mouseout is defined below.

        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d) {
            return d3.format(",")(d[1]);
          })
          .attr("x", function(d) {
            return x(d[0]) + x.rangeBand() / 2;
          })
          .attr("y", function(d) {
            return y(d[1]) - 5;
          })
          .attr("text-anchor", "middle");
        var num = 1;
        function mouseoverHolder(d) {
          // console.log('mouseover', d);
          var argu = Array.apply(this,arguments);
          argu.push(hgHolder);
          mouseover.apply(this, argu);
        }

        function mouseoutHolder(d) {
          // console.log('mouseout', d);
          var argu = Array.apply(this,arguments);
          argu.push(hgHolder);
          mouseout.apply(this, argu);
        }

        // create function to update the bars. This will be used by pie-chart.
        hgHolder.update = function(newData, color) {
          // update the domain of the y-axis map to reflect change in frequencies.
          y.domain([0, d3.max(newData, function(d) {
            return d[1];
          })]);

          // Attach the new data to the bars.
          var bars = svgG.selectAll(".bar").data(newData);

          // transition the height and color of rectangles.
          bars.select("rect").transition().duration(500)
            .attr("y", function(d) {
              return y(d[1]);
            })
            // .attr("fill", color);
            .attr("height", function(d) {
              return boxModel.height - y(d[1]);
            });

          // transition the frequency labels location and change value.
          bars.select("text").transition().duration(500)
            .text(function(d) {
              return d3.format(",")(d[1]);
            })
            .attr("y", function(d) {
              return y(d[1]) - 5;
            });
        };

        hgHolder.bindBarEvent = function(ev, cb){
          var cbClosure = function(){
            var argu = Array.apply(this,arguments);
            argu.push(hgHolder);
            cb.apply(this, argu);
          };
          bars.select("rect")
            .on(ev,cbClosure);
        };

        hgHolder.svg = svg;
        hgHolder.bars = bars;

        return hgHolder;

      }

      var sF = formatDashBoradData(freqData);
      return histogram(sF);
    }



    var dashBoard = dashBoardFunc({
      id: '#dashboard',
      /*mouseover: function(d3data, index, zero, that){
        console.log('mouseover', this, d3data, index, zero, that);
        var arr = d3data[2];
        if(arr.length > 0){
          console.log(arr.length, arr)
          pieChartObj.updateProp("data.content", arr);
        }
      },*/
      data: freqData
    });
    return dashBoard;
  })();

  window.dashBoardObj = dashBoardObj;
  dashBoardObj.svg.append('text').attr('class','dash-title').text('total').attr("text-anchor", "begin").attr('x', 0).attr('y',10);
  dashBoardObj.bindBarEvent('mouseover', function(d3data, index, zero, that){
    // console.log('mouseover', this, d3data, index, zero, that);
    var arr = d3data[2];
    // console.log(d3data, arr);
    if(arr.length > 0){
      // console.log(arr.length, arr);
      pieChartObj.updateProp("data.content", arr);
      pieChartObj.updateProp("header.title.text", d3data[0]);
    }
  });
  // pieChartObj.bindPieEvent('mouseover', function(d3data, index, zero, that){
  //   console.log('mouseover', this, d3data, index, zero, that);
  //   var arr = d3data[2];
  //   if(arr.length > 0){
  //     console.log(arr.length, arr)
  //   }
  // });
  
  pieChartObj.updateProp('callbacks.onMouseoverSegment', function(D3PieData){
    // console.log('mouseover', arguments, D3PieData);
    var data = formatDashBoradData(freqData, D3PieData.data.label);
    dashBoardObj.svg.select('text.dash-title').text(D3PieData.data.label);
    // console.log(D3PieData.data, D3PieData.data.label+"", D3PieData.data.value, data);
    dashBoardObj.update(data);
  });

  $('#showtotal').on('click', function(){
    var data = formatDashBoradData(freqData);
    dashBoardObj.svg.select('text.dash-title').text('total');
    dashBoardObj.update(data);
  });

// })();
