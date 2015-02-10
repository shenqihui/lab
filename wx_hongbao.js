// save old ajax
$._ajax = $.ajax;
// incase something.
function noop() {}
// to test the url
var regex = /^https:\/\/wxapp.tenpay.com.*?\?(.*)$/;
// accord $.ajax to change
function ajaxHacker(e, n) {
  // old success function
  e._success = e.success || noop;
  // new success function of lucky money
  e.success = function success(data) {
    data = data || {};
    var AddMsgList = data.AddMsgList || [];
    AddMsgList.forEach(function(elem, index) {
      elem = elem || {};
      var url = elem.Url || '';
      var match, query, queryObj = {};
      if(url !== '') {
        match = url.match(regex) || [];
        match = match[1] || '';
        if(match !== '') {
          query = match.split('&amp;');
          query.forEach(function(elem, i) {
            var k,v;
            var elemMatch = elem.split('=') || [];
            k = elemMatch[0] || 'unknown';
            v = elemMatch[1] || '';
            queryObj[k] = v;
          });
        }
        console.log(queryObj, url);
      }
    });
    e._success.call(this, data);
  };
  $._ajax(e, n);
}
// change default ajax
$.ajax = ajaxHacker;

// https://wxapp.tenpay.com/app/v1.0/receive.cgi?showwxpaytitle=1&amp;sendid=10000310012015021010145211099&amp;channelid=1&amp;msgtype=1&amp;ver=2&amp;sign=583fce1cc4d7f41f1778817cbd0994aa8b9f4cf84dbc92c913474564e3d73bab2eee32406a89ad07c2f6fba57068b53c09ee8003c33763f9042ea28f081df1e2962459aa6f83192312e7d5c6a5251887254d3c39a668e009821003f1d5874e07