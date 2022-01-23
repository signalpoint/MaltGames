<!doctype html>
<html lang="en">

<?php

  require "src/common.inc";
  require "src/games.inc";

  $baseUrl =  mkBaseUrl();

  $key = mkArg(0);

  // TODO make sure there are enough args, throw error if not

  $game = mkGameLoad($key);
//  echo "<pre>" . print_r($game, TRUE) . "</pre>";

  // Game Development Kit JavaScipt Files...

    $headerJsFiles = [
      'game.js',
      'xhr.js',
      'api.js',
      'player.js',
      'toast-message.js',
      'chat.js',
      'message.js',
    ];

    $footerJsFiles = [
      'modal.js',
    ];

?>

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php print $game['name']; ?> | <?php print $game['slogan']; ?></title>

    <!-- Bootstrap CSS -->
    <link href="<?php print $baseUrl; ?>/vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <script defer src="<?php print $baseUrl; ?>/vendor/fontawesome-free-5.15.4-web/js/all.min.js"></script>

    <!-- Game Development Kit -->
    <?php foreach ($headerJsFiles as $headerJsFile) { ?>
      <script src="<?php print $baseUrl; ?>/gdk/<?php print $headerJsFile; ?>"></script>
    <?php } ?>

    <!-- Game -->
    <?php foreach ($game['src']['js'] as $gameJsFile) { ?>
      <script src="<?php print $baseUrl; ?>/games/<?php print $key; ?>/js/<?php print $gameJsFile; ?>"></script>
    <?php } ?>

  </head>

  <body onload="loadTheGame()">

    <!-- HEADER -->
    <div class="bg-dark">

      <div class="container">

        <nav class="navbar navbar-dark bg-dark">

          <!-- HOME -->
          <button class="btn btn-outline-secondary ms-0 ms-lg-3" type="button">
            <a href="<?php print $baseUrl; ?>" class="link-light" title="Back to Home">
              <i class="fas fa-home"></i><span class="d-none d-lg-inline ms-2">Home</span>
            </a>
          </button>

          <!-- BREADCRUMB -->
          <ol class="breadcrumb mt-3">
            <li class="breadcrumb-item active"><?php print $game['name']; ?></li>
          </ol>

          <!-- SETTINGS -->
          <button id="changeLanguageBtn" class="btn btn-outline-secondary me-0 me-lg-3 d-none" type="button">
            <a href="<?php print $game['url']; ?>" class="link-light" title="Change Language">
              <i class="fas fa-cog"></i><span class="d-none d-lg-inline ms-2">Language</span>
            </a>
          </button>

        </nav>

      </div>

    </div>

    <!-- LANGUAGE SELECTION -->
    <!-- TODO make this a widget in color-picker -->
    <div class="container d-none" id="gameLanguagesContainer">

      <div class="row">

        <div class="col">

          <h1 class="visually-hidden"><?php print $game['name']; ?></h1>

          <div class="alert alert-success mt-3" role="alert">
            Choose a language to play <strong><?php print $game['name']; ?></strong>!
          </div>

          <ul class="list-group">
            <li class="list-group-item">
              <a href="<?php print $game['url']; ?>/es" title="Learn Color Names in Spanish">Spanish</a>
            </li>
            <li class="list-group-item">
              <a href="<?php print $game['url']; ?>/vi" title="Learn Color Names in Vietnamese">Vietnamese</a>
            </li>
          </ul>

        </div>

      </div>

    </div>

    <!-- GAME CONTAINER -->
    <div class="container d-none" id="gameContainer"></div>

    <!-- FOOTER -->
