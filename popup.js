/*
Created By Ayush Gupta
On 12 October 2014
*/

$(document).ready(function () {

	$('#incorder').click(() => modifyOrderBy((s) => s + 1));

	$('#decorder').click(() => modifyOrderBy((s) => s - 1));

	$('#inc4number').click(() => modifyNumber((i) => i + 1));

	$('#dec4number').click(() => modifyNumber((i) => i - 1));

	$('#loadurl').click(() => chrome.tabs.getSelected(null, (tab) => modifyText(() => unescape(tab.url))));

	$('#spliturl').click(() => $('#text_field').prop('value', $('#text_field').val().replace(/([?&])/g, '$1\n')));

	$('#execute').click(() => chrome.tabs.update({ url: $('#text_field').val() }));

	$('#incheight').click(() => modifyRow((i) => i < 50 ? i + 2 : i));

	$('#decheight').click(() => modifyRow((i) => i > 7 ? i - 2 : i));

	$('#strtohex').click(() => modifyText((str) => hex_encode(str), true));

	$('#basicinfo').click(() => modifyText((str) => 'CONCAT_WS(CHAR(32,58,32),user(),database(),version())'));

	$('#hextostr').click(() => modifyText((str) => hex_decode(str), true));

	$('#strtoascii').click(() => modifyText((str) => ascii_encode(str), true));

	$('#asciitostr').click(() => modifyText((str) => ascii_decode(str), true));

	$('#alertxss').click(() => modifyText((str) => 'alert(String.fromCharCode(88, 83, 83))'));

	$('#strtohtml').click(() => modifyText((str) => html_encode(str), true));

	$('#base64').click(() => modifyText((str) => window.btoa(str), true));

	$('#base64decode').click(() => modifyText((str) => window.atob(str), true));

	$('#urlencode').click(() => modifyText((str) => encodeURI(str), true));

	$('#urldecode').click(() => modifyText((str) => decodeURI(str),true));

	$('#utf8').click(() => modifyText((str) => 'CONVERT(' + str + ' USING utf8)', true));

	$('#latin1').click(() => modifyText((str) => 'CONVERT(' + str + ' USING latin1)', true));

	$('#mysqlchar').click(() => modifyText((str) => 'CHAR(' +  serialJoin(str.length, (i) => str.charCodeAt(i), ', ') + ')', true));

	$('#mssqlchar').click(() => modifyText((str) => serialJoin(str.length, (i) =>'CHAR(' + str.charCodeAt(i) + ')', '+'), true));

	$('#oraclechar').click(() => modifyText((str) => serialJoin(str.length, (i) =>'CHAR(' + str.charCodeAt(i) + ')', '||'), true));

	$('#unionselect').click(() => {
	  var number = parseInt(prompt("Enter the number of columns"));
	  modifyText((str) => 'UNION SELECT ' + serialJoin(number, (i) => i, ','));
	});

	$('#spaceinline').click(() => modifyText((str) =>  str.replace(/\s/g, '/**/')));

	$('#md5').click(() => modifyText((str) => md5(str), true));

	$('#sha1').click(() => modifyText((str) => sha1(str), true));

	$('#rot13').click(() => modifyText((str) => str_rot13(str), true));

	$('#as').click(() => modifyText((str) => addslashes(str), true));

	$('#ss').click(() => modifyText((str) => stripslashes(str), true));

	$('#stripspace').click(() => modifyText((str) => str.replace(/\s/g, '')));

	$('#pi').click(() => modifyText((str) => '3.14159265'));

	$('#bigpi').click(() => modifyText((str) => '3.14159265358979323846264338327950288419716939937510'));

	$('#phi').click(() => modifyText((str) => '1.618033988749895'));

	$('#lorem').click(() => modifyText((str) => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));

	$('#fibonacci').click(() => modifyText((str) => '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, ...'));

	$('#buffer128').click(() => modifyText((str) => repeatChar('A', 128)));

	$('#buffer256').click(() => modifyText((str) => repeatChar('A', 256)));

	$('#buffer512').click(() => modifyText((str) => repeatChar('A', 512)));

	$('#buffer1024').click(() => modifyText((str) => repeatChar('A', 1024)));

	$('#buffer2048').click(() => modifyText((str) => repeatChar('A', 2048)));

	$('#buffercustom').click(() => {
	  var length = parseInt(window.prompt('Enter a value :'));
	  modifyText((str) => repeatChar('A', length));
	});

	$('#reverse').click(() => modifyText((str) => str.split("").reverse().join(""), true));

  });
