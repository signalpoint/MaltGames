var Game = function(key) {

  if (!key) {
    console.log(new Error('missing game key'));
    return;
  }

  var g = this;

  g._key = key; // The unique game name identifier.
  g._protocol = location.protocol.replace(':', ''); // The protocol used by the game server.
  g._domain = location.host; // The domain pointing to the game server.
  g._url = g._protocol + '://' + g._domain; // The domain URL to the game server.
  g._currentUrl = null; // The current URL.
  g._gameUrl = g._url + '/games/' + key; // The URL to the public facing game.
  g._path = null; // The current path.
  g._audioLibrary = {}; // The audio elements.
  g._player = null; // The current player.
  g._players = {}; // All the players.
  g._status = null; // The status of the game.
  g._toast = null;
  g._modal = null;
  g._version = null; // The semantic version of the game.
  g._webSocket = null; // The websocket connection.

};

Game.prototype = {

  // KEY
  getKey: function() { return this._key; },

  // VERSION
  getVersion: function() { return this._version; },
  setVersion: function(version) { this._version = version; },

  // DOM Elements
  get: function(selector) { return document.querySelector(selector); },
  getAll: function(selector) { return document.querySelectorAll(selector); },

  // PROTOCOL
  getProtocol: function() { return this._protocol; },
  setProtocol: function(protocol) { this._protocol = protocol; },

  // DOMAIN
  getDomain: function() { return this._domain; },
  setDomain: function(domain) { this._domain = domain; },

  // URL
  getUrl: function() { return this._url; },
  setUrl: function(url) { this._url = url; },

  // CURRENT URL
  getCurrentUrl: function() {
    if (!this._currentUrl) { this.setCurrentUrl(window.location.href); }
    return this._currentUrl;
  },
  setCurrentUrl: function(url) { this._currentUrl = url; },

  // GAME URL
  getGameUrl: function() { return this._gameUrl; },
  setGameUrl: function(url) { this._gameUrl = url; },

  // PATH
  getPath: function() {
    if (!this._path) { this.setPath(new URL(this.getCurrentUrl()).pathname.substring(1)); }
    return this._path;
  },
  setPath: function(path) { this._path = path; },

  getArgs: function() { return this.getPath().split('/'); },
  getArg: function(position) { return this.getArgs()[position]; },

  // AUDIO
  getAudioLibrary: function() { return this._audioLibrary; },
  addAudio: function(key, url) {
    var audio = new Audio(url);
    // TODO add default listeners
    this.getAudioLibrary()[key] = audio;
    return audio;
  },
  getAudio: function(key) { return this.getAudioLibrary()[key]; },
  playAudio: function(key) { this.getAudio(key).play(); },

  // STATUS
  getStatus: function() { return this._status; },
  setStatus: function(status) { this._status = status; },

  // TOAST
  getToast: function() { return this._toast; },
  setToast: function(toast) { this._toast = toast; },

  // MODAL
  getModal: function() { return this._modal; },
  setModal: function(modal) { this._modal = modal; },

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

    var protocol = this.getProtocol() === 'https' ? 'wss': 'ws';
    var url = protocol + '://' + this.getDomain() + ':8080';
    var socket = new WebSocket(url);

    // OPEN
    socket.addEventListener('open', function (e) {
      !!options.open ? options.open(e) : null;
    });

    // MESSAGE (receive)
    socket.addEventListener('message', function (e) {
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

  // @deprecated
  _send: function(data, ok, error) {

    this._requests[data.op] = {
      data: data,
      ok: ok,
      error: error
    };

    this.getConnection().send(JSON.stringify(data));

  },

  // @deprecated
  _requests: { },

  ui: function(widget) {
    return this[widget].call(this, arguments.shift);
  }

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
