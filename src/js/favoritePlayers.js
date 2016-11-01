(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/users/"
    var username = sessionStorage.getItem("userName");
    //var username = "user" // this sould not be set here but this is meant for testing
    var user;

    /**
     * Gets the user based on the passed username
     */
    function getUser() {
        $.ajax({
            url: apiUrl + "/username-" + username,
            type: 'GET',
            dataType: 'JSON',
            async: false,
            success: function (data) {
                if(data) {
                    user = data[0];
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
        console.log(user);
        pushFavs();
    });

    function pushFavs() {
        var $favDiv = $('#favorites');
        console.log($favDiv);
        var favs = user.favorites;
        console.log(favs);
        favs.forEach(function(element) {
            $favDiv.append('<p>' + element + '</p>')
        }, this);
    }

})();