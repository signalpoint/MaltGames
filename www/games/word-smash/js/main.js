// GLOBALS

var game = null; // The Game object.

function loadTheGame() {

  // Initialize the Game.
  game = new Game();
  game.setDomain('avalinafrankenstein.com');

  // Connect to the server and handle connection events...
  game.connect({

    // CONNECTION OPENED
    open: function(e) {

      toastMessage('Connection opened!', e);

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
