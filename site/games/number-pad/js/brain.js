Game.prototype.init = function() {

  var game = this;

  game._numbers = null;
  game._number = null;
  game._randomNumbers = null;
  game._scoreCorrect = 0;
  game._scoreIncorrect = 0;
  game._scoreListens = 0;
  game._scoreQuestions = 0;

  // NUMBERS
  game.getNumbers = function() {
    return this._numbers;
  };
  game.setNumbers = function(numbers) {
    this._numbers = numbers;
  };

  // NUMBER
  game.setNumber = function(number) {
    this._number = number;
  };
  game.getNumber = function() {
    return this._number;
  };

  // RANDOM NUMBERS
  game.getRandomNumbers = function() {
    return this._randomNumbers;
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

    // Pick a new random number to translate.
    game.showRandomNumberToTranslate();

    // Listen for clicks on the numbered buttons.
    game.getAll('button.number-pad').forEach(btn => {
      btn.addEventListener("click", game.numberedButtonClickHandler, false);
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
    game.generateRandomNumbers();
    game.showRandomNumberToTranslate();
    game.getModal().hide();
  };

  /**
   * IS OVER?
   */

  game.isOver = function() {

    // If no numbers are left (in the randomized list).
    return !Object.keys(this.getRandomNumbers()).length;

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
    var totalNumbers = game.getScoreCorrect();
    var accuracy = ((totalNumbers / totalTurns) * 100).toFixed(2);

    myModal.setTitle('Finished!');

    myModal.setBody(
      '<ul class="list-group">' +

        // Accuracy
        '<li class="list-group-item d-flex justify-content-between align-items-start">' +
          '<div class="ms-2 me-auto">' +
            '<div class="fw-bold">Accuracy</div>' +
            'You picked ' + totalNumbers + ' numbers in ' + totalTurns + ' turns.' +
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

  game.removeNumber = function(list, number) {
    delete list[number];
  };

  game.generateRandomNumbers = function() {
    this._randomNumbers = cloneAndShuffleObject(this.getNumbers());
  };

  game.generateRandomNumbers = function() {
    this._randomNumbers = cloneAndShuffleObject(this.getNumbers());
  };

  game.chooseRandomNumber = function(numbers) {
    var randomNumber = getRandomProperty(numbers);
    this.setNumber(randomNumber);
    return randomNumber;
  };

  game.getNumberSoundUrl = function() {
    return this.getUrl() + '/api/' + game.getKey() + '/sound/' + game.getLanguage() + '/' + game.getNumber();
  };

  game.getGoogleTranslateUrl = function() {
    return 'https://translate.google.com/?sl=en&tl=' + this.getLanguage() + '&text=' + this.getNumber() + '&op=translate';
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
