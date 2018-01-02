/*
Created By Ayush Gupta
On 12 October 2014
*/

$(document).ready(function(){
	chrome.tabs.getSelected(null,function(tab){

		var tabid = tab.id;
//		alert(tabid);
		var name = "mydata_"+tabid+"=";
//		alert(name);
//		var all = document.cookie;
//		$('#text_field').prop('value',all);
	    var ca = document.cookie.split(';');
        final1 = '';
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i].trim();
	        if (c.indexOf(name) == 0)
	        	var final1 = c.substring(name.length,c.length);
//	        else
//	        	var final1 = '';
	    }
	    var final2 = unescape(final1);
//	    alert(final1);
		$('#text_field').prop('value',final2);
	});

});


$(document).ready(function(){

	$('.btn').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){
				var tabid = tab.id;
			
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			});
		},500);

	});

	$('#loadurl').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){
				var tabid = tab.id;
			
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			
			});
		},500);	
	});

	$('#spliturl').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){
				var tabid = tab.id;
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			});
		},500);

	});

	$('#execute').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){

				var tabid = tab.id;				
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			});
		},500);

	});


	$('#text_field').on('keyup change paste' , function(){
//		alert(4);
		chrome.tabs.getSelected(null,function(tab){
			var tabid = tab.id;
			var text = $('#text_field').val();
	//		alert(text);
			document.cookie="mydata_"+tabid+"="+escape(text);
		});
	});

	$('#loadurl').on('mouseover', function(){
		$("#loadurl").attr('title', 'Load URL');
//		alert(4);
	});

	$('#spliturl').on('mouseover', function(){
		$("#spliturl").attr('title', 'Split URL');
//		alert(4);
	});

	$('#execute').on('mouseover', function(){
		$("#execute").attr('title', 'Execute');
//		alert(4);
	});

});

