/**
 * Created by Logan Schiessle on 11/1/16.
 * handles the function of search.html in TrackStar
 */
(function () {
    "use strict";
    var username = sessionStorage.getItem("userName");
    console.log("session username: " + username);
    function initializeSearch() {
        var searchString = $('#search').on('input', search);
    //    add more initialization later...
    }

    function search() {
        
    }
    window.onload = initializeSearch;
});

