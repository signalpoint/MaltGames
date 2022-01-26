var Card = function(word) {

  var c = this;

  c._word = word;
  c._icon = game.getIcon(word);
  c._button = game.getRandomObjectButtonEl(word);
  c._isFaceUp = false;

  c.getWord = function() { return this._word; };
  c.setWord = function(word) { this._word = word; };

  c.getIcon = function() { return this._icon; };
  c.setIcon = function(icon) { this._icon = icon; };

  c.getButton = function() { return this._button; };

  c.isFaceUp = function() { return this._isFaceUp; };
  c.isFaceDown = function() { return !this._isFaceUp; };

  c.flipFaceUp = function() {

    var btn = this.getButton();
    btn.innerHTML = '<i class="fas fa-' + this.getIcon() + '"></i>';

    c._isFaceUp = true;

    game.setCurrentCard(c);

  };

  c.flipFaceDown = function() {

    var btn = this.getButton();
    btn.innerHTML = '&nbsp;';

    c._isFaceUp = false;

    game.setCurrentCard(null);

  };

};
