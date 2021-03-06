/**
 * Created by schizzle27 on 11/7/16.
 */
"use strict";
var apiUrl = 'https://trackstar-backend.herokuapp.com/';
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
            if (data) {
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
            if (data) {
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
    console.log("favorites: " + user.favorites);
    var favs = user.favorites;
    if (favs.length <= 0) {
        $('#allFavs').append('<p id="noFavs"> You are not currently following any players. </br> To follow a player, navigate to the search page, or </br><a href="./search.html">click here</a> </p>').addId("noFavs");
    } else {
        favs.forEach(function (element) {
            var player = getPlayer(element);
            createTable(player);
        }, this);
    }
}

function createTable(player) {
    var $favDiv = $('#allFavs');
    var $sportDiv;
    var sport = player.stats.sport.substr(0, 4);
    switch (sport) {
        case "base":
            $sportDiv = $('#baseball');
            break;
        case "bask":
            $sportDiv = $('#basketball');
            break;
        case "foot":
            $sportDiv = $('#football');
            break;
        default:
            $sportDiv = $('#other');
    }
    var tableString = '<p class="favs" id="' + player._id + '">' + player.name + '</p>';
    $sportDiv.append(tableString);
}

function addLinks() {
    var $baseball = $('#baseball');
    var $basketball = $('#basketball');
    var $football = $('#football');
    var expand = $('.expand');
    expand.each(function () {
        $(this).click(function (){
            console.log('in click');
            $(this).toggleClass("selected");
            $(this).next().toggleClass("show");
            // this.nextElementSibling.classList.toggle("show");
        });
    });
    var $players = $('p');

    $players.each(function (index) {
        $(this).click(function () {
            sessionStorage.playerID = $(this).attr('id');
            location.href = "stats.html";
        });
    });

    // $basketball.each(function (index) {
    //     $(this).click(function () {
    //         sessionStorage.playerID = $(this).attr('id');
    //         location.href = "stats.html";
    //     });
    // });
    //
    // $football.each(function (index) {
    //     $(this).click(function () {
    //         sessionStorage.playerID = $(this).attr('id');
    //         location.href = "stats.html";
    //     });
    // });
}

getUser();
pushFavs();
addLinks();

