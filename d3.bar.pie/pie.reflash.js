var data = [
  { label: "1", value: 1 },
  { label: "2", value: 4 },
  { label: "3", value: 3 }
];

var d3piePie = new d3pie("pieChart", {
  data: {
    content: data
  }
});

// $(function() {
//   $("#refreshBtn").on("click", function(e) {
//     pie.redraw();
//   });
// });

var num = 4;
/*
data.push({
  label: num.toString(),
  value: Math.floor(Math.random() * 10) + 1
});

pie.updateProp("data.content", data);
num++;
*/