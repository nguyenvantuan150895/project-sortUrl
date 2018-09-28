$( document ).ready(function() {
	
    // SUBMIT FORM
    $("#btnLogin").click(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
            idAdmin : $("#idAdmin").val(),
            idPasswprd : $("#idPassword").val(),
        }
        
        // DO POST
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "/admin/login",
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(data) {
                if(data == "ok"){
                    window.location = "/manager/1"
                }
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
        $("#idAdmin").val("");
        $("#idPassword").val("");
    }
})