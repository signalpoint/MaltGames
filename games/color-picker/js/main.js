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
   * PART I
   */

  /**
   * START THE GAME...
   */

  var language = game.getLanguage();

  var languagesContainer = game.get('#gameLanguagesContainer');

  // If no language is set...
  if (!language) {

    // Did they pick a language?
    language = game.getArg(2);

    // If they didn't pick a language...
    if (!language) {

      // Show the language selection container.
      languagesContainer.classList.remove('d-none');

      // Just return so they can pick a language from index.html.
      return;

    }

  }

  // Set the language.
  game.setLanguage(language);

  // TODO set document title
  // "Learn Color Names in [Language]"

  // Show the change language button.
  game.get('#changeLanguageBtn').classList.remove('d-none');

  // Hide the language selection container.
  languagesContainer.classList.add('d-none');

  // Get the colors from the server...
  game.apiGet('colors/' + game.getLanguage()).then((colors) => {

    game.setColors(colors);
    game.generateRandomColors();
    game.generateRandomWords();

    var html =

      '<div class="row mb-3">' +

        '<div class="col-12 col-lg-9 mt-3">' +

          // THE RANDOM COLOR
          game.ui('colorToTranslateWidget') +

          // COLORED BUTTONS
          game.ui('coloredButtonsWidget') +

        '</div>' +

        '<div class="col-12 col-lg-3 mt-0 mt-lg-3">' +

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
