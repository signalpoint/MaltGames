Game.prototype.init = function() {

  g = this;

  g._icons = null;
  g._words = null;
  g._randomObjects = null;
  g._cards = {};
  g._currentCard = null;

  g.getIcons = function() { return this._icons; };
  g.setIcons = function(icons) { this._icons = icons; };
  g.getIcon = function(word) {
    var icon = this.getIcons()[word];
    return icon === 0 ? word : icon;
  };

  g.getWords = function() { return this._words; };
  g.setWords = function(words) { this._words = words; };
  g.getWord = function(word) { return this.getWords()[word]; };

  g.getRandomObjects = function() { return this._randomObjects; };
  g.setRandomObjects = function(objects) { this._randomObjects = objects; };

  g.getCards = function() { return this._cards; };
  g.setCard = function(word, card) { this.getCards()[word] = card; };
  g.getCard = function(word) { return this.getCards()[word]; };

  g.getCurrentCard = function() { return this._currentCard; };
  g.setCurrentCard = function(card) { this._currentCard = card; };

  g.getPlaceholdersContainerId = function() { return 'randomWordsContainer'; };
  g.getPlaceholdersContainer = function() { return this.get('#' + this.getPlaceholdersContainerId()); };
  g.getPlaceholderButtons = function() { return this.getPlaceholdersContainer().querySelectorAll('button'); };
  g.getPlaceholderButton = function(word) {
    return this.getPlaceholdersContainer().querySelectorAll('button[data-word="' + word + '"]');
  };
  g.enablePlaceholderButtons = function() {
    this.getPlaceholderButtons().forEach(function (btn) {
      btn.disabled = false;
    });
  };
  g.disablePlaceholderButtons = function() {
    this.getPlaceholderButtons().forEach(function (btn) {
      btn.disabled = true;
    });
  };
  g.removeOutlinesFromPlaceholderButtons = function() {
    this.getPlaceholderButtons().forEach(function (btn) {
      g.removeOutlinesFromPlaceholderButton(btn);
    });
  };
  g.removeOutlinesFromPlaceholderButton = function(btn) {
    [
      'btn-outline-primary',
      'btn-outline-success',
      'btn-outline-danger'
    ].forEach(function (className) {
      if (btn.classList.contains(className)) {
        btn.classList.remove(className);
      }
    });
  };
  g.resetPlaceholderButtonStyles = function() {
    this.getPlaceholderButtons().forEach(function (btn) {
      g.resetPlaceholderButtonStyle(btn);
    });
  };
  g.resetPlaceholderButtonStyle = function(btn) {
    [
      'btn-primary',
      'btn-success',
      'btn-danger',
      'btn-outline-primary',
      'btn-outline-success',
      'btn-outline-danger'
    ].forEach(function (className) {
      if (btn.classList.contains(className)) {
        btn.classList.remove(className);
      }
    });
    btn.classList.add('btn-primary');
  };

  g.getObjectsContainerId = function() { return 'randomObjectsContainer'; };
  g.getObjectsContainer = function() { return this.get('#' + this.getObjectsContainerId()); };

  g.generateRandomObjects = function() {
    var icons = this.getIcons();
    var _randomIcons = cloneAndShuffleObject(icons);
    var randomObjects = [];
    for (const [word, icon] of Object.entries(_randomIcons)) {
      randomObjects.push(word);
    }
    this.setRandomObjects(randomObjects);
  };

  g.buildRandomObjectButtons = function() {

    var icons = this.getIcons();
//    console.log('icons', icons);

    var randomObjects = this.getRandomObjects();
//    console.log('randomObjects', randomObjects);

    var html = '';

    randomObjects.forEach(function (word) {
      html +=
        '<button type="button" class="btn btn-outline-secondary btn-lg m-3" data-word="' + word + '">&nbsp;</button>';
    });

    return html;

  };

  g.getRandomObjectButtons = function() {
    var container = this.getObjectsContainer();
    return container.querySelectorAll('button');
  };

  g.getRandomObjectButtonEl = function(word) {
    return this.getObjectsContainer().querySelector('button[data-word="' + word + '"]');
  };

  g.initPlaceholders = function(word) {

    var placeholderButtons = this.getPlaceholderButtons();
    var wordsToShow = placeholderButtons.length;

    // Assemble some random words to choose from...
    var randomWords = [word];
    while (true) {

      // Grab a random word from the icon map.
      var randomWord = getRandomProperty(g.getIcons());

      // Add the word to the random word collection, if it isn't already in there.
      // When we have enough random words to show, break out.
      if (!randomWords.includes(randomWord)) {
        randomWords.push(randomWord);
        if (randomWords.length === wordsToShow) {
          break;
        }
      }

      // Loop back and grab another random word...

    }
    shuffleArray(randomWords);

    placeholderButtons.forEach(function (btn) {
      var randomWord = randomWords.shift();
      btn.innerHTML = g.getWord(randomWord);
      btn.setAttribute('data-word', randomWord);
    });

  };

  g.resetPlaceholders = function() {

    // For each placeholder button...
    var buttons = this.getPlaceholderButtons();
    buttons.forEach(function (btn) {

      // Re-enable it.
      btn.disabled = false;

      // Clear the text.
      btn.innerHTML = '<i class="fas fa-question"></i>';

      // Remove the outline.
      g.removeOutlinesFromPlaceholderButton(btn);

    });

  };

  g.getWordSoundUrl = function(word) {
    return this.getUrl() + '/api/' + g.getKey() + '/sound/' + g.getLanguage() + '/' + word;
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
