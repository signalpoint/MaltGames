var Player = function(obj) {

  var p = this;

  // PROPERTIES

  p._id = null; // The player id (we use the websocket connection resource id as the player id).
  p._name = null;
//  p._status = null; // The player status TODO deprecate
  p._connectionStatus = null; // The player's connection status.
  p._gameStatus = null; // The player's game status.

  if (obj) {
    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) { continue; }
        p[prop] = obj[prop];
    }
  }

};

Player.prototype = {

  id: function() { return this.getId(); },

  getId: function() { return this._id; },
  setId: function(id) { this._id = id; },

  getName: function() { return this._name; },
  setName: function(name) { this._name = name; },

  getDefaultName: function() { return 'Player ' + this.id(); },

  // TODO DEPRECATE
//  getStatus: function() { return this._status; },
//  setStatus: function(status) { this._status = status; },

  getConnectionStatus: function() { return this._connectionStatus; },
  setConnectionStatus: function(status) { this._connectionStatus = status; },

  getGameStatus: function() { return this._gameStatus; },
  setGameStatus: function(status) { this._gameStatus = status; }

};

// TODO keep online and away separate from ready and playing, since the latter are particular to a game

function playerConnectionStatusTypes() {
  return [
    'online',
    'away'
  ];
}

function playerGameStatusTypes() {
  return [
    'ready',
    'playing'
  ];
}

/**
 * @deprecated
 */
//function playerStatusTypes() {
//  return [
//    'online',
//    'ready',
//    'playing',
//    'away'
//  ];
//}
//
///**
// * @deprecated
// */
//function playerStatusMap() {
//  return {
//    online: {},
//    ready: {},
//    playing: {},
//    away: {}
//  };
//}
