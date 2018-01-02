/*
Created By Ayush Gupta
On 12 October 2014
*/
function str_rot13(str) {

  return (str + '')
    .replace(/[a-z]/gi, function(s) {
      return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
    });
}
