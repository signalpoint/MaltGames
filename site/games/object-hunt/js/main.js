var game = null; // The Game object.

function loadTheGame() {

  // Initialize the game.
  game = new Game('object-hunt');
  game.setVersion('0.0.0');

  game.setLanguage('vi');

  // Get the objects from the server...
  game.apiGet('objects/' + game.getLanguage()).then((response) => {

//    console.log(response);

    var icons = response.icons;
    var words = response.words;

    game.setIcons(icons);
    game.setWords(words);

    // TEMP: Google Translate Links
//    var language = 'vi';
//    var gTranslateLinks = [];
//    for (const [word, icon] of Object.entries(icons)) {
//      var url = 'https://translate.google.com/?sl=en&tl=' + language + '&text=' + word + '&op=translate';
//      gTranslateLinks.push(
//        '<li class="list-group-item">' +
//          '<a href="' + url + '" target="_blank">' + word + '</a>' +
//        '</li>'
//      );
//    }
//    game.get('#tempTranslationList').innerHTML =
//      '<ul class="list-group">' +
//        gTranslateLinks.join('') +
//      '</ul>';
//    return;

    game.generateRandomObjects();

    // WORD PLACEHOLDERS
    // TODO need "game configuration" goodies in the GDK
    // Show the placeholder buttons (as disabled) that will be filled with random words when a card is flipped.
    var buttonCount = 3;
    var columnSize = 12 / buttonCount;
    var columns = [];
    for (var i = 0; i < buttonCount; i++) {
      columns.push(
        '<div class="col-' + columnSize + ' text-center">' +
          '<button type="button" class="btn btn-lg btn-primary" disabled><i class="fas fa-question"></i></button>' +
        '</div>'
      );
    }
    var placeholderButtons = '<div class="row">' + columns.join('') + '</div>';
    game.display(game.getPlaceholdersContainer(), placeholderButtons, function() {

      var buttons = game.getPlaceholderButtons();

      buttons.forEach(function (btn) {

        btn.addEventListener('click', function() {

          var btn = this;
          var word = btn.getAttribute('data-word');
          var card = game.getCurrentCard();
          var cardBtn = card.getButton();

          // Disable the button.
          btn.disabled = true;

          // Show the icon and the translation next to the word.
          btn.innerHTML = '<i class="fas fa-' + game.getIcon(word) + ' me-2"></i>' + game.getWord(word) + ' (' + word + ')';

          // Compare this word against the active card's word.
          if (card.getWord() === word) {

            // CORRECT

            // Highlight the button w/ success.
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            btn.classList.add('btn-outline-success');

            // Depending on how well they did (warning, danger, success) throw up a toast message letting them know.
            var toastMsg = null;
            var toastType = null;
            if (cardBtn.classList.contains('btn-outline-warning')) {
              toastMsg = 'Ok';
              toastType = 'info';
            }
            else if (cardBtn.classList.contains('btn-outline-danger')) {
              toastMsg = 'Needs practice';
              toastType = 'info';
            }
            else {
              toastMsg = 'Correct!';
              toastType = 'success';
              cardBtn.classList.add('btn-outline-success');
            }
            game.toast(toastMsg, toastType);

            // Disable the placeholder buttons.
            game.disablePlaceholderButtons();

            game.setCurrentCard(null);

          }
          else {

            // WRONG

            // Remove primary from the button, and add danger.
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-danger');
            btn.classList.add('btn-outline-danger');

            // Remove the original outline from the card.
            cardBtn.classList.remove('btn-primary');

            // If this was their first error, add a warning to the button, otherwise add danger.
            if (cardBtn.classList.contains('btn-outline-warning')) {
              cardBtn.classList.remove('btn-outline-warning');
              cardBtn.classList.add('btn-outline-danger');
            }
            else { cardBtn.classList.add('btn-outline-warning'); }

          }

          // Play the sound of the word they chose.
          // TODO while the audio is loading, all other buttons should be disabled to prevent abuse. Add some event callbacks
//          var audio = new Audio(game.getWordSoundUrl(word));
//          audio.play();

        }, false);

      });

    });

    // RANDOM OBJECTS
    // Show the random objects as buttons, and attach click listeners to the buttons.
    game.display(game.getObjectsContainer(), game.buildRandomObjectButtons(), function() {

      var buttons = game.getRandomObjectButtons();

      buttons.forEach(function (btn) {

        var word = btn.getAttribute('data-word');
        var card = new Card(word);
        g.setCard(word, card);

        btn.addEventListener('click', function() {

          var btn = this;

          // Disable the button.
          btn.disabled = true;

          // Grab the word they chose.
          var word = btn.getAttribute('data-word');

          // If they already have a card flipped up, flip it down, re-enable it and reset its outlines.
          var currentCard = g.getCurrentCard();
          if (currentCard) {
            currentCard.flipFaceDown();
            var cardBtn = currentCard.getButton();
            cardBtn.disabled = false;
            cardBtn.classList.remove('btn-outline-primary');
            cardBtn.classList.add('btn-outline-secondary');
          }

          // Grab the card and flip it up.
          var card = game.getCard(word);
          card.flipFaceUp();

          g.resetPlaceholderButtonStyles();
//          g.removeOutlinesFromPlaceholderButtons();
          g.enablePlaceholderButtons();

          btn.classList.remove('btn-outline-secondary');
          btn.classList.add('btn-outline-primary');

          game.initPlaceholders(word);

        }, false);

      });

    });


//    var html =
//      '<h1>Objects</h1>' +
//      '<textarea>' + JSON.stringify(objects) + '</textarea>';

    // Set the game play container's html, show the container, and then start the game.
//    game.setContainerContent(html, function() {

//      game.showContainer();
//      game.start();

//    });

  }).catch((error) => {

    game.toast(error, 'danger');

  });

}
