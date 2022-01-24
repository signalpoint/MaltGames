Game.prototype.theColorToLearnWidget = function() {
  return '<div id="colorToTranslate" class="mb-3"></div>';
};

Game.prototype.showRandomColorToTranslate = function() {

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

Game.prototype.questionBtnClickHandler = function() {

  game.tickScoreQuestions();

  game.playAudio('question');

  game.toast(game.getColor(), 'secondary');

};
