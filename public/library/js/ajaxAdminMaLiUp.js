$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#customerForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	
    	// PREPARE FORM DATA
    	var formData = {
    		oldUrl : $("#idOldUrl").val(),
            newUrl :  $("#idNewUrl").val(),
            user :  $("#idUserName").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "/admin/manager/link/update",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				if(customer.state == "ok"){
					window.location = "/admin/manager/link/" + customer.page_current;
				} else if (customer.state == "fail"){
					// $("#idNewUrl").val("The url is invalid or already exists")
					alert("The url is invalid or already exists!");
				}
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    }
    
})