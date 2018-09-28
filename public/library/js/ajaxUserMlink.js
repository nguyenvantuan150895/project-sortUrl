$( document ).ready(function() {
	
    // SUBMIT FORM
    $("#inputOldUrl").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
            oldUrl : $("#idOldUrl").val(),
        }
        
        // DO POST
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "/manager",
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(customer) {
                $("#idOldUrl").val(customer.oldUrl);
                $("#idNewUrl").val(customer.newUrl);
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
        
        // Reset FormData after Posting
        resetData();

    }
    
    function resetData(){
        $("#idOldUrl").val("");
        $("#idNewUrl").val("");
    }
})