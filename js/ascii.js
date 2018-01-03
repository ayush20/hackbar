function ascii_encode(str) {
    var ascii = '';
    for (var i = 0; i < str.length; i++) {
      ascii += "" + str.charCodeAt(i) + ", ";
    }
    return 'String.fromCharCode(' + ascii.substr(0, ascii.length - 2) + ')';
}

function ascii_decode(str) {
    var hex = '';
    var start = 0;
    str = unescape(str);
    for (var i = 0; i < str.length; i++) {
      var sub = str.substring(i, i + 1);
      if (sub == ',') {
        var v = str.substring(start, i);
        start = i + 1;
        hex += String.fromCharCode(v);
      }
      else if (i == str.length - 1) {
        var v = str.substring(start, str.length);
        start = i + 1;
        hex += String.fromCharCode(v);
      }
    }
    return hex;
}

function html_encode(str) {
    var hex = '';
    var ascii = '';
    for (var i = 0; i < str.length; i++) {
      hex += '&#x' + str.charCodeAt(i).toString(16) + ';';
      ascii += " " + str.charCodeAt(i);
    }
    return hex;
}