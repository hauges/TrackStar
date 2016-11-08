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
    if(searchString == '') {
        searchString = '______';
    }
    var players = [];
    $.ajax({
        url: apiUrl + "players/players-" + searchString,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            if(data) {
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
    players.forEach(function(player) {
        console.log(player.name);
        var $listedPlayer = $('<li>');
        $listedPlayer.text(player.name);
        console.log($listedPlayer);
        $listedPlayer.appendTo('#searchResults');
        $listedPlayer.on('click', function() {
            var id = player._id;
            $listedPlayer.addClass("added");
            //add checked logo here
            console.log(id);
            //verify player is not already added
            var alreadyAdded = false;
             $.ajax({
            url: apiUrl + "users/favoritesFromUsername-" + username,
            type: 'GET',
            dataType: 'JSON',
            async: false,
            success: function (data) {
                if(data) {
                    console.log("Data: "  + data);
                    for (var x = 0; x < data.length; x++) {
                        if (data[x] == id) {
                            alreadyAdded = true;
                            return;
                        }
                    }
                } else {
                    console.log('user could not be found');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        if (!alreadyAdded) 
        {
            addPlayer(id)
        }


            //addPlayer(id);
        })
    }, this);
}

// make an ajax call
function addPlayer(playerId) {
    var input = {'favorites' : playerId};
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
searchBar.on('input', function() {
    searchString = searchBar.val();
    search();
});