$(document).ready(function(){

	function get_cursor_pos1(oField) {

	  // Initialize
	  var iCaretPos = 0;

	  // IE Support
	  if (document.selection) {

	    // Set focus on the element
	    oField.focus ();

	    // To get cursor position, get empty selection range
	    var oSel = document.selection.createRange ();

	    // Move selection start to 0 position
	    oSel.moveStart ('character', -oField.value.length);

	    // The caret position is selection length
	    iCaretPos = oSel.text.length;
	  }

	  // Firefox support
	  else if (oField.selectionStart || oField.selectionStart == '0')
	    iCaretPos = oField.selectionStart;

	  // Return results
	  return (iCaretPos);
	}

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

	$('#incorder').click(function(){



			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

//			var remaining_start = inputstr.substring(0,start);
//			var remaining_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				str = inputstr;
			}

			var get_orderby_pos = str.indexOf("order by");
//			alert(get_orderby_pos);

			if(get_orderby_pos == -1)
			{
				alert('There is no order by available in your selected text');
				die();
			}

			var get_orderby_pos = parseInt(get_orderby_pos);

			var s = get_orderby_pos + 9;

			var remaining_start = inputstr.substring(0,s);

//			alert(s);

			var sub = str.substring(s);
			
			var parse_sub = parseInt(sub);

			var parse_sub_length = parse_sub.toString().length;

//			alert(parse_sub);

//			alert();
			
			var total_end = s+parse_sub_length;

			var remaining_end = inputstr.substring(total_end);

			parse_sub = parse_sub+1;

//			alert(parse_sub);
//			alert(remaining_start);
//			alert(parse_sub);
//			alert(remaining_end);
	
			var update = remaining_start + parse_sub + remaining_end;

			var goto = update;
			chrome.tabs.update({url:goto});
	
			$('#text_field').prop('value',update);

	});

	$('#decorder').click(function(){
		chrome.tabs.executeScript(null,{},function(){

			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

//			var remain_start = inputstr.substring(0,start);
//			var remain_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				str = inputstr;
			}

			var get_orderby_pos = str.indexOf("order by");
//			alert(get_orderby_pos);

//			die();
			
			if(get_orderby_pos == -1)
			{
				alert('There is no order by available in your selected text');
				die();
			}


			var get_orderby_pos = parseInt(get_orderby_pos);

			var s = get_orderby_pos + 9;

			var remaining_start = inputstr.substring(0,s);

//			alert(s);

			var sub = str.substring(s);
			
			var parse_sub = parseInt(sub);

			var parse_sub_length = parse_sub.toString().length;

//			alert(parse_sub);

//			alert();
			
			var total_end = s+parse_sub_length;

			var remaining_end = inputstr.substring(total_end);

			parse_sub = parse_sub-1;

//			alert(parse_sub);
//			alert(remaining_start);
//			alert(parse_sub);
//			alert(remaining_end);
			var update = remaining_start + parse_sub + remaining_end;

//			var goto = $('#text_field').val();
			var goto = update;
			chrome.tabs.update({url:goto});

			$('#text_field').prop('value',update);

		});
	});


	$('#inc4number').click(function(){
		chrome.tabs.executeScript(null,
		{

		},
		function(){
			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

			var remaining_start = inputstr.substring(0,start);
			var remaining_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				var str = window.prompt('No text was selected for requested action','String to use');
//				var start = 0;
//alert(start);
				var end = start+str.length;
			}

			var e = document.getElementById("dropdown");
			var strUser = e.options[e.selectedIndex].value;  // Returns selected option from dropdown

//			alert(strUser);
			
			if(strUser == 'int' )
			{
				var regEx=/[0-9]/;
				var check = regEx.test(str);
				var n= str.length;
				var prev_length = str.length;
				var prev_string = str;
//				alert(str);

				if(check)
				{
					str=parseInt(str);
//					alert(str);
					var n= str.toString().length;
					str=str+1;
					newval = str
					var m= str.toString().length;
//					alert(start+':'+end);
					if(m-prev_length==1)
					{
						end=end+1;
//						alert(start);
//						flag++;
	
	//						incsize++;
//						newint = newval; 
//						remain_start = remaining_start;
//						remain_end = remaining_end;
					}
//					alert(m+':'+n);
					else if(prev_length-m == 1)
					{
//						alert('Step1');
						if(prev_string.substring(0,1)=='0')
						{
//							alert('Step2');
							newval = '0'+newval;
						}

					}
				}
				else
				{
					alert('invalid selection');
				}

			}
			else if(strUser == 'oct')
			{
				var regEx=/[0-7]/;
				var check = regEx.test(str);
				if(check)
				{
					var n= str.length;
					var intvalue = parseInt(str, 8);
					intvalue++;
					var incoct = intvalue.toString(8);
					newval = incoct;
					var m= newval.length;
					
					if(m-n==1)
					{
						end++;
					}
				}
				else
				{
					alert('invalid selection');
				}
				
			}
		 else if(strUser == 'hex')
			{
				var regEx=/[0-9a-fA-F]/;
				var check = regEx.test(str);
				if(check){
							var n= str.length;
							var intvalue = parseInt(str, 16);
							intvalue++;
							var inchex = intvalue.toString(16);
							newval = inchex;
							var m= newval.length;
							
						if(m-n==1)
							{
								end++;
							}
						 }
				else{
					alert('invalid selection');
					}
				
			}
		 else if(strUser == 'alpha')
			{
				var regEx=/^[a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value+1;
							if(value>122)
							{
							value=97;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
		}
	   	 else if(strUser == 'alnum')
			{
				var regEx=/^[0-9a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value+1;
							if(value>122)
							{
							value=48;
							}

							if(value==58)
							{
								value=97;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
			}

//			alert(3);

			var update = remaining_start+newval+remaining_end;
			$('#text_field').prop('value',update);
//			alert(start);
//			alert(end);
			setInputSelection(document.getElementById("text_field"), start, end);
//			alert(5);

		});

	});

	$('#dec4number').click(function(){
		chrome.tabs.executeScript(null,
		{

		},
		function(){
			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

			var remaining_start = inputstr.substring(0,start);
			var remaining_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				var str = window.prompt('No text was selected for requested action','String to use');
//				var start = 0;
				var end = start+str.length;
			}

			var e = document.getElementById("dropdown");
			var strUser = e.options[e.selectedIndex].value;  // Returns selected option from dropdown

//			alert(strUser);
			
			if(strUser == 'int' )
			{
				var regEx=/[0-9]/;
				var check = regEx.test(str);
				var n= str.length;
				var prev_length = str.length;
				var prev_string = str;

//				alert(check);
				if(check)
				{
					str=parseInt(str);
					var n= str.toString().length;
					if(str==0){
						str=0;
					}
					else
					{
						str=str-1;
					}
					
					newval = str;
					var m= str.toString().length;
//					alert(start+':'+end);
//					alert(prev_length+':'+m);
					if(m-prev_length==1)
					{
						end=end-1;
//						alert(start);
//						flag++;
//						incsize++;
//						newint = newval; 
//						remain_start = remaining_start;
//						remain_end = remaining_end;
					}
					else if(prev_length-m == 1)
					{
//						alert('Step1');
//						alert(prev_string);
						if(prev_string.substring(0,1)=='0')
						{
//							alert('Step2');
							newval = '0'+newval;
						}
						if(prev_string.substring(0,1)=='1')
						{
//							alert('Step2');
							newval = '0'+newval;
						}

					}

				}
				else
				{
					alert('invalid selection');
				}

			}
			else if(strUser == 'oct')
			{
				var regEx=/[0-7]/;
				var check = regEx.test(str);
				if(check)
				{
					var n= str.length;
					var intvalue = parseInt(str, 8);
					if(intvalue==0){
						intvalue=0;
					}
					else
					{
						intvalue--;
					}

					var incoct = intvalue.toString(8);
					newval = incoct;
					var m= newval.length;
					
					if(n-m==1)
					{
						end--;
					}
				}
				else
				{
					alert('invalid selection');
				}
				
			}
		 else if(strUser == 'hex')
			{
				var regEx=/[0-9a-fA-F]/;
				var check = regEx.test(str);
				if(check){
					var n= str.length;
					var intvalue = parseInt(str, 16);

					if(intvalue==0){
						intvalue=0;
					}
					else
					{
						intvalue--;
					}

					var inchex = intvalue.toString(16);
					newval = inchex;
					var m= newval.length;
							
						if(n-m==1)
							{
								end--;
							}
						 }
				else{
					alert('invalid selection');
					}
				
			}
		 else if(strUser == 'alpha')
			{
				var regEx=/^[a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value-1;
							if(value<97)
							{
							value=122;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
		}
	   	 else if(strUser == 'alnum')
			{
				var regEx=/^[0-9a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value-1;
							if(value<48)
							{
								value=122;
							}

							if(value==96)
							{
								value=57;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
			}

//			alert(3);

			var update = remaining_start+newval+remaining_end;
			$('#text_field').prop('value',update);
			setInputSelection(document.getElementById("text_field"), start, end);
//			alert(5);

		});		

	});

  $('#loadurl').click(function(){
    chrome.tabs.executeScript(null,
      {

      },
      	function(){
  //    			alert(1);

				chrome.tabs.getSelected(null,function(tab) {
				//				alert(tab.id);
				    var tablink = tab.url;
				    var hello = unescape(tablink);
//				    alert(tablink);
					$('#text_field').prop('value',hello);
					document.cookie="mydata="+hello;
//					setInputSelection(document.getElementById('text_field'));
					document.getElementById('text_field').select();
				});
      		if (chrome.runtime.lastError) { // or if (!result)
//		    	alert(chrome.runtime.lastError.message);
		        // Get the error message via chrome.runtime.lastError.message
//		        return;
//		        alert(1)
//				var data = 2;
 //				return data;

 //				$('#text_field').prop('value',data);
 			}
      	});
  });

  	$('#spliturl').click(function(){
	    chrome.tabs.executeScript(null,
	    	{

	    	},
	    	function(){
	    		var hello = $('#text_field').val();
			    var text = unescape(hello);
			    var hello1 = text;
//			    alert(text);
	    		start = 0;
	    		var check = 0;
	    		var string = '';
	    		for(i=0;i<hello1.length;i++)
	    		{
	    			var substr = text.substring(i,i+1);
//	    			alert(substr);
	    			if(substr == '?' || substr == '&')
	    			{
//	    				alert(i);
	    				var qwe = text.substring(start,i);
//	    				alert(i);
	
						start = i;
						string += qwe+'\n';
//	    				text = text.substring(i);

//	    				alert(text);
//	    				alert(qwe);
	    				var end = text.substring(i);
	    				check = 1;
	    			}

	    		}

	    		if(check == 0)
	    		{
	    			end = hello1;
	    		}

	    		string = string + end;
//	    		alert(string);
//	    		document.cookie="mydata="+escape(string);
	    		$('#text_field').prop('value',string);


	    });
	});

  $('#execute').click(function(){
    chrome.tabs.executeScript(null,
     {},
      	function(){
//				chrome.tabs.getSelected(null,function(tab) {
//				    var tablink1 = tab.url;
//				    alert(tablink1);
					var goto = $('#text_field').val();
//				    window.location.href=goto;
//					document.location.=goto;
//					window.location.assign("http://google.com")
					chrome.tabs.update({url:goto});
//				    alert(4);
//				});

      		if (chrome.runtime.lastError) { // or if (!result)
//		    	alert(chrome.runtime.lastError.message);
		        // Get the error message via chrome.runtime.lastError.message
 			}
      	});
});


	$('#incheight').click(function(){
		var row = parseInt($('#text_field').attr('rows'));
//		alert(row);
		var inc = 2;
		if(row < 50)
		{
			var setrow = row+inc;
		}
		else
		{
			var setrow = row;
		}
//		alert(setrow);
		$('#text_field').prop('rows',setrow);
	});

	$('#decheight').click(function(){
		var row = parseInt($('#text_field').attr('rows'));
		var dec = 2;
		if(row >7)
		{
			var setrow = row-dec;
		}
		else
		{
			var setrow = row;
		}
		$('#text_field').prop('rows',setrow);
	});

	$('#strtohex').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex='';

			    for(var i=0;i<str.length;i++) {
			        hex += ''+str.charCodeAt(i).toString(16);
			    }
 				
			    var update = remaining_start+hex+remaining_end;

 				var end_selection_after = start+hex.length;

				setInputSelection(document.getElementById("text_field"), start, end_selection_after);
				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#basicinfo').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);
/*
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}
*/
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var final1 = 'CONCAT_WS(CHAR(32,58,32),user(),database(),version())'; 			    
			    var update = remaining_start+final1+remaining_end;
 //				document.cookie="mydata"+update;

 				var final_length = final1.length-1;
				var end_selection_after = start+final_length;
//				start = 2;
//				alert(start+':'+end_selection_after);
				setInputSelection(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
//				setInputSelection(document.getElementById('text_field'),5,7);
		});
	});


	$('#hextostr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					alert('No text was selected for requested action');
//					var str = window.prompt('No text was selected for requested action','String to use');
					$('#text_field').prop('value',inputstr);
					die();
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex = '';
				str = escape(str);
			    for (var i = 0; i < str.length; i+=2) {
			       var sub = escape(str.substr(i, 2));
     			   var v = parseInt(sub, 16);
//     			   alert(v);
 			       if (v) hex += String.fromCharCode(v);
 			    }
				
//				var final1 = str;
			    var update = remaining_start+hex+remaining_end;

				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+hex.length;

				setInputSelection(document.getElementById("text_field"), start, end_selection_after);
		});
	});


	$('#strtoascii').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var ascii='';

			    for(var i=0;i<str.length;i++) { 
			    	if(i == str.length-1)
			    	{
				        ascii += ""+str.charCodeAt(i)+"";
			    	}
			    	else
			    	{
				        ascii += ""+str.charCodeAt(i)+", ";
			    	}
			    }
   
   				var final1 = 'String.fromCharCode('+ascii+')';
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+final1.length;
				setInputSelection(document.getElementById("text_field"), start, end_selection_after);
		});
	});

	$('#stringtoascii').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var ascii='';

			    for(var i=0;i<str.length;i++) { 
			    	if(i == str.length-1)
			    	{
				        ascii += ""+str.charCodeAt(i)+"";
			    	}
			    	else
			    	{
				        ascii += ""+str.charCodeAt(i)+", ";
			    	}
			    }
   
   				var final1 = ascii;
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
				setInputSelection(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

		});
	});

});

