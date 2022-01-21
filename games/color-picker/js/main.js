// GLOBALS

// game mode: countdown (default), infinite, etc
// show correct count
// show wrong count
// show accuracy
// show time

var game = null; // The Game object.

function loadTheGame() {

  // Initialize the game...

  game = new Game('color-picker');
  game.setVersion('0.0.0');

  /**
   * GLOBALS
   */

  // LANGUAGE
  game._language = null;
  game.setLanguage = function(code) {
    this._language = code;
  };
  game.getLanguage = function() {
    return this._language;
  };

  // COLORS
  game._colors = null;
  game.getColors = function() {
    return this._colors;
  };
  game.setColors = function(colors) {
    this._colors = colors;
  };

  // COLOR
  game._color = null;
  game.setColor = function(color) {
    this._color = color;
  };
  game.getColor = function() {
    return this._color;
  };

  // RANDOM COLORS
  game._randomColors = null;
  game.getRandomColors = function() {
    return this._randomColors;
  };

  // RANDOM WORDS
  game._randomWords = null;
  game.getRandomWords = function() {
    return this._randomWords;
  };

  // SCORE - CORRECT
  game._scoreCorrect = 0;
  game.getScoreCorrect = function() { return this._scoreCorrect; };
  game.setScoreCorrect = function(score) { this._scoreCorrect = score; };
  game.tickScoreCorrect = function() {
    this._scoreCorrect++;
    this.scoreBoardRefresh();
  };

  // SCORE - INCORRECT
  game._scoreIncorrect = 0;
  game.getScoreIncorrect = function() { return this._scoreIncorrect; };
  game.setScoreIncorrect = function(score) { this._scoreIncorrect = score; };
  game.tickScoreIncorrect = function() {
    this._scoreIncorrect++;
    this.scoreBoardRefresh();
  };

  // SCORE - LISTENS
  game._scoreListens = 0;
  game.getScoreListens = function() { return this._scoreListens; };
  game.setScoreListens = function(score) { this._scoreListens = score; };
  game.tickScoreListens = function() {
    this._scoreListens++;
    this.scoreBoardRefresh();
  };

  // SCORE - QUESTIONS
  game._scoreQuestions = 0;
  game.getScoreQuestions = function() { return this._scoreQuestions; };
  game.setScoreQuestions = function(score) { this._scoreQuestions = score; };
  game.tickScoreQuestions = function() {
    this._scoreQuestions++;
    this.scoreBoardRefresh();
  };

  // SCORE - TIME
  game._scoreTime = 0;
  game.getScoreTime = function() {
    return this._scoreTime;
  };

  game.resetScores = function() {
    this.setScoreCorrect(0);
    this.setScoreIncorrect(0);
    this.setScoreListens(0);
    this.tickScoreQuestions(0);
  };

  /**
   * HELPERS
   */

  game.getContainer = function() {
    return game.get('#gameContainer');
  };

  game.setContainerContent = function(html, ok) {
    this.getContainer().innerHTML = html;
    if (ok) { setTimeout(ok, 1); }
  };

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
    return this.getUrl() + '/malt/api.php?q=' + game.getKey() + '/sound/' + game.getLanguage() + '/' + game.getColor();
  };

  game.getGoogleTranslateUrl = function() {
    return 'https://translate.google.com/?sl=en&tl=' + this.getLanguage() + '&text=' + this.getColor() + '&op=translate';
  };

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

  game.restart = function() {
    game.resetScores();
    game.scoreBoardRefresh();
    game.generateRandomColors();
    game.generateRandomWords();
    game.showRandomColorToTranslate();
    game.getModal().hide();
  };

  game.isOver = function() {

    // If no words are left (in the randomized list).
    return !Object.keys(this.getRandomWords()).length;

  };

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
   * WIDGETS
   */

  /**
   * THE RANDOM COLOR
   */

  game.colorToTranslateWidget = function() {
    return '<div id="colorToTranslate" class="m-3 mt-0"></div>';
  };

  game.showRandomColorToTranslate = function() {

    var colors = this.getColors();
    var randomWords = this.getRandomWords();
    var randomColor = game.chooseRandomColor(randomWords);
    var word = colors[randomColor];
    var div = game.get('#colorToTranslate');

    div.innerHTML =

      '<p class="text-center mb-2">What color is this?</p>' +

      '<h2 class="text-center mb-2 bg-light text-dark py-2">' + word + '</h2>' +

      '<div class="btn-group w-100" role="group my-3">' +

        // LISTEN
        '<button type="button" class="btn btn-light btn-outline-dark btn-lg" title="Listen to the pronunciation">' +
          '<i class="fas fa-volume-up"></i>' +
        '</button>' +

        // QUESTION
        '<button type="button" class="btn btn-light btn-outline-dark btn-lg" onclick="game.questionBtnClickHandler()" title="Reveal the answer">' +
          '<i class="fas fa-question"></i>' +
        '</button>' +

      '</div>';

    // LISTEN BTN CLICK HANDLER
    setTimeout(function() {
      div.querySelector('button').addEventListener('click', function(btn) {

        var btn = this;

        btn.disabled = true;

        game.tickScoreListens();

        var audio = new Audio(game.getColorSoundUrl());
        audio.play();

      });
    }, 1);

  };

  game.questionBtnClickHandler = function() {

    game.tickScoreQuestions();

    game.playAudio('question');

    game.toast(game.getColor(), 'secondary');

  };

  /**
   * COLORED BUTTONS
   */

  game.coloredButtonsWidget = function() {

    var html = '';
    var randomColors = this.getRandomColors();
    var colorsPerRow = 3;
    var cols = [];

    // A helper to render a row of buttons.
    var renderRow = function(cols) {
      return '<div class="row g-3 mb-3">' + cols.join('') + '</div>';
    };

    // For each random color...
    for (const [color, word] of Object.entries(randomColors)) {

      // Add the button, wrapped with a column, to the row's columns.
      cols.push(
        '<div class="col">' +
          '<button type="button" class="btn btn-lg btn-outline-' + (color === 'white' ? 'dark' : 'light') + ' w-100 color-picker" style="background-color: ' + color + ';" data-color="' + color + '">' +
            '&nbsp;' +
          '</button>' +
        '</div>'
      );

      // Render a row if we reached the max columns.
      if (cols.length === colorsPerRow) {
        html += renderRow(cols);
        cols = [];
      }

    }

    // If there are any columns left, render the last row.
    if (cols.length) { html += renderRow(cols); }

    return html;

  };

  game.coloredButtonClickHandler = function() {

    // Grab their answer and see if they were right...
    var answer = this.getAttribute('data-color');
    var translation = game.getColors()[answer];
    if (answer === game.getColor()) {

      // They were right...

      game.tickScoreCorrect();

      // Remove the color from the random words list.
      game.removeColor(game.getRandomWords(), game.getColor());

      // If the game is over, w00t!
      if (game.isOver()) {

        game.finish();

      }
      else {

        // The game is not over...

//        game.playAudio('correct');

        game.toast('Correct', 'success');

        game.showRandomColorToTranslate();

      }

    }
    else {

      // They were wrong...

      game.tickScoreIncorrect();

//      game.playAudio('incorrect');

  //    var wrongTranslation = game.getColors()[game.getColor()];

      game.toast('No, that is ' + translation + '.', 'danger');

    }

  };

  /**
   * SCORE BOARD
   */

  game.scoreBoardWidget = function() {
    var html =
      '<h3>Score Board</h3>' +
      '<ul class="list-group">' +

        // Correct
        '<li class="list-group-item d-flex justify-content-between align-items-start">' +
          '<div class="ms-2 me-auto">' +
            '<div class="fw-bold">Correct</div>' +
            'Number of colors answered correctly.' +
          '</div>' +
          '<span id="scoreCorrectSpan" class="badge bg-success rounded-pill">' + game.getScoreCorrect() + '</span>' +
        '</li>' +

        // Incorrect
        '<li class="list-group-item d-flex justify-content-between align-items-start">' +
          '<div class="ms-2 me-auto">' +
            '<div class="fw-bold">Incorrect</div>' +
            'Number of colors answered incorrectly.' +
          '</div>' +
          '<span id="scoreIncorrectSpan" class="badge bg-danger rounded-pill">' + game.getScoreIncorrect() + '</span>' +
        '</li>' +

        // Listens
        '<li class="list-group-item d-flex justify-content-between align-items-start">' +
          '<div class="ms-2 me-auto">' +
            '<div class="fw-bold">Listens</div>' +
            'Number of pronunciations listened to.' +
          '</div>' +
          '<span id="scoreListensSpan" class="badge bg-primary rounded-pill">' + game.getScoreListens() + '</span>' +
        '</li>' +

        // Questions
        '<li class="list-group-item d-flex justify-content-between align-items-start">' +
          '<div class="ms-2 me-auto">' +
            '<div class="fw-bold">Questions</div>' +
            'The number of questions you asked.' +
          '</div>' +
          '<span id="scoreQuestionsSpan" class="badge bg-secondary rounded-pill">' + game.getScoreQuestions() + '</span>' +
        '</li>' +

      '</ul>';
    return html;
  };
  game.scoreBoardRefresh = function() {
    game.get('#scoreCorrectSpan').innerHTML = game.getScoreCorrect();
    game.get('#scoreIncorrectSpan').innerHTML = game.getScoreIncorrect();
    game.get('#scoreListensSpan').innerHTML = game.getScoreListens();
    game.get('#scoreQuestionsSpan').innerHTML = game.getScoreQuestions();
  };

  /**
   * START THE GAME...
   */

  var language = game.getLanguage();

  // If no language is set...
  if (!language) {

    // Did they pick a language?
    const urlParams = new URLSearchParams(window.location.search);
    language = urlParams.get('l');

    // If they didn't pick a language, just return so they can pick a language from index.html.
    if (!language) {
      return;
    }

  }

  // Set the language.
  game.setLanguage(language);

  // TODO set document title

  // Show the change language button.
  game.get('#changeLanguageBtn').classList.remove('d-none');

  // Hide the language selection container.
  game.get('#gameLanguagesContainer').classList.add('d-none');

  // Get the colors from the server...
  game.apiGet('colors/' + game.getLanguage()).then((colors) => {

    game.setColors(colors);
    game.generateRandomColors();
    game.generateRandomWords();

    var html =

      '<div class="row mb-3">' +

        '<div class="col-12 col-md-9">' +

          // THE RANDOM COLOR
          game.ui('colorToTranslateWidget') +

          // COLORED BUTTONS
          game.ui('coloredButtonsWidget') +

        '</div>' +

        '<div class="col-12 col-md-3">' +

          // SCORE BOARD
          game.ui('scoreBoardWidget') +

        '</div>' +

      '</div>';

    // Set the game play container's html, show the container, and then start the game.
    game.setContainerContent(html, function() {
      game.getContainer().classList.remove('d-none');
      game.start();
    });

  }).catch((error) => {

    game.toast(error, 'danger');

  });

}

/**
 * OTHER HELPERS
 */

// TODO add this as a gist, w/ attribution for the clone from s.o
function cloneAndShuffleObject(obj) {
  var shuffle = {};
  const clone = JSON.parse(JSON.stringify(obj));
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
