Game.prototype.theNumberToLearnWidget = function() {
  return '<div id="numberToTranslate" class="mb-3"></div>';
};

Game.prototype.showRandomNumberToTranslate = function() {

  var numbers = this.getNumbers();
  var randomNumbers = this.getRandomNumbers();
  var randomNumber = game.chooseRandomNumber(randomNumbers);
  var translation = numbers[randomNumber];
  var div = game.get('#numberToTranslate');

  div.innerHTML =

    '<p class="text-center mb-2">What number is this?</p>' +

    '<h2 class="text-center mb-2 bg-light text-dark py-2">' + translation + '</h2>' +

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

      var audio = new Audio(game.getNumberSoundUrl());
      audio.play();

    });
  }, 1);

};

Game.prototype.questionBtnClickHandler = function() {

  game.tickScoreQuestions();

  game.playAudio('question');

  game.toast(game.getNumber(), 'secondary');

};