$(document).ready(function(){

		function get_cursor_pos(oField) {

	  // Initialize
	  var iCaretPos = 0;

	  // IE Support
	  if (document.selection) {

	    // Set focus on the element
	    oField.focus ();

	    // To get cursor position, get empty selection range
	    var oSel = document.selection.createRange ();

	    // Move selection start to 0 position
	    oSel.moveStart ('character', -oField.value.length);

	    // The caret position is selection length
	    iCaretPos = oSel.text.length;
	  }

	  // Firefox support
	  else if (oField.selectionStart || oField.selectionStart == '0')
	    iCaretPos = oField.selectionStart;

	  // Return results
	  return (iCaretPos);
	}

	function setInputSelection1(input, startPos, endPos) {
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



	$('#asciitostr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					alert('No text was selected for requested action');
//					var str = window.prompt('No text was selected for requested action','String to use');
					$('#text_field').prop('value',inputstr);
					die();
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex = '';
				var start =0;

				str = unescape(str);
//				alert(str);
			    for (var i = 0; i < str.length; i++) {
			       var sub = str.substring(i,i+1);
//			       alert(sub);
			       if(sub == ',')
			       {
  			       	 var v = str.substring(start,i);
///  			       	 alert(v);
  			       	 start = i+1;
					 hex += String.fromCharCode(v);  			       	 
			       }
			       else if(i == str.length-1)
			       {
//			       	alert(6);
			      	 var v = str.substring(start,str.length);
//  			       	 alert(v);
  			       	 start = i+1;
					 hex += String.fromCharCode(v);  			       	 
			       	
			       }

 			    }



				
//				var final1 = hex;
			    var update = remaining_start+hex+remaining_end;


				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#alertxss').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
//				alert(5);
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);
/*
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}
*/
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);
   				
   				var final1 = 'alert(String.fromCharCode(88, 83, 83))';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

// 				var end_selection_after = start+final1.length;
 //				alert(start+':'+end_selection_after);
	//			setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
		});
	});

	$('#strtohtml').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,{},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex='';
				var ascii = '';

			    for(var i=0;i<str.length;i++) {
			    	hex += '&#x'+str.charCodeAt(i).toString(16)+';';
			        ascii += " "+str.charCodeAt(i);
			    }
 				
 				var update = remaining_start+hex+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+hex.length;
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

		});
	});


	$('#base64').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var enc='';
				var enc = window.btoa(str);
			    
			    var update = remaining_start+enc+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+enc.length;
 //				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#urlencode').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var enc='';
				var enc = encodeURI(str);
			    
			    var update = remaining_start+enc+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+enc.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);
			
 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#urldecode').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var dec='';
				var dec = decodeURI(str);
			    
			    var update = remaining_start+dec+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+dec.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#base64decode').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var dec='';
				var dec = window.atob(str);
			    
			    var update = remaining_start+dec+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+dec.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#utf8').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = 'CONVERT('+str+' USING utf8)'; 
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);


 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#latin1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}


				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = 'CONVERT('+str+' USING latin1)'; 
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata="+update;

				var end_selection_after = start+final1.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#mysqlchar').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var ascii='';

			    for(var i=0;i<str.length;i++) { 
			    	if(i == str.length-1)
			    	{
				        ascii += ""+str.charCodeAt(i)+"";
			    	}
			    	else
			    	{
				        ascii += ""+str.charCodeAt(i)+", ";
			    	}
			    }
   
   				var final1 = 'CHAR('+ascii+')';
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
//				document.cookie="mydata=";
		});
	});

	$('#mssqlchar').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var ascii='';
				var final1 = '';

			    for(var i=0;i<str.length;i++) {
			    	ascii = str.charCodeAt(i);
			    	
			    	if(i == str.length-1)
			    	{
		   				final1 += 'CHAR('+ascii+')';			    
				    }
			    	else
			    	{
		   				final1 += 'CHAR('+ascii+')+';
			    	}
	   				
			    }
   

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#oraclechar').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var ascii='';
				var final1 = '';

			    for(var i=0;i<str.length;i++) {
			    	ascii = str.charCodeAt(i);
			    	
			    	if(i == str.length-1)
			    	{
		   				final1 += 'CHAR('+ascii+')';			    
				    }
			    	else
			    	{
		   				final1 += ' CHAR('+ascii+') ||';
			    	}
	   				
			    }
   
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#unionselect').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var number = prompt("Enter the number of columns");

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
//s					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var number_cols = '';
				for(i=1;i<=number;i++)
				{
					if(i==number)
					{
						number_cols += i;
					}
					else
					{
						number_cols += i+',';
					}
				}

				var f1 = 'UNION SELECT ';

				var final1 = f1+number_cols;

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#spaceinline').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var start1 = start;
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start1 = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

			    var hello1 = str;
			    var text = str;

	    		start = -1;
	    		var check = 0;
	    		var string = '';
	    		for(i=0;i<hello1.length;i++)
	    		{
	    			var substr = text.substring(i,i+1);
//	    			alert(substr);
	    			if(substr == ' ')
	    			{
//	    				alert(i);
//						var sub = text.substring(start,i);
//		    			start = i;
//	    				var string = sub.replace(' ','/**/');

						var qwe = text.substring(start+1,i);

						start = i;
//						alert(qwe);
//						qwe = qwe.replace(' ','/**/');
//						alert(qwe);
						string += qwe+'/**/';
//						alert(string);

	    				check = 1;
	    				var end = text.substring(i+1);
//	    				alert(end);
	    			}

	    		}

	    		if(check == 0)
	    		{
	    			end = hello1;
	    		}

