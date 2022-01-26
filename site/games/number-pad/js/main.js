// GLOBALS

// game mode: countdown (default), infinite, etc
// show correct count
// show wrong count
// show accuracy
// show time

var game = null; // The Game object.

function loadTheGame() {

  // Initialize the game...

  game = new Game('number-pad');
  game.setVersion('0.0.0');

  // Get the game language, if any.
  var language = game.getLanguage();

  // Grab the language selection widget.
  var languagesContainer = game.get('#gameLanguagesContainer');

  // If the game language is NOT set...
  if (!language) {

    // Have they now picked a language? (the language code in the URL path)
    language = game.getArg(2);

    // If they didn't pick a language...
    if (!language) {

      // Show the language selection container and return.
      languagesContainer.classList.remove('d-none');
      return;

    }

  }

  // The game language is ready...

  // Set the language.
  game.setLanguage(language);

  // TODO set document title
  // "Learn Numbers in [Language]"

  // Show the change language button.
//  game.get('#changeLanguageBtn').classList.remove('d-none');

  // Hide the language selection container.
  languagesContainer.classList.add('d-none');

  // Get the numbers from the server...
  game.apiGet('numbers/' + game.getLanguage()).then((numbers) => {

    game.setNumbers(numbers);
    game.generateRandomNumbers();

    var html =

      '<div class="row mb-3">' +

        '<div class="col-12 col-lg-9 mt-3">' +

          // THE RANDOM NUMBER
          game.ui('theNumberToLearnWidget') +

          // NUMBERED BUTTONS
          game.ui('numberedButtonsWidget') +

        '</div>' +

        '<div class="col-12 col-lg-3 mt-0 mt-lg-3">' +

          // SCORE BOARD
          game.ui('scoreBoardWidget') +

        '</div>' +

      '</div>';

    // Set the game play container's html, show the container, and then start the game.
    game.setContainerContent(html, function() {
      game.showContainer();
      game.start();
    });

  }).catch((error) => {

    game.toast(error, 'danger');

  });

}
