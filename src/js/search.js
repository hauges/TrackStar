/**
 * Created by Logan Schiessle on 11/1/16.
 * handles the function of search.html in TrackStar
 */
    "use strict";
    var username = sessionStorage.getItem("userName");
    console.log("session username: " + username);
    var apiUrl = "http://localhost:3000/";
    $("[name='search']").on('input', search());


    function search() {
        console.log('searching');
        var players = [];
        $.ajax({
            url: apiUrl + "players/players-" + "Troy",
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
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
        displayResults(players);
    }

    function displayResults(players) {
        var results = $('#search-results').empty();
        console.log(players);
    }

     function initializeSearch() {
         console.log('initializing');
         
     //    add more initialization later...
     }

    initializeSearch();


