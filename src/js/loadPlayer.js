var playerID = sessionStorage.playerID;
var apiUrl = "http://localhost:3000/"
console.log(playerID);
createTable(getPlayer(playerID));

//TODO this is also in favoritePlayers.js, should move these to common file
function createTable(player) {
    var $favDiv = $('#stats-div');
    console.log($favDiv);
    var tableString =
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

    $favDiv.append(tableString);
    $favDiv.append('<br />');
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