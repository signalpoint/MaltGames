function getPlayerList() {
  return document.getElementById('playerList');
}
function refreshPlayerList() {

  var currentPlayer = game.getPlayer();
  var players = game.getPlayers();

  var items = [];

  for (var id in players) {

    if (!players.hasOwnProperty(id)) { continue; }

    var player = players[id];

    var isCurrentPlayer = player.id() == currentPlayer.id();

    var html = '';

    html += '<li class="list-group-item">';

      // Connection Status
      var connectionStatus = player.getConnectionStatus();
      var connectionStatusColorMap = {
        online: 'success',
        away: 'secondary'
      };
      var color = connectionStatusColorMap[connectionStatus];
      html += '<i class="fas fa-circle text-' + color + ' me-2"></i>';

      // Name
      html += player.getName();

      // Score
      html +=
        '<span id="playerScore' + player.id() + '" class="badge bg-primary float-end">' +
          (player.getScore() ? player.getScore() : '') +
        '</span>';

      // Game Status
//      var gameStatus = player.getGameStatus();
//      if (gameStatus) {
//        var gameStatusColorMap = {
//          ready: 'primary',
//          playing: 'success'
//        };
//        var color = gameStatusColorMap[gameStatus];
//        html += '<span class="badge bg-' + color + ' float-end">' + gameStatus + '</span>';
//      }

      // Ready?
//      if (isCurrentPlayer && gameStatus !== 'ready') {
//        html +=
//          '<div class="form-check float-end">' +
//            '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onchange="playerReadyBoxChange(this)">' +
//            '<label class="form-check-label" for="flexCheckDefault">Ready</label>' +
//          '</div>';
//      }

    html += '</li>';

    items.push(html);

  };

  getPlayerList().innerHTML = items.join('', items);

}

//function playerReadyBoxChange(input) {
//  input.disabled = true;
//  game._send({
//    op: 'updatePlayerStatus',
//    gameStatus: 'ready'
//  }, function(data, e) {
//    console.log('OK', data, e);
//
//    if (data.response === 'currentPlayerReady') {
//      game.getPlayer().setGameStatus('ready');
//      refreshPlayerList();
//    }
//
//  }, function() {
//    console.log('ERROR', arguments);
//  });
//}
