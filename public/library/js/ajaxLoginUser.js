$(function() {
    $("#btnLogin").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        $.post("/user/login", {username: username, password: password})
        .done(function(data){
            if(data == "ok"){
                window.location = "/manager/1"
            } else if(data == "fail"){
                $("#loginMessage").show();
            }
        })

    })
})