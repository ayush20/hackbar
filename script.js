/*
Created By Ayush Gupta
On 12 October 2014
*/


var menu = function () {
	var t = 15, z = 50, s = 6, a;
	function dd(n) { this.n = n; this.h = []; this.c = [] }
	dd.prototype.init = function (p, c) {
		a = c; var w = document.getElementById(p), s = w.getElementsByTagName('ul'), l = s.length, i = 0;
		for (i; i < l; i++) {
			var h = s[i].parentNode;
			this.h[i] = h;
			this.c[i] = s[i];

			h.onmouseover = new Function(this.n + '.st(' + i + ',true)');
			h.onmouseout = new Function(this.n + '.st(' + i + ',false)');
		}
	}
	dd.prototype.st = function (x, f) {
		var c = this.c[x], h = this.h[x], p = h.getElementsByTagName('a')[0];
		clearInterval(c.t); c.style.overflow = 'hidden';
		if (f) {
			p.className += ' ' + a;
			if (!c.mh) { c.style.display = 'block'; c.style.height = ''; c.mh = c.offsetHeight; c.style.height = 0 }
			if (c.mh == c.offsetHeight) { c.style.overflow = 'visible' }
			else { c.style.zIndex = z; z++; c.t = setInterval(function () { sl(c, 1) }, t) }
		} else { p.className = p.className.replace(a, ''); c.t = setInterval(function () { sl(c, -1) }, t) }
	}
	function sl(c, f) {
		var h = c.offsetHeight;
		if ((h <= 0 && f != 1) || (h >= c.mh && f == 1)) {
			if (f == 1) { c.style.filter = ''; c.style.opacity = 1; c.style.overflow = 'visible' }
			clearInterval(c.t); return
		}
		var d = (f == 1) ? Math.ceil((c.mh - h) / s) : Math.ceil(h / s), o = h / c.mh;
		c.style.opacity = o; c.style.filter = 'alpha(opacity=' + (o * 100) + ')';
		c.style.height = h + (d * f) + 'px'
	}
	return { dd: dd }
}();

// load
$(document).ready(function () {
	chrome.tabs.getSelected(null, function (tab) {
		var tabid = tab.id;
		var name = "mydata_" + tabid + "=";
		var ca = document.cookie.split(';');
		final = '';
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0)
				var final = c.substring(name.length, c.length);
		}
		$('#text_field').prop('value', unescape(final));
	});
});

// save
$(document).ready(function () {
	var save = function () {
		setTimeout(function () {
			chrome.tabs.getSelected(null, function (tab) {
				var text = $('#text_field').val();
				document.cookie = "mydata_" + tab.id + "=" + escape(text);
			});
		}, 500);
	};
	$('.btn').click(save);
	$('#loadurl').click(save);
	$('#spliturl').click(save);
	$('#execute').click(save);
	$('#text_field').on('keyup change paste', save);
});

// set selection range
function setInputSelection(input, startPos, endPos) {
	input.focus();
	if (typeof input.selectionStart != "undefined") {
		input.selectionStart = startPos;
		input.selectionEnd = endPos;
	} else if (document.selection && document.selection.createRange) {
		// IE branch
		input.select();
		var range = document.selection.createRange();
		range.collapse(true);
		range.moveEnd("character", endPos);
		range.moveStart("character", startPos);
		range.select();
	}
}

// call to modify selected text
function modifyText(fu, requestifempty) {
	var field = document.getElementById('text_field');

	var start = field.selectionStart;
	var end = field.selectionEnd;
	var str = field.value.substring(start, end);

	if (str == '' && requestifempty) {
		var str = window.prompt('No text was selected for requested action', 'String to use');
	}

	str = fu(str).toString();
	field.focus();

	// undo works here
	document.execCommand("insertText", false, str);
	setInputSelection(field, start, start + str.length);
}

// call to modify number after 'order by '
function modifyOrderBy(fu) {

	var field = document.getElementById('text_field');
	var start = field.selectionStart;
	var end = field.selectionEnd;
	var inputstr = field.value;
	var str = inputstr.substring(start, end);
	if (str == '') {
		// no selection? get whole string
		str = inputstr;
	}
	var get_orderby_pos = str.indexOf("order by");
	if (get_orderby_pos == -1) {
		alert('There is no order by available in your selected text');
		die();
	}
	var get_orderby_pos = parseInt(get_orderby_pos);
	var s = get_orderby_pos + 9;
	var remaining_start = inputstr.substring(0, s);
	var sub = str.substring(s);
	var parse_sub = parseInt(sub);
	var parse_sub_length = parse_sub.toString().length;
	var total_end = s + parse_sub_length;
	var remaining_end = inputstr.substring(total_end);
	parse_sub = fu(parse_sub);
	var update = remaining_start + parse_sub + remaining_end;
	var goto = update;
	chrome.tabs.update({ url: goto });
	field.value = update;
}


// int, oct, hex, alpha, alphanum
var numberops = [/[0-9]/, /[0-7]/, /[0-9a-fA-F]/, /^[a-z]$/, /^[0-9a-z]$/];
var radixops = [10, 16, 8];
var clampop = (i) => i < 0 ? 0 : i;
var alphaop = (i, withnumber) => {
	if (i == 0x2F)
		return 0x7A; // '0' - 1 to 'z'
	else if (i == 0x3A)
		return 0x61; // '9' + 1 to 'a'
	else if (i == 0x60)
		return withnumber ? 0x39 : 0x7A; // 'a' - 1 to '9'
	else if (i == 0x7B)
		return withnumber ? 0x30 : 0x61; // 'z' + 1 to '0'
	else
		return i;
}

// modify selected number
function modifyNumber(fu) {
	modifyText((str) => {
		var i = document.getElementById("dropdown").selectedIndex;
		if (numberops[i].test(str)) {
			if (i < 3) {
				// int operation
				return clampop(fu(parseInt(str, radixops[i]))).toString(radixops[i]);
			} else {
				// char operation
				return String.fromCharCode(alphaop(fu(str.charCodeAt(0)), i === 4));
			}
		} else {
			alert('invalid selection');
		}
	})
}

// modify textarea height
function modifyRow(fu) {
	var row = parseInt($('#text_field').attr('rows'));
	$('#text_field').prop('rows', fu(row));
}

// generic join
function serialJoin(length, format, delim) {
	var res = '';
	for (var i = 0; i < length; i++) {
		res += format(i) + (i == length - 1 ? '' : delim);
	}
	return res;
}

// repeat x over y times
function repeatChar(ch, times) {
	var final1 = '';
	for (i = 0; i < times; i++) {
		final1 += ch;
	}
	return final1;
}