//	    		alert(string);
	    		final1 = string+end;
//	    		alert(final1);
//	    		string = string + end;
//	    		alert(string);
//	    		document.cookie="mydata="+escape(string);
//	    		$('#text_field').prop('value',string);

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start1+final1.length;
// 				alert(start1+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start1, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

  $('#md5').click(function(){
//    alert(window.getSelection().toString());
//     $('#text_field').prop('value',hashed);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			   var final1 = md6(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});

  });

  $('#sha1').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			   var final1 = sha2(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);
	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});


  });

  $('#rot13').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			   var final1 = str_rot13(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});


  });

  $('#as').click(function(){
    
		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			  	var final1 = addslashes(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});



  });

  $('#ss').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
//				window.getSelection().removeAllRanges();
//				document.selection.empty();
//				document.selection.clear();

//				var selection = window.getSelection();
  //              selection.deleteFromDocument ();
				
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

//				alert(0);
		 	    var final1 = stripslashes(str);
//		 	    alert(final1);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
 //				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});



  });



	$('#stripspace').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
	 			var str = inputstr.substring(start,end);
 
 				var start1 = start;
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start1 = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

			    var hello1 = str;
			    var text = str;

	    		start = -1;
	    		var check = 0;
	    		var string = '';
	    		for(i=0;i<hello1.length;i++)
	    		{
	    			var substr = text.substring(i,i+1);
//	    			alert(substr);
	    			if(substr == ' ')
	    			{
//	    				alert(i);
//						var sub = text.substring(start,i);
//		    			start = i;
//	    				var string = sub.replace(' ','/**/');

						var qwe = text.substring(start+1,i);

						start = i;
//						alert(qwe);
						qwe = qwe.replace(' ','');
//						alert(qwe);
						string+= qwe;
//						string += qwe+'/**/';
//						alert(string);

	    				check = 1;
	    				var end = text.substring(i+1);
//	    				alert(end);
	    			}

	    		}

	    		if(check == 0)
	    		{
	    			end = hello1;
	    		}


