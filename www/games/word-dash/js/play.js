/**
 * Picks a random Vietnamese word from the dictionary and places it in its textfield.
 * @returns {undefined}
 */
function setRandomVietnameseWord() {

  // Pick a random english word from the dictionary.
  while (true) {
    var newWord = randomProperty(dict);
    if (newWord !== en) {
      en = newWord;
      break;
    }
  }

  // Set the English word and its translation aside.
  en = randomProperty(dict);
  vi = dict[en];

  // Place the Vietnamese word in its text field.
  vInput.value = dict[en];

}

/**
 * Get the number of words in the dictionary.
 * @returns {Number}
 */
function numberOfWords() {
  var c = 0;
  for (var eWord in dict) {
    if (!dict.hasOwnProperty(eWord)) { continue; }
    c++;
  }
  return c;
}

/**
 * Shows the user how many wods are in the dictionary.
 */
function refreshWordCount() {
  var c = numberOfWords();
  setVMsg(c !== 1 ? (c + ' words left.') : (c + ' word left.'));
}

/**
 * Clears the user's input on the English text field.
 */
function clearEnglishWord() {
  eInput.value = '';
}

// @see https://stackoverflow.com/a/15106541/763010
function randomProperty(obj) {
  var keys = Object.keys(obj);
  return keys[ keys.length * Math.random() << 0];
};

/**
 * Handles the "key up" event on the English text field.
 * @param {type} input
 */
function englishInputOnKeyUp(input) {

  // If the answer is correct...
  if (checkAnswer()) {

    input.disabled = true;

    // Remove the "help text" from the English text field.
    eInput.setAttribute('placeholder', '');

    // Tell the server.
    game.send({
      op: 'correctAnswer'
    });

  }

}

/**
 * Get the English answer.
 * @returns {String}
 */
function getAnswer() {
  return eInput.value.toLowerCase().trim();
}

/**
 * Checks to see if the user properly translated the Vietnamese word to English.
 * @returns {Boolean}
 */
function checkAnswer() {
  var answer = getAnswer();
  return dict[answer] && dict[answer] === vi;
}

/**
 * Places a message next to the Vietnamese text field.
 * @param {type} msg
 */
function setVMsg(msg) {
  document.getElementById('vInputMsg').innerHTML = msg;
}

/**
 * Removes a word (and its translation) from the dictionary.
 * @param {type} eWord
 */
function removeWord(eWord) {
  delete dict[eWord];
}
