// GLOBALS

var game = null; // The Game object.

function loadTheGame() {

  // Initialize the game.
  game = new Game('example');
  game.setVersion('0.0.0');

  // Connect to the web socket server and handle connection events...
  game.connect({

    // CONNECTION OPENED
    open: function(e) {

      game.toast('Connection opened!');

    },

    // MESSAGE RECEIVED
    message: function(e) {

      var data = JSON.parse(e.data);
      console.log(data);

      var op = data.op;
      switch (op) {

        default:
          console.log('onmessage, unknown op: ' + op);
          break;

      }

    },

    // CONNECTION CLOSED
    close: function(e) {
      toastMessage('Connection closed!', 'danger');
    },

    // ERROR
    error: function(e) {
      toastMessage('Connection failed!', 'danger');
    }

  });

}

/**
 * GAME INITIALIZATION
 */
Game.prototype.init = function() {

  game = this;

  game.getContainer = function() {
    return this.get('#myGameContainer');
  };

};
