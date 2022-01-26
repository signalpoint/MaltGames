var game = null; // The Game object.

function loadTheGame() {

  // Initialize the game.
  game = new Game('example');
  game.setVersion('0.0.0');

  // Get stuff from the server...
  game.apiGet('hello').then((stuff) => {

    var html =
      '<h1>Stuff</h1>' +
      '<textarea>' + JSON.stringify(stuff) + '</textarea>';

    // Set the game play container's html, show the container, and then start the game.
    game.setContainerContent(html, function() {
      game.showContainer();
//      game.start();
    });

  }).catch((error) => {

    game.toast(error, 'danger');

  });

}
