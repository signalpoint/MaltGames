Game.prototype.init = function() {

  var game = this;

  game._colors = null;
  game._color = null;
  game._randomColors = null;
  game._randomWords = null;
  game._scoreCorrect = 0;
  game._scoreIncorrect = 0;
  game._scoreListens = 0;
  game._scoreQuestions = 0;

  // COLORS
  game.getColors = function() {
    return this._colors;
  };
  game.setColors = function(colors) {
    this._colors = colors;
  };

  // COLOR
  game.setColor = function(color) {
    this._color = color;
  };
  game.getColor = function() {
    return this._color;
  };

  // RANDOM COLORS
  game.getRandomColors = function() {
    return this._randomColors;
  };

  // RANDOM WORDS
  game.getRandomWords = function() {
    return this._randomWords;
  };

  // SCORE - CORRECT
  game.getScoreCorrect = function() { return this._scoreCorrect; };
  game.setScoreCorrect = function(score) { this._scoreCorrect = score; };
  game.tickScoreCorrect = function() {
    this._scoreCorrect++;
    this.scoreBoardRefresh();
  };

  // SCORE - INCORRECT
  game.getScoreIncorrect = function() { return this._scoreIncorrect; };
  game.setScoreIncorrect = function(score) { this._scoreIncorrect = score; };
  game.tickScoreIncorrect = function() {
    this._scoreIncorrect++;
    this.scoreBoardRefresh();
  };

  // SCORE - LISTENS
  game.getScoreListens = function() { return this._scoreListens; };
  game.setScoreListens = function(score) { this._scoreListens = score; };
  game.tickScoreListens = function() {
    this._scoreListens++;
    this.scoreBoardRefresh();
  };

  // SCORE - QUESTIONS
  game.getScoreQuestions = function() { return this._scoreQuestions; };
  game.setScoreQuestions = function(score) { this._scoreQuestions = score; };
  game.tickScoreQuestions = function() {
    this._scoreQuestions++;
    this.scoreBoardRefresh();
  };

  // RESET SCORES
  game.resetScores = function() {
    this.setScoreCorrect(0);
    this.setScoreIncorrect(0);
    this.setScoreListens(0);
    this.setScoreQuestions(0);
  };

  /**
   * START
   */

  game.start = function() {

    // Pick a new random color to translate.
    game.showRandomColorToTranslate();

    // Listen for clicks on the colored buttons.
    game.getAll('button.color-picker').forEach(btn => {
      btn.addEventListener("click", game.coloredButtonClickHandler, false);
    });

    // Quietly download sounds in the background.
    [
      'success',
      'correct',
      'incorrect',
      'question'
    ].forEach(sound => {
      game.addAudio(sound, game.getGameUrl() + '/media/' + sound + '.mp3');
    });

  };

  /**
   * RESTART
   */

  game.restart = function() {
    game.resetScores();
    game.scoreBoardRefresh();
    game.generateRandomColors();
    game.generateRandomWords();
    game.showRandomColorToTranslate();
    game.getModal().hide();
  };

  /**
   * IS OVER?
   */

  game.isOver = function() {

    // If no words are left (in the randomized list).
    return !Object.keys(this.getRandomWords()).length;

  };

  /**
   * FINISH
   */

  game.finish = function() {

    var modalEl = game.get('#gameModal');
    var myModal = new bootstrap.Modal(modalEl, {
      keyboard: false
    });
    game.setModal(myModal);

    var totalTurns = game.getScoreCorrect() + game.getScoreIncorrect();
    var totalColors = game.getScoreCorrect();
    var accuracy = ((totalColors / totalTurns) * 100).toFixed(2);

    myModal.setTitle('Finished!');

    myModal.setBody(
      '<ul class="list-group">' +

        // Accuracy
        '<li class="list-group-item d-flex justify-content-between align-items-start">' +
          '<div class="ms-2 me-auto">' +
            '<div class="fw-bold">Accuracy</div>' +
            'You picked ' + totalColors + ' colors in ' + totalTurns + ' turns.' +
          '</div>' +
          '<span id="scoreCorrectSpan" class="badge bg-success rounded-pill">' + accuracy + '%</span>' +
        '</li>' +

      '</ul>'
    );

    myModal.setFooter('<button type="button" class="btn btn-primary">Try Again</button>');
    modalEl.addEventListener('shown.bs.modal', function (e) {
      var tryAgainBtn = myModal.getFooterElement().querySelector('button');
      tryAgainBtn.addEventListener('click', function() {
        game.restart();
      });
    });

    myModal.showFooter();
    myModal.show();

    game.playAudio('success');

  };

  /**
   * HELPERS
   */

  game.removeColor = function(list, color) {
    delete list[color];
  };

  game.generateRandomColors = function() {
    this._randomColors = cloneAndShuffleObject(this.getColors());
  };

  game.generateRandomWords = function() {
    this._randomWords = cloneAndShuffleObject(this.getColors());
  };

  game.chooseRandomColor = function(colors) {
    var randomColor = getRandomProperty(colors);
    this.setColor(randomColor);
    return randomColor;
  };

  game.getColorSoundUrl = function() {
    return this.getUrl() + '/api/' + game.getKey() + '/sound/' + game.getLanguage() + '/' + game.getColor();
  };

  game.getGoogleTranslateUrl = function() {
    return 'https://translate.google.com/?sl=en&tl=' + this.getLanguage() + '&text=' + this.getColor() + '&op=translate';
  };

};

/**
 * OTHER HELPERS
 */

// TODO add this as a gist
function cloneAndShuffleObject(obj) {
  var shuffle = {};
  const clone = JSON.parse(JSON.stringify(obj)); // TODO needs attribution here to s.o answer
  var prop = getRandomProperty(clone);
  while (prop) {
    shuffle[prop] = clone[prop];
    delete clone[prop];
    prop = getRandomProperty(clone);
  }
  return shuffle;
}

// @see https://stackoverflow.com/a/15106541/763010
function getRandomProperty(obj) {
  var keys = Object.keys(obj);
  return keys.length ? keys[ keys.length * Math.random() << 0] : null;
};
