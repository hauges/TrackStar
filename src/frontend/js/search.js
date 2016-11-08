/**
 * Created by Logan Schiessle on 11/1/16.
 * handles the function of search.html in TrackStar
 */
"use strict";
var username = sessionStorage.getItem("userName");
console.log("session username: " + username);
var apiUrl = "http://localhost:3000/";
var searchString = '';
var $searchResults = $('#searchResults');


function search() {
    console.log('searching');
    if (searchString == '') {
        searchString = '______';
    }
    var players = [];
    $.ajax({
        url: apiUrl + "players/players-" + searchString,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                displayResults(data);
            } else {
                console.log('Player could not be found');
            }
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
}

function displayResults(players) {
    $searchResults.empty();
    var favoritePlayers = [];
    //get current favorite players
    $.ajax({
        url: apiUrl + "users/favoritesFromUsername-" + username,
        type: 'GET',
        dataType: 'JSON',
        async: false,
        success: function (data) {
            if (data) {
                favoritePlayers = data;
                // for (var x = 0; x < data.length; x++) {
                //     if (data[x] == id) {
                //         alreadyAdded = true;
                //         return;
                //     }
                // }
            } else {
                console.log('user could not be found');
            }
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
    players.forEach(function (player) {

        //verify player is not already added
        var alreadyAdded = false;

        var $listedPlayer = $('<li>');

        for (var x = 0; x < favoritePlayers.length; x++) {
            if (favoritePlayers[x] == player._id) {
                alreadyAdded = true;
                $listedPlayer.addClass("added");
                break;
            }
        }
        $listedPlayer.text(player.name);
        $listedPlayer.appendTo('#searchResults');
        $listedPlayer.on('click', function () {
            var id = player._id;
            $listedPlayer.addClass("added");
            //add checked logo here

            if (!alreadyAdded) {
                addPlayer(id)
            }
        })
    }, this);
}

// make an ajax call
function addPlayer(playerId) {
    var input = { 'favorites': playerId };
    console.log(input);
    $.ajax({
        url: apiUrl + "users/favs-" + username, // users/addFav-
        type: 'PUT',
        dataType: 'JSON',
        data: input,
        success: function () {
            console.log('added');
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
}

function initializeSearch() {
    console.log('initializing');

    //    add more initialization later...
}

initializeSearch();
var searchBar = $(':input[name="search"]');
searchBar.on('input', function () {
    searchString = searchBar.val();
    search();
});

