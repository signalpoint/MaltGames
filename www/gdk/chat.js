var Chat = function(el) {

  var c = this;

  c._messages = [];

};

Chat.prototype = {

  getMessages: function() {
    return this._messages;
  },
  addMessage: function(msg) {
    this.getMessages().push(msg);
  }

};
