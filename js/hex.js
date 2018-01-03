
function hex_encode(s) {

  var i, l, o = '', n;
  s += '';
  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? '0' + n : n;
  }

  return o;
}

function hex_decode(str) {

  var hex = '';
  str = escape(str);
  for (var i = 0; i < str.length; i += 2) {
    var v = parseInt(escape(str.substr(i, 2)), 16);
    if (v) hex += String.fromCharCode(v);
  }
  return hex;

}