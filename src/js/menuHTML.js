(function () {
    "use strict";
    var username = sessionStorage.getItem("userName");
    console.log("session username: " + username);
    function setup() {
        var pageName = window.location.pathname;
        var indexOfName = pageName.indexOf("src") + 4;
        var indexOfDot = pageName.indexOf(".");
        pageName = pageName.substr(indexOfName, indexOfDot - indexOfName);
        pageName = getPageName(pageName);
        document.getElementById("menu").innerHTML = "<head>" +
            "<title>TrackStar - " + pageName + "</title>" +
            "<link href=\"./css/theme.css\" type=\"text/css\" rel=\"stylesheet\">" +
            "<link href=\"https://fonts.googleapis.com/css?family=Bungee|Bungee+Shade|Monoton\" rel=\"stylesheet\">" +
            "</head>" +
            "<body>" +
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
            "<span class=\"user-info\">" + username + "</span>" +
            "</p>" +
            "</div>" +
            "<div id=\"player-div\">" +
            "</div>" +
            "</body>";
    }

    function getPageName(pageTitle)
    {
        switch (pageTitle)
        {
            case "playerList":
                return "Players";
            case "home":
                return "Home";
            case "teamList":
                return "Teams";
            case "search":
                return "Search";
            case "settings":
                return "Settings";
            default:
                return "support not added yet";
        }
    }

    window.onload = setup;
})();
