Player.prototype.getScore = function() { return this._score; };
Player.prototype.setScore = function(score) { this._score = score; };
Player.prototype.refreshScore = function() {
  document.getElementById('playerScore' + this.id()).innerHTML = this.getScore();
};

function refreshCurrentPlayerBtn() {

  var player = game.getPlayer();
  var span = document.getElementById('playerName');
  span.innerHTML = '';
  var btn = document.getElementById('currentPlayerBtn');
  btn.classList.remove('d-none');

  var spans = document.querySelectorAll('span.playerName');
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    span.innerHTML = player.getName();
  }

}

function currentPlayerBtnOnclick(btn) {

  // Hide the button.
  btn.classList.add('d-none');

  var player = game.getPlayer();

  var span = document.getElementById('playerName');
  span.innerHTML =
    '<input id="playerNameInput" type="text" class="form-control" value="' + player.getName() + '" placeholder="' + player.getDefaultName() + '" onblur="editPlayerBtnBlur(this) "/>';

  setTimeout(function() {
    var input = document.getElementById('playerNameInput');

    // Place the cursor at the end of the input.
    // @see https://stackoverflow.com/a/2345915/763010
    input.focus(); //sets focus to element
    var val = input.value; //store the value of the element
    input.value = ''; //clear the value of the element
    input.value = val; //set that value back.

    input.addEventListener("keypress", function(e) {
      if (e.keyCode === 13) {
        _editPlayer(this);
      }
    });

  }, 1);

}

function editPlayerBtnBlur(input) {
  _editPlayer(input);
}

function _editPlayer(input) {
  var name = input.value;
  if (name !== '') {
    var player = game.getPlayer();
    player.setName(name);
    game.send({
      op: 'updatePlayerName',
      name: player.getName()
    });
    refreshPlayerList();
    refreshCurrentPlayerBtn();
  }
}
