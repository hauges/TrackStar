(function () {
    "use strict";
    var username;
    var password;

    function setup() {
        document.getElementById("submit").onclick = function() {
            var usernameField = document.getElementById("username");
            var passwordField = document.getElementById("password")
            username = usernameField.value;
            password = passwordField.value;
            usernameField.value = "";
            passwordField.value = "";
            location.href = "home.html";
            sessionStorage.userName = username;
            console.log("username: " + username + "  password: " + password);
        }   
    }
    window.onload = setup;
})();
