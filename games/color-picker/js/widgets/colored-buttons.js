Game.prototype.coloredButtonsWidget = function() {

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
        '<button type="button" class="btn btn-lg btn-outline-dark w-100 color-picker" style="background-color: ' + color + ';" data-color="' + color + '">' +
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

Game.prototype.coloredButtonClickHandler = function() {

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
