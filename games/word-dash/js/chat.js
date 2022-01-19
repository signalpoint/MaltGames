function initChat() {

  chat = new Chat();

  chatList = document.getElementById('chatList');
  chatMsgInput = document.getElementById('chatMsgInput');

  chatMsgInput.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {

      this.disabled = true;

      var text = this.value;
      if (text === '') {
        this.disabled = false;
        return;
      }

      game.send({
        op: 'sendMessage',
        text: text
      });

    }
  });

}

function addLatestMessage() {
  var messages = chat.getMessages();
  if (messages) {
    var msg = messages[messages.length - 1];
    var player = game.loadPlayer(msg.getPlayerId());
    var li = document.createElement("li");
    li.classList.add('list-group-item');
    li.appendChild(document.createTextNode(player.getName() + ': ' + msg.getText()));
    chatList.appendChild(li);
    chatList.classList.remove('d-none');
  }
}
