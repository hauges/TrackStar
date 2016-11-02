
    "use strict";
    var apiUrl = "http://localhost:3000/"
    var username = sessionStorage.getItem("userName");
    //var username = "user" // this sould not be set here but this is meant for testing
    var user;

    /**
     * Gets the user based on the passed username
     */
    function getUser() {
        $.ajax({
            url: apiUrl + "users/username-" + username,
            type: 'GET',
            dataType: 'JSON',
            async: true,
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

    /**
     * Gets info on a givn player id
     */
    function getPlayer(playerID) {
        var ret;
        $.ajax({
            url: apiUrl + "players/id-" + playerID,
            type: 'GET',
            dataType: 'JSON',
            async: false,
            success: function (data) {
                if(data) {
                    ret = data[0];
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

    /**
     * Pushes players into the div
     */
    function pushFavs() {
        var favs = user.favorites;
        favs.forEach(function(element) {
            var player = getPlayer(element);
            createTable(player);
        }, this);
    }

    function createTable(player) {
        var $favDiv = $('#favorites');
        console.log($favDiv);
        var tableString = 
            '<table class="player-table-short" id="' + player._id + '">' +
                '<tr>' +
                    '<td>' + player.name + '</td>' +
                    '<td>' + player.number + '</td>' +
                    '<td>' + player.team + '</td>' +
                '</tr>' + 
                '<tr>' +
                    '<td>' + player.position +
                    '<td>' + player.height + '</td>' +
                    '<td>' + player.weight + '</td>' +
                '</tr>' + 
            '</table>';
        
        $favDiv.append(tableString);
        $favDiv.append('<br />');
    }

    getUser();
    pushFavs();

