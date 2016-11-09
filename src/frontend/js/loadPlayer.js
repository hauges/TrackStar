
var playerID = sessionStorage.playerID;
var username = sessionStorage.getItem("userName");
var apiUrl = "http://localhost:3000/";
console.log(playerID);
createTable(getPlayer(playerID));

//TODO this is also in favoritePlayers.js, should move these to common file
function createTable(player) {
    var $favDiv = $('#stats-div');
    console.log($favDiv);
    var bioString = createBioTable(player);
    var statString = getStatLabels(player) + '<tr>';


    for (var i = 0; i < player.stats.statArray.length; i++) {
        statString = statString + '<td>' + player.stats.statArray[i] + '</td>';
    }

    statString = statString + '</tr></table>';

    $favDiv.append(bioString);
    $favDiv.append(statString);
    $favDiv.append('<br />');
}

function getStatLabels(player) {
    var ret = '<table class="player-table-long" id="' + player._id + '">';
    switch (player.stats.sport) {
        case 'basketball':
            ret = ret +
                '<thead>' +
                '<tr>' +
                '<th>PPG</th>' +
                '<th>APG</th>' +
                '<th>RPG</th>' +
                '<th>TOPG</th>' +
                '<th>BPG</th>' +
                '<th>SPG</th>' +
                '<th>PFPG</th>' +
                '<th>MPG</th>' +
                '<th>FG%</th>' +
                '<th>3P%</th>' +
                '<th>FT%</th>' +
                '</tr>' +
                '</thead>';
            break;
        case 'footballQB':
            ret = ret +
                '<thead>' +
                '<tr>' +
                '<th>Yards</th>' +
                '<th>Completion %</th>' +
                '<th>Int</th>' +
                '<th>TD</th>' +
                '<th>QBR</th>' +
                '</tr>' +
                '</thead>';
            break;
        case 'footballRB':
            ret = ret +
                '<thead>' +
                '<tr>' +
                '<th>Yards</th>' +
                '<th>Average</th>' +
                '<th>TD</th>' +
                '<th>First Downs</th>' +
                '</tr>' +
                '</thead>';
            break;
        case 'baseballPOS':
            ret = ret +
                '<thead>' +
                '<tr>' +
                '<th>GP</th>' +
                '<th>AB</th>' +
                '<th>Runs</th>' +
                '<th>Hits</th>' +
                '<th>HR</th>' +
                '<th>RBI</th>' +
                '<th>AVG</th>' +
                '<th>OBP</th>' +
                '</tr>' +
                '</thead>';
            break;
        case 'baseballP':
            ret = ret +
                '<thead>' +
                '<tr>' +
                '<th>IP</th>' +
                '<th>SO</th>' +
                '<th>W</th>' +
                '<th>L</th>' +
                '<th>Save</th>' +
                '<th>ERA</th>' +
                '</tr>' +
                '</thead>';
            break;
        case 'footballWR':
            ret = ret +
                '<thead>' +
                '<tr>' +
                '<th>Yards</th>' +
                '<th>Avg Yards</th>' +
                '<th>TD</th>' +
                '</tr>' +
                '</thead>';
            break;
        default:
            return;
    }
    return ret;
}

function createBioTable(player) {
    var $favDiv = $('#favorites');
    var picPath = "./pictures/" + player.picture;
    var tableString =
        '<span class="player-table-short" id="' + player._id + '">' +
        '<img src="' + picPath + '">' +
        '<div>' +
        '<table class="statTable">' +
        '<tr>' +
        '<td>' + '<div class="fields">' + "Name" + '</div>' + player.name + '</td>' +
        '<td>' + '<div class="fields">' + "Number" + '</div>' + player.number + '</td>' +
        '<td>' + '<div class="fields">' + "Team" + '</div>' + player.team + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + '<div class="fields">' + "Pos" + '</div>' + player.position +
        '<td>' + '<div class="fields">' + "Height" + '</div>' + player.height + '</td>' +
        '<td>' + '<div class="fields">' + "Weight" + '</div>' + player.weight + '</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</span>';

    return tableString;
}

//TODO this is also in favoritePlayers.js, should move these to common file
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

function deletePlayer() {
    $.ajax({
        url: apiUrl + "users/favs-" + username,
        type: 'DELETE',
        dataType: 'JSON',
        async: false,
        data: { "favorites": playerID },
        success: function () {
            location.href = "home.html";
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
}

$('#delete').on('click', deletePlayer);