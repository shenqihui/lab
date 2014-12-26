// other pie
var data = [
  {
    "label": "JavaScript",
    "value": 264131,
    "color": "#2484c1"
  }, {
    "label": "Ruby",
    "value": 218812,
    "color": "#0c6197"
  }, {
    "label": "Java",
    "value": 157618,
    "color": "#4daa4b"
  }, {
    "label": "PHP",
    "value": 114384,
    "color": "#90c469"
  }, {
    "label": "Python",
    "value": 95002,
    "color": "#daca61"
  }
];
var pie = new d3pie("pieChart", {
  // "header": {
  //     "title": {
  //         "text": "Lots of Programming Languages",
  //         "fontSize": 24,
  //         "font": "open sans"
  //     },
  //     "subtitle": {
  //         "text": "A full pie chart to show off label collision detection and resolution.",
  //         "color": "#999999",
  //         "fontSize": 12,
  //         "font": "open sans"
  //     },
  //     "titleSubtitlePadding": 9
  // },
  "footer": {
    "color": "#999999",
    "fontSize": 10,
    "font": "open sans",
    "location": "bottom-left"
  },
  "size": {
    "canvasWidth": 590
  },
  "data": {
    "sortOrder": "value-desc",
    "content": data,
  },
  "labels": {
    "outer": {
      "pieDistance": 32
    },
    "inner": {
      "hideWhenLessThanPercentage": 3
    },
    "mainLabel": {
      "fontSize": 11
    },
    "percentage": {
      "color": "#ffffff",
      "decimalPlaces": 0
    },
    "value": {
      "color": "#adadad",
      "fontSize": 11
    },
    "lines": {
      "enabled": true
    }
  },
  "effects": {
    "pullOutSegmentOnClick": {
      "effect": "linear",
      "speed": 400,
      "size": 8
    }
  },
  "misc": {
    "gradient": {
      "enabled": true,
      "percentage": 100
    }
  }
});