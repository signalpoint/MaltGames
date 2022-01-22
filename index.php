<!doctype html>
<html lang="en">
<?php

  require "src/common.inc";
  require "src/games.inc";

?>

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>MaltGames | Open Source Game Development</title>

    <!-- Bootstrap CSS -->
    <link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <script defer src="vendor/fontawesome-free-5.15.4-web/js/all.min.js"></script>

  </head>

  <body class="bg-dark text-white">

    <div class="container">

      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">

        <h1>MaltGames</h1>

      </header>

    </div>

    <div class="container">

      <!-- GAMES -->
      <h2 class="visually-hidden">Games</h2>
      <div class="row row-cols-1 row-cols-md-2 g-4 text-dark">

        <?php foreach (mkGames() as $key => $game) { ?>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title"><?php print $game['name']; ?></h3>
              <?php if (isset($game['slogan'])) { ?>
              <h6 class="card-subtitle mb-2 text-muted"><?php print $game['slogan']; ?></h6>
              <?php } ?>
              <?php if (isset($game['description'])) { ?>
              <p class="card-text"><?php print $game['description']; ?></p>
              <?php } ?>
              <a href="<?php print $game['url']; ?>" class="card-link" title="Play <?php print $game['name']; ?>">Play</a>
            </div>
          </div>
        </div>
        <?php } ?>

      </div>

    </div>

    <!-- Bootstrap JS -->
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

  </body>

</html>
