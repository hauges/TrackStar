
var playerID = sessionStorage.playerID;
var username = sessionStorage.getItem("userName");
var apiUrl = "http://localhost:3000/";
console.log(playerID);
createTable(getPlayer(playerID));

//TODO this is also in favoritePlayers.js, should move these to common file
function createTable(player) {
    var $favDiv = $('#stats-div');
    console.log($favDiv);
    var bioString =
        '<table class="player-table-short" id="' + player._id + '">' +
        '<tr>' +
        '<td>' + player.name + '</td>' +
        '<td>' + player.number + '</td>' +
        '<td>' + player.team + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + player.position +
        '<td>' + player.height + '</td>' +
        '<td>' + player.weight + '</td>' +
        '</tr>' +
        '</table>';

    var statString = getStatLabels(player) + '<tr>';


    for(var i = 0; i < player.stats.statArray.length; i++) {
        statString = statString + '<td>' + player.stats.statArray[i] + '</td>';
    }

    statString = statString + '</tr></table>';

    $favDiv.append(bioString);
    $favDiv.append(statString);
    $favDiv.append('<br />');
}

function getStatLabels(player) {
    var ret = '<table class="player-table-long" id="' + player._id + '">';
    switch(player.stats.sport) {
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
                '</tr>'
            break;
        default:
            return;
    }
    return ret;
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

function deletePlayer() {
    $.ajax({
        url: apiUrl + "users/favs-" + username,
        type: 'DELETE',
        dataType: 'JSON',
        async: false, 
        data: { "favorites" : playerID },
        success: function () {
            location.href = "home.html";
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
}

$('#delete').on('click', deletePlayer);