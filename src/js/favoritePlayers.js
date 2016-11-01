(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/"
    var username = "user" // this sould not be set here but this is meant for testing
    var user;

    // make ajax call to update this contact
    // this is temporary.  we will pass the user in by a session 
    // for purposes of sprint 1
    function getUser() {
        $.ajax({
            url: apiUrl + "/username-" + username,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if(data) {
                    console.log(data);
                } else {
                    console.log('user could not be found');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    }

    $(document).ready(function () {
        getUser();
    });

})();