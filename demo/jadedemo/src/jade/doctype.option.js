var jade = require("./");

// Compile a function
var fn = jade.compile('img(src="foo.png")', {doctype: 'xml'});

// Render the function
var html = fn({});
// => '<img src="foo.ong"></img>'

// Compile a function
var fn = jade.compile('img(src="foo.png")', {doctype: 'html'});

// Render the function
var html = fn({});
// =>'<img src="foo.png">'