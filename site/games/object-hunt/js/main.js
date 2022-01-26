var game = null; // The Game object.

function loadTheGame() {

  // Initialize the game.
  game = new Game('object-hunt');
  game.setVersion('0.0.0');

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

            // Highlight the button and the card's buttons w/ success.
            btn.classList.add('btn-outline-success');
            cardBtn.classList.add('btn-outline-success');


            game.toast('Correct!', 'success');

//            game.resetPlaceholders();
            game.disablePlaceholderButtons();

          }
          else {

            // WRONG

            btn.classList.add('btn-outline-danger');


          }

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
          btn.disabled = true;
          var word = btn.getAttribute('data-word');
          var card = game.getCard(word);
          card.flipFaceUp();
          g.removeOutlinesFromPlaceholderButtons();
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
