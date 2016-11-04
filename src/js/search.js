/**
 * Created by Logan Schiessle on 11/1/16.
 * handles the function of search.html in TrackStar
 */
"use strict";
var username = sessionStorage.getItem("userName");
console.log("session username: " + username);
var apiUrl = "http://localhost:3000/";
var searchString = '';
var $searchResults = $('#search-results');


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
        var $listedPlayer = $('<p>');
        $listedPlayer.text(player.name);
        console.log($listedPlayer);
        $listedPlayer.appendTo('#search-results');
        $listedPlayer.on('click', function() {
            var id = player._id;
            console.log(id);
            addPlayer(id);
        })
    }, this);
}

// make an ajax call
function addPlayer(playerId) {
    var input = {'favorites' : playerId};
    console.log(input);
    $.ajax({
        url: apiUrl + "users/addFav-" + username, // users/addFav-
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


