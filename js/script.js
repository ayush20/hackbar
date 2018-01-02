/*
Created By Ayush Gupta
On 12 October 2014
*/
$(document).ready(function(){
  	
	/*Date Picker Function*/
	$( "#dob" ).datepicker({
      changeMonth: true,
      changeYear: true,
      defaultDate: "-18Y",
      yearRange: "-100:+0",
      dateFormat: 'dd-mm-yy'
    });



    /*Date Picker Function*/
    $( "#c_date" ).datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "-100:+0",
      dateFormat: 'dd-mm-yy'
    });



	/*show text field for selection of 'others' for qualification*/
    $('#qualification').change(function(){
    	
    	var str=this.value;
		// alert(str);
    	 if (str == 'other') {
    	 	// alert(0);
    	 	$('#qual_other').val('');
    	 	$('#qual_other_span').css("display","block");
    	 }
    	 else	{
    	 	// alert(1);
    	 	$('#qual_other').val('0');
    	 	$('#qual_other_span').css("display","none");	
    	}
    });



    /*show respective filed on selection of know_about_us*/
    $('#know_about_us').change(function(){

    	var str=this.value;

    	if (str == 'newspaper') {
    		hideQualClass();
    		$('#newspaper_span').css("display","block");
    	}
    	else if (str == 'internet') {
    		hideQualClass();
    		$('#internet_span').css("display","block");

    	}
    	else if (str == 'pamplet') {
    		hideQualClass();
			$('#pamplet_span').css("display","block");    		
    	}
    	else if(str == 'seminar'){
    		hideQualClass();
    		$('#seminar_span').css("display","block");
    	}
    	else if (str == 'workshop') {
    		hideQualClass();
    		$('#workshop_span').css("display","block");
    	}
    	else if (str == 'friend') {
    		hideQualClass();
    		$('#rf_span').css("display","block");
    	} else{
    		hideQualClass();
    	}

    });



    /*hide all the fields of the qualifcaion autogenerate*/
    function hideQualClass(){

    	$('.know_class').each(function(){

    		$(this).css('display','none');
            $(this).val('');

    	});
    }


    /*showing 'other' filed for batch selection*/
    $('#pref_batch').change(function(){
        
        var str=this.value;
        // alert(str);
         if (str == 'other') {
            // alert(0);
            $('#batch_other').val('');
            $('#batch_other_span').css("display","block");
         }
         else   {
            // alert(1);
            $('#batch_other').val('0');
            $('#batch_other_span').css("display","none");    
        }
    });


    /*showing 'other' filed for state selection*/
    $('#state').change(function(){
        
        var str=this.value;
        // alert(str);
         if (str == 'other') {
            // alert(0);
            $('#state_other').val('');
            $('#state_other_span').css("display","block");
         }
         else   {
            // alert(1);
            $('#state_other').val('0');
            $('#state_other_span').css("display","none");    
        }
    });

    /*show qual_year on selection of persuing*/
    $("input[name='qual_status']").change(function(){
        
        var str=this.value;
        // alert(str);
         if (str == 'persuing') {
            // alert(0);
            $('#qual_year').val('');
            $('#qual_year_span').css("display","block");
         }
         else   {
            // alert(1);
            $('#qual_year').val('0');
            $('#qual_year_span').css("display","none");    
        }
    });



    /*change institute name or company name */
    $("input[name='stud_work']").change(function(){
        
        var str=this.value;
        // alert(str);
         if (str == 'studying') {
            // alert(0);
            $('#institute_name').val('');
            $('#institute_name_span').css("display","block");
            $('#company_name').val('a');
            $('#company_name_span').css("display","none"); 
            // alert($('#company_name').val());
         }
         else if (str == 'working')   {
            // alert(1);
            $('#company_name').val('');
            $('#company_name_span').css("display","block");
            $('#institute_name').val('a');
            $('#institute_name_span').css("display","none"); 
        }
        else{

            alert('Please stop altering the data\nAnd follow Alok Nath\'s sanskar');
        }
    });




});