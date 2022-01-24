// GLOBALS

var vInput = null; // The Vietnamese text field.
var eInput = null; // The English text field.

var dict = null; // The dictionary.
var language = null; // The name of the language being translated.

var vi = null; // The Vietnamese word.
var en = null; // The English word.

var game = null; // The Game object.
var gameStatusBox = null; // A div to show/control the game status.
var languageSelectList = null;

var chat = null;
var chatList = null;
var chatMsgInput = null;

function loadTheGame() {

  // Initialize the Game.
  game = new Game('word-dash');
  game.setVersion('0.0.0');

  // Connect to the server and handle connection events...
  game.connect({

    // CONNECTION OPENED
    open: function(e) {

      initChat();

      gameStatusBox = document.getElementById('gameStatus');

      // Set the Vietnamese and English text field inputs aside.
      vInput = document.getElementById('vInput');
      eInput = document.getElementById('eInput');

    },

    // MESSAGE RECEIVED
    message: function(e) {

      var data = JSON.parse(e.data);
      console.log(data);

      var op = data.op;
      switch (op) {

        case 'currentPlayerJustConnected':

          // If there are any existing players, add them to game.
          if (data.existingPlayers) {
            var players = data.existingPlayers;
            for (var i = 0; i < players.length; i++) {
              var player = new Player(players[i]);
              game.addPlayer(player);
            }
          }

          // Create the new player, and set their id and name, and set their status to online.
          var player = new Player({
            _score: 0
          });
          player.setId(data.id);
          player.setName(player.getDefaultName());
          player.setConnectionStatus('online');

          // Add the player to the game.
          game.addPlayer(player);

          // Set the player as the current player of the game.
          game.setPlayer(player);

          // Tell the server about the new player.
          game.send({
            op: 'addPlayer',
            player: player
          });

          refreshCurrentPlayerBtn();
          refreshPlayerList();

          game.setStatus(data.gameStatus);
          refreshGameStatus();

          switch (game.getStatus()) {

            case GAME_NEW:
              break;

            case GAME_IN_PROGRESS:
              startTheGame();
              break;

            case GAME_PAUSED:
              break;

            case GAME_FINISHED:
              break;

          }

          // Set the dictionary and language (they may be null).
          dict = data.dictionary;
          language = data.language;

          // For the game host...
          if (game.playerIsHost()) {

            showGameOptions();

            // Grab the language selection list and add an on change listener to it.
            languageSelectList = game.get('#languageSelection');
            var setLanguage = function(languageCode) {
              game.send({
                op: 'setLanguage',
                code: languageCode
              });
            };
            languageSelectList.addEventListener('change', function() {
              var languageCode = this.value;
              setLanguage(languageCode);
            });
            if (languageSelectList.value) { setLanguage(languageSelectList.value); }

            // Show the host the language selection list.
            languageSelectList.classList.remove('d-none');

          }
          else {

            refreshGameOptionsSummary();

          }

          break;

        case 'languageSet':

          dict = data.dictionary;
          language = data.language;

          vInputLabel.innerHTML = language;

          var spans = game.getAll('span.hostLanguage');
          for (var i = 0; i < spans.length; i++) {
            var span = spans[i];
            span.innerHTML = language;
          }

          game.get('#hostLanguageWordCount').innerHTML = numberOfWords();

          // Toggle the game status button for the host.
          if (game.playerIsHost()) {
            game.get('#gameStatusBtn').disabled = !dict;
          }

          refreshGameOptionsSummary();


          break;

        case 'playerAdded':

          // Create the player.
          var player = new Player(data.player);

          // Add the player to the game.
          game.addPlayer(player);

          refreshPlayerList();

          break;

        case 'playerRemoved':

          // Remove the player from the game.
          game.removePlayer(data.id);

          refreshPlayerList();

          break;

        case 'playerUpdated':

          var id = data.player._id;
          var player = game.loadPlayer(id);
          if (player) {

            var isCurrentPlayer = id === game.getPlayer().id();

            // Update the player's properties.
            for (var prop in data.player) {
              if (!data.player.hasOwnProperty(prop)) { continue; }
              player[prop] = data.player[prop];
            }

            refreshPlayerList();

            if (isCurrentPlayer) {
              refreshCurrentPlayerBtn();
            }

          }

          break;

        case 'gameStarted':

          game.setStatus(GAME_IN_PROGRESS);
          refreshGameStatus();
          startTheGame();

          break;

        case 'answeredCorrectly':

          var isCurrentPlayer = data.playerId === game.getPlayer().id();

          // Refresh the player's score.
          var player = game.loadPlayer(data.playerId);
          var score = player.getScore();
          score++;
          player.setScore(score);
          player.refreshScore();

          if (isCurrentPlayer) {

            // TODO play sound
//            toastMessage('Correct!', 'success');

            // Remove the word from the dictionary.
            removeWord(getAnswer());

            // Tell the user how many words are left.
            refreshWordCount();

            // Clear their input from the English text field.
            clearEnglishWord();

            // If the dictionary still has words...
            if (numberOfWords()) {

              // Choose a new random Vietnamese word for the user.
              setRandomVietnameseWord();

              eInput.disabled = false;
              eInput.focus();

            }
            else {

              // The dictionary is empty... they've translted all the words!

              game.send({
                op: 'completedGame'
              });

            }

          }

          break;

        case 'gameCompleted':

          game.setStatus(GAME_FINISHED);
          refreshGameStatus();
          hideGamePlay();

          dict = data.dictionary;

          var isCurrentPlayer = data.playerId === game.getPlayer().id();

          if (isCurrentPlayer) {

            // Clear the Vietnamese text field.
            vInput.value = '';

            toastMessage('You won!', 'success');

          }
          else {

            eInput.disabled = true;

            var player = game.loadPlayer(data.playerId);

            toastMessage(player.getName() + ' won!', 'primary');

          }

          break;

        case 'messageAdded':

          var msg = new Message(data.message);
          chat.addMessage(msg);

          addLatestMessage();

          // If the current player sent the message, clear the chat input and enable it.
          if (msg.getPlayerId() === game.getPlayer().id()) {
            chatMsgInput.value = '';
            chatMsgInput.disabled = false;
            chatMsgInput.focus();
          }

          break;

//        default:
//          console.log('onmessage, unknown op: ' + op);
//          break;

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

function startTheGame() {

  hideGameOptions();
  hideGameOptionsSummary();
  showGamePlay();

  // Grab the host and English input wrappers
//  var vWrapper = game.get('#vInputWrapper');
//  var eWrapper = game.get('#eInputWrapper');

  // Show the host and English inputs.
//  vWrapper.classList.remove('d-none');
//  eWrapper.classList.remove('d-none');

  // Show the user a random Vietnamese word.
  setRandomVietnameseWord();

  // Place the user's cursor on the Enligh input.
  eInput.disabled = false;
  eInput.setAttribute('placeholder', 'Type the translation');
  eInput.focus();

  // Show the user how many words are left.
  refreshWordCount();

  toastMessage('Game started!');

}

function refreshGameStatus() {
  var gameStatus = game.getStatus();
  var status = gameStatusLoad(gameStatus);
  var color = status.color;
  var label = status.label;
  var playerIsHost = game.playerIsHost();
  var html = '';
  if (playerIsHost) {
    html +=
      '<button type="button" id="gameStatusBtn" class="btn btn-' + color + '" onclick="gameStatusBtnOnclick(this)" disabled>' +
        (gameStatus === GAME_NEW ? 'Start game' : label) +
      '</button>';
  }
  else {
    html +=
      '<span class="badge bg-' + color + '">' +
        (gameStatus === GAME_NEW ? 'Waiting for host to start game' : label) +
      '</span>';
  }
  gameStatusBox.innerHTML = html;
}

function gameStatusBtnOnclick(btn) {
  btn.disabled = true;
  var status = game.getStatus();
  switch (status) {

    case GAME_NEW:
    case GAME_FINISHED:

      game.send({
        op: 'startGame'
      });

      break;

    default:

      btn.disabled = false;

      break;

  }

}

function refreshGameOptionsSummary() {

  if (!game.playerIsHost()) {

    var items = [];
    if (language) {
      items.push('<li class="list-group-item">Language: ' + language + '</li>');
    }

    var div = game.get('#gameOptionsSummary');
    div.classList.remove('d-none');
    div.innerHTML = items.length ? '<ul class="list-group">' + items.join('') + '</ul>' : '';

  }

}

function hideGameOptions() {
  game.get('#gameOptions').classList.add('d-none');
}

function showGameOptions() {
  game.get('#gameOptions').classList.remove('d-none');
}


function hideGameOptionsSummary() {
  game.get('#gameOptionsSummary').classList.add('d-none');
}

function showGameOptionsSummary() {
  game.get('#gameOptionsSummary').classList.remove('d-none');
}

function hideGamePlay() {
  game.get('#gamePlay').classList.add('d-none');
}

function showGamePlay() {
  game.get('#gamePlay').classList.remove('d-none');
}
