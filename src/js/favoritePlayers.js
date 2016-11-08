
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
        console.log(favs);
        if(favs.length <= 0){
            $('#favorites').append('<p id="noFavs"> You are not currently following any players. </br> To follow a player, navigate to the search page, or </br><a href="./search.html">click here</a> </p>');
        }else {
            favs.forEach(function (element) {
                var player = getPlayer(element);
                createTable(player);
            }, this);
        }
    }

    function createTable(player) {
        var $favDiv = $('#favorites');
        var tableString =
            '<span class="player-table-short" id="' + player._id + '">' +
                '<img src="./images/TrackStarBallsRed.png" alt="player picture">' +
            '<div>'+
            '<table class="statTable">' +
                '<tr>' +
                    '<td>' + '<div class="fields">' + "Name" + '</div>' + player.name + '</td>' +
                    '<td>' + '<div class="fields">' + "Number" + '</div>' + player.number + '</td>' +
                    '<td>' + '<div class="fields">' + "Team" + '</div>' + player.team + '</td>' +
                '</tr>' + 
                '<tr>' +
                    '<td>' + '<div class="fields">' + "Pos" + '</div>' + player.position +
                    '<td>' + '<div class="fields">' + "Height" + '</div>' + player.height + '</td>' +
                    '<td>' + '<div class="fields">' + "Weight" + '</div>' + player.weight + '</td>' +
                '</tr>' + 
            '</table>' +
        '</div>' +
        '</span>';
        
        $favDiv.append(tableString);
       // $favDiv.append('<br />');
    }

    getUser();
    pushFavs();

