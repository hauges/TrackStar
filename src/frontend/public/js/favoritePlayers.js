
    "use strict";
    var apiUrl = 'https://trackstar-backend.herokuapp.com/';
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
        if(favs.length <= 0){
            $('#favorites').append('<p id="noFavs"> You are not currently following any players. </br> To follow a player, navigate to the search page, or </br><a href="./search.html">click here</a> </p>');
        }else {
            favs.forEach(function (element) {
                var player = getPlayer(element);
                createSummaryTable(player);
            }, this);
        }
    }

    function createSummaryTable(player) {
        var $favDiv = $('#favorites');
        var picPath = "./pictures/" + player.picture;
        var tableString =
            '<span class="player-table-short" id="' + player._id + '">' +
                '<img src="' + picPath + '">' +
            '<div>'+
            '<table class="statTable">' +
                '<tr>' +
                    '<td>' + '<div class="fields">' + "Name" + '</div>' + player.name + '</td>' +
                    '<td>' + '<div class="fields">' + "Pos" + '</div>' + player.position + '</td>' +
                    '<td>' + '<div class="fields">' + "Team" + '</div>' + player.team + '</td>' +
                '</tr>' + 
                '<tr>' +
                    getTopThreeStats(player) +
                '</tr>' +
            '</table>' +
        '</div>' +
        '</span>';
        
        $favDiv.append(tableString);
       // $favDiv.append('<br />');
    }

    function getTopThreeStats(player) {
        var ret;
    switch(player.stats.sport) {
        case 'basketball':
            ret = '<td>' + '<div class="fields">' + "PPG" + '</div>' + player.stats.statArray[0] +
                    '<td>' + '<div class="fields">' + "APG" + '</div>' + player.stats.statArray[1] + '</td>' +
                    '<td>' + '<div class="fields">' + "RPG" + '</div>' + player.stats.statArray[2] + '</td>';
            break;
        case 'footballQB':
            ret = '<td>' + '<div class="fields">' + "Yards" + '</div>' + player.stats.statArray[0] +
                    '<td>' + '<div class="fields">' + "TD" + '</div>' + player.stats.statArray[3] + '</td>' +
                    '<td>' + '<div class="fields">' + "QBR" + '</div>' + player.stats.statArray[4] + '</td>';
            break;
        case 'footballRB':
            ret = '<td>' + '<div class="fields">' + "Yards" + '</div>' + player.stats.statArray[0] +
                    '<td>' + '<div class="fields">' + "Average" + '</div>' + player.stats.statArray[1] + '</td>' +
                    '<td>' + '<div class="fields">' + "TD" + '</div>' + player.stats.statArray[2] + '</td>';
            break;
        case 'baseballPOS':
            ret = '<td>' + '<div class="fields">' + "AB" + '</div>' + player.stats.statArray[0] +
                    '<td>' + '<div class="fields">' + "Hits" + '</div>' + player.stats.statArray[1] + '</td>' +
                    '<td>' + '<div class="fields">' + "Average" + '</div>' + player.stats.statArray[2] + '</td>';
            break;
        case 'baseballP':
            ret = '<td>' + '<div class="fields">' + "W" + '</div>' + player.stats.statArray[0] +
                    '<td>' + '<div class="fields">' + "Saves" + '</div>' + player.stats.statArray[1] + '</td>' +
                    '<td>' + '<div class="fields">' + "ERA" + '</div>' + player.stats.statArray[2] + '</td>';
            break;
        case 'footballWR':
            ret = '<td>' + '<div class="fields">' + "Yards" + '</div>' + player.stats.statArray[0] +
                    '<td>' + '<div class="fields">' + "Avg Yards" + '</div>' + player.stats.statArray[1] + '</td>' +
                    '<td>' + '<div class="fields">' + "TD" + '</div>' + player.stats.statArray[2] + '</td>';
            break;
        default:
            return;
    }
    return ret;
    }

    getUser();
    pushFavs();

