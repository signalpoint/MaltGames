var Message = function(obj) {

  var m = this;

  m._playerId = null;
  m._text = null;
  m._created = null;

  if (obj) {
    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) { continue; }
        m[prop] = obj[prop];
    }
  }

};

Message.prototype = {

  getPlayerId: function() { return this._playerId; },
  getText: function() { return this._text; },
  getCreated: function() { return this._created; }

};