//	    		alert(string);
	    		final1 = string+end;
//	    		alert(final1);
//	    		string = string + end;
//	    		alert(string);
//	    		document.cookie="mydata="+escape(string);
//	    		$('#text_field').prop('value',string);

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start1+final1.length;
// 				alert(start1+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start1, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pi').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '3.14159265';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#bigpi').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '3.14159265358979323846264338327950288419716939937510';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#phi').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '1.618033988749895';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#lorem').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#fibonacci').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, ...';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#buffer128').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<128;i++)
				{
					final1 += 'A';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

		$('#buffer256').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<256;i++)
				{
					final1 += 'A';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
			$('#buffer512').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<512;i++)
				{
					final1 += 'A';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

		$('#buffer1024').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);


				var final1='';
				for(i=0;i<1024;i++)
				{
					final1 += 'A';
				}

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

		$('#buffer2048').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);
				
				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<2048;i++)
				{
					final1 += 'A';
				}

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#buffercustom').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
//					alert(start);
				}

//				alert(start+':'+end);
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var length = window.prompt('Enter a value :');

//				alert(length);
				
				var text = '';

				for(i=0;i<length;i++)
				{
					text += 'A';
				}

				var final1 = text;

//				alert(remaining_start+':'+remaining_end);
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+final1.length;
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

		});
	});

	$('#reverse').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = str.split("").reverse().join("") ;				

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);

 				var end_selection_after = start+final1.length;
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);


// 				document.cookie="mydata=";
		});
	});


});


