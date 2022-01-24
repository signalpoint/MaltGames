Game.prototype.scoreBoardWidget = function() {
  var html =
    '<div class="clearfix">' +
      '<h3 class="float-lg-end">Score Board</h3>' +
    '</div>' +
    '<ul class="list-group">' +

      // Correct
      '<li class="list-group-item d-flex justify-content-between align-items-start">' +
        '<div class="ms-2 me-auto">' +
          '<div class="fw-bold">Correct</div>' +
          'Number of colors answered correctly.' +
        '</div>' +
        '<span id="scoreCorrectSpan" class="badge bg-success rounded-pill">' + game.getScoreCorrect() + '</span>' +
      '</li>' +

      // Incorrect
      '<li class="list-group-item d-flex justify-content-between align-items-start">' +
        '<div class="ms-2 me-auto">' +
          '<div class="fw-bold">Incorrect</div>' +
          'Number of colors answered incorrectly.' +
        '</div>' +
        '<span id="scoreIncorrectSpan" class="badge bg-danger rounded-pill">' + game.getScoreIncorrect() + '</span>' +
      '</li>' +

      // Listens
      '<li class="list-group-item d-flex justify-content-between align-items-start">' +
        '<div class="ms-2 me-auto">' +
          '<div class="fw-bold">Listens</div>' +
          'Number of pronunciations listened to.' +
        '</div>' +
        '<span id="scoreListensSpan" class="badge bg-primary rounded-pill">' + game.getScoreListens() + '</span>' +
      '</li>' +

      // Questions
      '<li class="list-group-item d-flex justify-content-between align-items-start">' +
        '<div class="ms-2 me-auto">' +
          '<div class="fw-bold">Questions</div>' +
          'The number of questions you asked.' +
        '</div>' +
        '<span id="scoreQuestionsSpan" class="badge bg-secondary rounded-pill">' + game.getScoreQuestions() + '</span>' +
      '</li>' +

    '</ul>';
  return html;
};

Game.prototype.scoreBoardRefresh = function() {
  game.get('#scoreCorrectSpan').innerHTML = game.getScoreCorrect();
  game.get('#scoreIncorrectSpan').innerHTML = game.getScoreIncorrect();
  game.get('#scoreListensSpan').innerHTML = game.getScoreListens();
  game.get('#scoreQuestionsSpan').innerHTML = game.getScoreQuestions();
};
