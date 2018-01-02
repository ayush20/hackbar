/*
Created By Ayush Gupta
On 12 October 2014
*/
$(document).ready(function(){

	function readURL(input,id) {

	    if (input.files && input.files[0]) {
	      	var pic_name=input.files[0].name;
			var fileTypes=['.jpg', '.png', '.jpeg'];
			var pic_size=input.files[0].size/1024; //in kb
			var dots = pic_name.split('.');
			
			//get the part AFTER the LAST period.
			
			var fileType = "." + dots[dots.length-1].toLowerCase();

			if(fileTypes.indexOf(fileType) == -1){
				$('#'+id).val('');
				 $('#'+id+'_palceholder').removeAttr('src');
				alert('This is not a image,Please upload image');
			}
			else if (pic_size > 2048) {  //max size 2 mb
	 			$('#'+id).val('');
				 $('#'+id+'_palceholder').removeAttr('src');
				alert('File size too large\nPlease upload file of size less than 3MB');
			}
			else{
				
				var reader = new FileReader();
		        reader.onload = function (e) {
		           $('#'+id+'_palceholder').attr('src', e.target.result);
		        }

		        reader.readAsDataURL(input.files[0]);
		    }
	   		 
	    }
	    else{
	    	 $('#'+id+'_palceholder').removeAttr('src');
	    }
	} //end of readURL function

	$("#stud_pic").change(function(){
		var id='stud_pic';
	    readURL(this,id);
	});


	$("#id_upload").change(function(){
		var id='id_upload';
	    readURL(this,id);
	});

});