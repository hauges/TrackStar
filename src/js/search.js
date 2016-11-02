/**
 * Created by Logan Schiessle on 11/1/16.
 * handles the function of search.html in TrackStar
 */
    "use strict";
    var username = sessionStorage.getItem("userName");
    console.log("session username: " + username);
    var searchString;
    var players;

    function search() {
        console.log('searching');
        $.ajax({
            url: apiUrl + "players/players-" + searchString,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if(data) {
                    players = data;
                } else {
                    console.log('Player could not be found');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        displayResults();
    }

    function displayResults() {
        var results = $('#search-results').empty();
        console.log(players);
    }

     function initializeSearch() {
         console.log('initializing');
         searchString = $('#search').on('input', search);
     //    add more initialization later...
     }

    initializeSearch();


