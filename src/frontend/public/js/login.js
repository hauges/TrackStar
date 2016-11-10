(function () {
    "use strict";
    var apiUrl = 'https://trackstar-backend.herokuapp.com/';
    var username;
    var password;

    function setup() {
        document.getElementById("submit").onclick = function() {
            var usernameField = document.getElementById("username");
            var passwordField = document.getElementById("password")
            username = usernameField.value;
            password = passwordField.value;
            passwordField.value = "";
            if(verify()) {
                location.href = "home.html";
            }
            sessionStorage.userName = username;
            console.log("username: " + username + "  password: " + password);
        }   
    }

    function verify() {
        var ret = false;
        $.ajax({
            url: apiUrl + "users/passwordFromUsername-" + username,
            type: 'GET',
            dataType: 'JSON',
            async: false,
            success: function (data) {
                if(data) {
                    ret = ( data == password);
                    console.log(ret);
                } else {
                    console.log('user could not be found');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        return ret;
    }

    window.onload = setup;
})();
