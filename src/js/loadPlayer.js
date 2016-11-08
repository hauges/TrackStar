
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
                '<tr>' +
                '<td>PPG</td>' +
                '<td>APG</td>' +
                '<td>RPG</td>' +
                '<td>TOPG</td>' +
                '<td>BPG</td>' +
                '<td>SPG</td>' +
                '<td>PFPG</td>' +
                '<td>MPG</td>' +
                '<td>FG%</td>' +
                '<td>3P%</td>' +
                '<td>FT%</td>' +
                '</tr>';
            break;
        case 'footballQB':
            ret = ret +
                '<tr>' +
                '<td>Yards</td>' +
                '<td>Completion %</td>' +
                '<td>Int</td>' +
                '<td>TD</td>' +
                '<td>QBR</td>' +
                '</tr>';
            break;
        case 'footballRB':
            ret = ret +
                '<tr>' +
                '<td>Yards</td>' +
                '<td>Average</td>' +
                '<td>TD</td>' +
                '<td>First Downs</td>' +
                '</tr>';
            break;
        case 'baseballPOS':
            ret = ret +
                '<tr>' +
                '<td>GP</td>' +
                '<td>AB</td>' +
                '<td>Runs</td>' +
                '<td>Hits</td>' +
                '<td>HR</td>' +
                '<td>RBI</td>' +
                '<td>AVG</td>' +
                '<td>OBP</td>' +
                '</tr>';
            break;
        case 'baseballP':
            ret = ret +
                '<tr>' +
                '<td>IP</td>' +
                '<td>SO</td>' +
                '<td>W</td>' +
                '<td>L</td>' +
                '<td>Save</td>' +
                '<td>ERA</td>' +
                '</tr>';
            break;
        case 'footballWR':
            ret = ret +
                '<tr>' +
                '<td>Yards</td>' +
                '<td>Avg Yards</td>' +
                '<td>TD</td>' +
                '</tr>';
            break;
        default:
            return;
    }
    return ret;
}

function createBioTable(player) {
    var $favDiv = $('#favorites');
    var tableString =
        '<span class="player-table-short" id="' + player._id + '">' +
        '<img src="./images/TrackStarBallsRed.png" alt="player picture">' +
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