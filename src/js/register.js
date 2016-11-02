(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/"
    var username;
    var password;
    var confirmPassword;

    function setup() {
        document.getElementById("submit").onclick = function () {
            var usernameField = document.getElementById("username");
            var passwordField = document.getElementById("password")
            var confirmPasswordField = document.getElementById("confirmPassword");
            username = usernameField.value;
            password = passwordField.value;
            confirmPassword = confirmPasswordField.value;

            if (verify()) {
                console.log("Username is taken");
                passwordField.value = "";
                confirmPasswordField.value = "";
                return;
            }
            if (password != confirmPassword) {
                console.log("passwords do not match");
                passwordField.value = "";
                confirmPasswordField.value = "";
                return;
            }
            usernameField.value = "";
            passwordField.value = "";
            confirmPasswordField.value = "";
            createNewUser();

            sessionStorage.userName = username;
            location.href = 'home.html'
        }
    }

    function verify() {
        var ret = false;
        $.ajax({
            url: apiUrl + "users/username-" + username,
            type: 'GET',
            dataType: 'JSON',
            async: false,
            success: function (data) {
                if (data[0]) {
                    ret = true;
                    console.log("user already exists");
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

    function createNewUser() {
        var object = {"username": username,
                    "password": password};
        $.ajax({
            url: apiUrl + "users/",
            type: 'POST',
            dataType: 'JSON',
            data: object,
            async: false,
            success: function (data) {
                if (data) {
                    window.location.href = 'home.html';
                    console.log("user created");
                } else {
                    console.log('user could not be created');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        return;
    }

    window.onload = setup;
})();
