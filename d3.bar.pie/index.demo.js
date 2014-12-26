(function(){
  'use strict';
  var pieChart = (function(){
    var pieChartData = [
      { label: "1", value: 1 },
      { label: "2", value: 4 },
      { label: "3", value: 3 }
    ];
    var container = "pieChart",
      $container = $("#"+container),
      width = $container.width() || 500,
      height = $container.height() || 400;
    var pieChart = new D3pie("pieChart", {
      data: {
        content: pieChartData
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
    });
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

  (function(){
    function dashBoard(objArgu) {
      function noop() {}
      var barColor = 'steelblue',
        id = objArgu.id,
        data = objArgu.data,
        $container = $(id),
        mouseout = objArgu.mouseout || noop,
        mouseover = objArgu.mouseover || noop,
        width = $container.width() || 500,
        height = $container.height() || 300;

      // compute total for each state.
      data.forEach(function(d) {
        d.total = d.freq.low + d.freq.mid + d.freq.high;
      });

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
          .attr("height", boxModel.height + boxModel.top + boxModel.bottom).append("g")
          .attr("transform", "translate(" + boxModel.left + "," + boxModel.top + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, boxModel.width], 0.1)
          .domain(formatData.map(function(d) {
            return d[0];
          }));

        // Add x-axis to the histogram svg.
        svg.append("g").attr("class", "x axis")
          .attr("transform", "translate(0," + boxModel.height + ")")
          .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([boxModel.height, 0])
          .domain([0, d3.max(formatData, function(d) {
            return d[1];
          })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = svg.selectAll(".bar").data(formatData).enter()
          .append("g").attr("class", "bar");

        //create the rectangles.
        bars.append("rect")
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
          mouseover.apply(this, arguments);
        }

        function mouseoutHolder(d) {
          // console.log('mouseout', d);
          mouseout.apply(this, arguments);
        }

        // create function to update the bars. This will be used by pie-chart.
        hgHolder.update = function(nD, color) {
          // update the domain of the y-axis map to reflect change in frequencies.
          y.domain([0, d3.max(nD, function(d) {
            return d[1];
          })]);

          // Attach the new data to the bars.
          var bars = svg.selectAll(".bar").data(nD);

          // transition the height and color of rectangles.
          bars.select("rect").transition().duration(500)
            .attr("y", function(d) {
              return y(d[1]);
            })
            .attr("height", function(d) {
              return boxModel.height - y(d[1]);
            })
            .attr("fill", color);

          // transition the frequency labels location and change value.
          bars.select("text").transition().duration(500)
            .text(function(d) {
              return d3.format(",")(d[1]);
            })
            .attr("y", function(d) {
              return y(d[1]) - 5;
            });
        };
        return hgHolder;


      }

      var sF = data.map(function(d) {
        var freq = d.freq, arr = [], i, obj;
        for(i in freq){
          if(freq.hasOwnProperty){
            obj = {
              label: i,
              value: freq[i]
            };
            arr.push(obj);
          }
        }
        return [d.State, d.total, arr];
      });
      return histogram(sF);
    }


    var freqData = [
      {
        State: 'AL',
        freq: {
          low: 4786,
          mid: 1319,
          high: 249
        }
      }, {
        State: 'AZ',
        freq: {
          low: 1101,
          mid: 412,
          high: 674
        }
      }, {
        State: 'CT',
        freq: {
          low: 932,
          mid: 2149,
          high: 418
        }
      }, {
        State: 'DE',
        freq: {
          low: 832,
          mid: 1152,
          high: 1862
        }
      }, {
        State: 'FL',
        freq: {
          low: 4481,
          mid: 3304,
          high: 948
        }
      }, {
        State: 'GA',
        freq: {
          low: 1619,
          mid: 167,
          high: 1063
        }
      }, {
        State: 'IA',
        freq: {
          low: 1819,
          mid: 247,
          high: 1203
        }
      }, {
        State: 'IL',
        freq: {
          low: 4498,
          mid: 3852,
          high: 942
        }
      }, {
        State: 'IN',
        freq: {
          low: 797,
          mid: 1849,
          high: 1534
        }
      }, {
        State: 'KS',
        freq: {
          low: 162,
          mid: 379,
          high: 471
        }
      }
    ];

    dashBoard({
      id: '#dashboard',
      data: freqData,
      mouseover: function(d3data, index){
        console.log('mouseover', d3data, index);
        var arr = d3data[2];
        if(arr.length > 0){
          console.log(arr.length, arr)
          pieChart.updateProp("data.content", arr);
        }
      }
    });
  })();
})();
