/*
Created By Ayush Gupta
On 12 October 2014
*/
function addslashes(str) {
 
  return (str + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0');
}
