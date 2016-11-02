"use strict";
var apiUrl = "http://localhost:3000/"
var username = sessionStorage.getItem("userName");
var user; 

getUser();

var $tableList = $('table');

$tableList.each(function(index) {
    $(this).click(function() {
        sessionStorage.playerID = $(this).attr('id');
        location.href = "stats.html";
    });
});
