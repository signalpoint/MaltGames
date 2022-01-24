Game.prototype.numberedButtonsWidget = function() {

  var html = '';
  var numbers = this.getNumbers();
  var numbersPerRow = 3;
  var cols = [];

  // A helper to render a row of buttons.
  var renderRow = function(cols) {
    return '<div class="row g-3 mb-3">' + cols.join('') + '</div>';
  };

  var buttonLabel = 1;

  // For each number...
  for (const [number, translation] of Object.entries(numbers)) {

    // Add the button, wrapped with a column, to the row's columns.
    cols.push(
      '<div class="col">' +
        '<button type="button" class="btn btn-primary btn-lg btn-outline-dark w-100 text-white number-pad" data-number="' + number + '">' +
          buttonLabel +
        '</button>' +
      '</div>'
    );
    buttonLabel++;
    if (buttonLabel === 10) { buttonLabel = 0; }

    // Render a row if we reached the max columns.
    if (cols.length === numbersPerRow) {
      html += renderRow(cols);
      cols = [];
    }

  }

  // If there are any columns left, render the last row.
  if (cols.length) { html += renderRow(cols); }

  return html;

};

Game.prototype.numberedButtonClickHandler = function() {

  // Grab their answer and see if they were right...
  var answer = this.getAttribute('data-number');
  var translation = game.getNumbers()[answer];
  if (answer === game.getNumber()) {

    // They were right...

    game.tickScoreCorrect();

    // Remove the number from the random numbers list.
    game.removeNumber(game.getRandomNumbers(), game.getNumber());

    // If the game is over, w00t!
    if (game.isOver()) {

      game.finish();

    }
    else {

      // The game is not over...

//        game.playAudio('correct');

      game.toast('Correct', 'success');

      game.showRandomNumberToTranslate();

    }

  }
  else {

    // They were wrong...

    game.tickScoreIncorrect();

//      game.playAudio('incorrect');

//    var wrongTranslation = game.getNumbers()[game.getNumber()];

    game.toast('No, that is ' + translation + '.', 'danger');

  }

};
