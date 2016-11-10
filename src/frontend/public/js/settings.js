
    "use strict";
    var apiUrl = 'https://trackstar-backend.herokuapp.com/';
    var username;
    var usernameConfirm;
    var oldPassword;
    var password;
    var passwordConfirm;
    var currentUsername = sessionStorage.getItem("userName");

    function setup() {
        document.getElementById("submit-username").onclick = function () {
            var passwordFieldUsername = document.getElementById("oldPasswordUsername");
            var usernameField = document.getElementById("username");
            var usernameConfirmField = document.getElementById("usernameComfirm");
            oldPassword = passwordFieldUsername.value;
            username = usernameField.value;
            usernameConfirm = usernameConfirmField.value;

            if (!verifyPassword()) {
                console.log('Incorrect Password');
                passwordFieldUsername.value = "";
                return;
            }

            if (verify()) {
                console.log("Username is taken");
                usernameConfirmField.value = "";
                return;
            }
            passwordFieldUsername.value = "";
            usernameField.value = "";
            usernameConfirmField.value = "";
            updateUsername();
            location.href = 'settings.html';

            sessionStorage.userName = username;
        }

        document.getElementById("submit-password").onclick = function () {
            var passwordField = document.getElementById("password");
            var passwordConfirmField = document.getElementById("passwordComfirm");
            var oldPasswordField = document.getElementById("oldPassword");
            password = passwordField.value;
            console.log(passwordConfirmField);
            passwordConfirm = passwordConfirmField.value;
            oldPassword = oldPasswordField.value;
            oldPasswordField.value = "";
            passwordField.value = "";
            passwordConfirmField.value = "";

            if (!verifyPassword()) {
                console.log('Incorrect Password');
                return;
            }

            if (password === passwordConfirm) {
                updatePassword();
            } else {
                console.log('Passwords do not match');
            }
        }
    }

    $('#logout').on('click', function() {
        sessionStorage.userName = null;
        location.href = "login.html";
    })

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

    function verifyPassword() {
        var ret = false;
        $.ajax({
            url: apiUrl + "users/passwordFromUsername-" + currentUsername,
            type: 'GET',
            dataType: 'JSON',
            async: false,
            success: function (data) {
                if(data) {
                    ret = ( data == oldPassword);
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

    function updateUsername() {
        var object = {"username": username};
        $.ajax({
            url: apiUrl + "users/username-" + currentUsername,
            type: 'PUT',
            dataType: 'JSON',
            data: object,
            async: false,
            success: function (data) {
                if (data) {
                    console.log("user updated");
                } else {
                    console.log('user could not be updated');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        return;
    }

    function updatePassword() {
        var object = {"password": password};
        $.ajax({
            url: apiUrl + "users/username-" + currentUsername,
            type: 'PUT',
            dataType: 'JSON',
            data: object,
            async: false,
            success: function (data) {
                if (data) {
                    console.log("user updated");
                } else {
                    console.log('user could not be updated');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        return;
    }
    console.log(sessionStorage.getItem("userName"));
    setup();
