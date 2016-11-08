/**
 * Created by schizzle27 on 11/7/16.
 */
"use strict";
var apiUrl = "http://localhost:3000/"
var username = sessionStorage.getItem("userName");
//var username = "user" // this sould not be set here but this is meant for testing
var user;

/**
 * Gets the user based on the passed username
 */
function getUser() {
    console.log('USER');
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
    console.log(user.favorites);
    var favs = user.favorites;
    if(favs.length <= 0){
        $('#allFavs').append('<p id="noFavs"> You are not currently following any players. </br> To follow a player, navigate to the search page, or </br><a href="./search.html">click here</a> </p>');
    }else {
        favs.forEach(function (element) {
            var player = getPlayer(element);
            createTable(player);
        }, this);
    }
}

function createTable(player) {
    var $favDiv = $('#allFavs');
    var tableString = '<p class="favs">' +  player.name + '</p>';
    $favDiv.append(tableString);
}

getUser();
pushFavs();

