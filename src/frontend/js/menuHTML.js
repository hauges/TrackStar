(function () {
    "use strict";
    var username = sessionStorage.getItem("userName");
    console.log("session username: " + username);
    function setup() {
        var pageName = window.location.pathname; //
        var indexOfName = pageName.indexOf("frontend") + 9;
        var indexOfDot = pageName.indexOf(".");
        pageName = pageName.substr(indexOfName, indexOfDot - indexOfName);
        pageName = getPageName(pageName);
        document.getElementById("menu").innerHTML = 
            "<div id=\"banner\">" +
            "<div id=\"menuDropDown\">" +
            "<button class=\"dropDownButton\">" +
            "<div id=\"menuIcon\">" +
            "<div class=\"bar\"></div>" +
            "<div class=\"bar\"></div>" +
            "<div class=\"bar\"></div>" +
            "</div>" +
            "</button>" +
            "<div id=\"dropDown-content\">" +
            "<a href=\"home.html\" class=\"hvr-grow\">Home</a>" +
            "<a href=\"playerList.html\" class=\"hvr-grow\">Player List</a>" +
            "<a href=\"teamList.html\" class=\"hvr-grow\">Team List</a>" +
            "<a href=\"search.html\" class=\"hvr-grow\">Search</a>" +
            "</div>" +
            "</div>" +
            "<p>" +
            "<span class=\"menu-button\">" + pageName + "</span>" +
            "<span class=\"logo\">TrackStar</span>" +
            "<span class=\"user-info\">" + "<a href=\"settings.html\" class=\"hvr-grow\">" + username + "</a>" + "</span>" +
            "</p>" +
            "</div>" +
            "<div id=\"player-div\">" +
            "<link href=\"./css/theme.css\" type=\"text/css\" rel=\"stylesheet\">" +
            "<link href=\"https://fonts.googleapis.com/css?family=Bungee|Bungee+Shade|Monoton\" rel=\"stylesheet\">" +
            "</div>";
    }

    function getPageName(pageTitle)
    {
        switch (pageTitle)
        {
            case "playerList":
                return '<a href="./playerList.html">Players</a>';
            case "home":
                return '<a href="./home.html">Home</a>';
            case "teamList":
                return '<a href="./teamList.html">Teams</a>';
            case "search":
                return '<a href="./search.html">Search</a>';
            case "settings":
                return '<a href="./settings.html">Settings</a>';
            case "stats":
                return '<a href="./home.html">home</a>' + ' -> ' + '<a href="./stats.html">Stats</a>';
            default:
                return "support not added yet";
        }
    }

    window.onload = setup;
})();
