var Game = function() {

  var g = this;

  // The domain pointing to the game server.
  g._domain = null;

  g._status = null;

  // The current player.
  g._player = null;

  // All the players.
  g._players = {};

  // The websocket connection.
  g._webSocket = null;

};

Game.prototype = {

  get: function(selector) { return document.querySelector(selector); },
  getAll: function(selector) { return document.querySelectorAll(selector); },

  // DOMAIN
  getDomain: function() { return this._domain; },
  setDomain: function(domain) { this._domain = domain; },

  // STATUS
  getStatus: function() { return this._status; },
  setStatus: function(status) { this._status = status; },

  // PLAYERS
  getPlayers: function () { return this._players; },
  getPlayerCount: function () {
    var count = 0;
    var players = this.getPlayers();
    for (var id in players) {
      if (!players.hasOwnProperty(id)) { continue; }
      count++;
    }
    return count;
  },
//  getReadyPlayers: function() {
//    var readyPlayers = [];
//    var players = this.getPlayers();
//    for (var id in players) {
//      if (!players.hasOwnProperty(id)) { continue; }
//      var player = players[id];
//      if (player.getGameStatus() === 'ready') {
//        readyPlayers.push(player);
//      }
//    }
//    return readyPlayers.length ? readyPlayers : null;
//  },
  addPlayer: function (player) {
    var id = player.id();
    this.getPlayers()[id] = player;
  },
  removePlayer: function(id) {
    delete this.getPlayers()[id];
  },
  loadPlayer: function(id) {
    return this.getPlayers()[id];
  },

  // CURRENT PLAYER
  setPlayer: function(player) { this._player = player; },
  getPlayer: function() { return this._player; },

  getHostPlayer: function() {
    var players = this.getPlayers();
    if (players) {
      for (var id in players) {
        if (!players.hasOwnProperty(id)) { continue; }
        return players[id];
      }
    }
    return null;
  },
  playerIsHost: function() {
    var host = this.getHostPlayer();
    return host && host.id() === this.getPlayer().id();
  },

  // WEB SOCKETS
  getConnection: function() { return this._webSocket; },
  setConnection: function(ws) { this._webSocket = ws; },
  connect: function(options) {

//    var self = this;

    var url = 'ws://' + this.getDomain() + ':8080';
    var socket = new WebSocket(url);

    // OPEN
    socket.addEventListener('open', function (e) {
      !!options.open ? options.open(e) : null;
    });

    // MESSAGE (receive)
    socket.addEventListener('message', function (e) {

//      if (e.data) {
//        var data = JSON.parse(e.data);
//        var op = data.op;
//        var request = !!self._requests[op] ? self._requests[op] :  null;
//        if (request) {
//          if (request.ok) { request.ok(data, e); }
////          if (request.error) { request.error(data, e); } // TODO handle the error somewhere else
//        }
//      }

      !!options.message ? options.message(e) : null;

    });

    // CLOSE
    socket.addEventListener('close', function (e) {
      !!options.close ? options.close(e) : null;
    });

    // ERROR
    socket.addEventListener('error', function (e) {
      console.log('ERROR', e);
      !!options.error ? options.error(e) : null;
    });

    this.setConnection(socket);

    return socket;

  },
  send: function(data) {
    this.getConnection().send(JSON.stringify(data));
  },
  _send: function(data, ok, error) {

    this._requests[data.op] = {
      data: data,
      ok: ok,
      error: error
    };

    this.getConnection().send(JSON.stringify(data));

  },
  _requests: { }

};

var GAME_NEW = 1;
var GAME_IN_PROGRESS = 2;
var GAME_PAUSED = 3;
var GAME_FINISHED = 4;
function gameStatusTypes() {
  return [
    GAME_NEW,
    GAME_IN_PROGRESS,
    GAME_PAUSED,
    GAME_FINISHED
  ];
}

function gameStatusMap() {
  var map = {};
  map[GAME_NEW] = {
    label: 'New',
    color: 'primary'
  };
  map[GAME_IN_PROGRESS] = {
    label: 'In progress',
    color: 'success'
  };
  map[GAME_PAUSED] = {
    label: 'Paused',
    color: 'danger'
  };
  map[GAME_FINISHED] = {
    label: 'Finished',
    color: 'secondary'
  };
  return map;
}

function gameStatusLoad(status) {
  return gameStatusMap()[status];
}