<!--    <div class="bg-dark">-->

      <div class="container">

        <footer class="py-5">

          <div class="row">

            <div class="col-12 col-lg-3">

              <!-- TODO have it open in a modal, w/ quick tabs to move between files! so sweet! -->
              <!-- TODO better indentation when a folder is "opened" -->
              <h5 class="mb-3" title="Browse the source code for <?php print $game['name']; ?>">Source Code</h5>
              <h6>
                <a href="https://github.com/signalpoint/MaltGames/blob/main/games/<?php print $key; ?>" class="text-muted" target="_blank">
                  <i class="fas fa-folder me-2"></i><?php print $key; ?>
                </a>
              </h6>
              <ul class="nav flex-column">
                <?php foreach($game['src']['js'] as $jsFile) { ?>
                <li class="nav-item mb-2 ms-2">
                  <a href="https://github.com/signalpoint/MaltGames/blob/main/games/<?php print $key; ?>/js/<?php print $jsFile; ?>" class="nav-link p-0 text-muted" target="_blank">
                    <i class="fab fa-js-square me-2 text-sm"></i><?php print $jsFile; ?>
                  </a>
                </li>
                <?php } ?>
              </ul>

            </div>

            <div class="col-12 col-lg-3">
              <h5>Docs</h5>
              <ul class="nav flex-column">
                <!--<li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>-->
              </ul>
            </div>

            <div class="col-12 col-lg-3">
              <h5>API</h5>
              <ul class="nav flex-column">
                <!--<li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>-->
              </ul>
            </div>

            <div class="col-12 col-lg-3">
              <h5>About</h5>
              <ul class="nav flex-column">
                <!--<li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>-->
              </ul>
            </div>

          </div>

          <div class="d-flex justify-content-between py-4 my-4 border-top">

            <p>
              <a href="/" class="mb-3 me-1 mb-md-0 text-muted text-decoration-none lh-1">
                <i class="fas fa-toolbox"></i>
              </a>
              <span class="text-muted">
                <a href="<?php print $baseUrl; ?>" title="Powered by MaltKit">MaltKit</a> | Mobile App Language Toolkit
              </span>
              <!--Modern Application Learning Technology-->
              <!--Mobile App Language Toolkit-->
              <!--Modern App Language Toolkit-->
            </p>

            <ul class="list-unstyled d-flex">
              <li class="ms-3"><a class="link-dark" href="https://www.facebook.com/MaltKit"><i class="fab fa-facebook"></i></a></li>
              <li class="ms-3"><a class="link-dark" href="https://twitter.com/TheMaltKit"><i class="fab fa-twitter"></i></a></li>
              <li class="ms-3"><a class="link-dark" href="https://www.youtube.com/channel/UCER1oQBRQSZsuS1qtWQwsbQ"><i class="fab fa-youtube"></i></a></li>
              <li class="ms-3"><a class="link-dark" href="https://www.reddit.com/r/MaltKit/"><i class="fab fa-reddit"></i></a></li>
              <li class="ms-3"><a class="link-dark" href="https://www.instagram.com/themaltkit/"><i class="fab fa-instagram"></i></a></li>
              <li class="ms-3"><a class="link-dark" href="https://www.pinterest.com/themaltkit"><i class="fab fa-pinterest"></i></a></li>
              <li class="ms-3"><a class="link-dark" href="https://github.com/signalpoint/MaltGames"><i class="fab fa-github"></i></a></li>
            </ul>

          </div>

        </footer>

      </div>

<!--    </div>-->

    <!-- TOAST -->
    <div class="toast-container position-absolute p-3 bottom-0 start-50 translate-middle-x" id="toastPlacement" data-original-class="toast-container position-absolute p-3">
    <div id="liveToast" class="toast align-items-center text-white border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body"></div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    </div>

    <!-- MODAL -->
    <div class="modal fade text-dark" id="gameModal" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="gameModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer d-none">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="<?php print $baseUrl; ?>/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Game Development Kit (late loads) -->
    <?php foreach ($footerJsFiles as $footerJsFile) { ?>
      <script src="<?php print $baseUrl; ?>/gdk/<?php print $footerJsFile; ?>"></script>
    <?php } ?>

  </body>

</html>
