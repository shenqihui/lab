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

// 获取红包的url，使用 mitmproxy 进行拦截
// https://wxapp.tenpay.com/app/v1.0/wx_communitylogin.cgi
// ?sp_name=cft_fahongbao
// &u1=https%3A%2F%2Fwxapp.tenpay.com%2Fapp%2Fv1.0%2Freceive.cgi%3Fshowwxpaytitle%3D1%26sendid%3D10000306012015021010142940063%26channelid%3D1%26msgtype%3D1%26ver%3D2%26sign%3Df88137a30b667f36940b3365ba6224e448d65d1e29caf1e47706edc4ff2b061e9baed40582a6e745d0f1f1296863f3559d1a4baaf46aca14dd5f743a4397919af741580604c544b532b24d1a37f4d56f097ce0ae1fd39d473338b8eb6a61533a%26from%3Dgroupmessage%26isappinstalled%3D0%26clientversion%3D25010030%26devicetype%3Dandroid-17%26pass_ticket%3D8T7MGVFJ2WpUETHQ3hY9cXvlea0xjq3H0VPhuIWaKbZNsNZ0x5Q1Adwe5YpMPCmb
// &cc=1
// &code=0015ddab563b8f156d5401007c4c4bdp
// &state=123
// &clientversion=25010030
// &devicetype=android-17
// &pass_ticket=8T7MGVFJ2WpUETHQ3hY9cXvlea0xjq3H0VPhuIWaKbZNsNZ0x5Q1Adwe5YpMPCmb