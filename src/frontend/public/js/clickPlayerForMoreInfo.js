"use strict";
var apiUrl = 'https://trackstar-backend.herokuapp.com/';
var username = sessionStorage.getItem("userName");
var user; 

getUser();

var $tableList = $('span');

$tableList.each(function(index) {
    $(this).click(function() {
        sessionStorage.playerID = $(this).attr('id');
        location.href = "stats.html";
    });
});
