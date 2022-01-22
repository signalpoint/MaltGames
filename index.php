<!doctype html>
<html lang="en">

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
        
        <!-- ColorPicker -->
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">ColorPicker</h3>
              <h6 class="card-subtitle mb-2 text-muted">Learn Color Names</h6>
              <p class="card-text">...</p>
              <a href="game.php?k=color-picker" class="card-link" title="Play ColorPicker">Play</a>
            </div>
          </div>
        </div>

        <!-- WordDash -->
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">WordDash</h3>
              <h6 class="card-subtitle mb-2 text-muted">Translation Race</h6>
              <p class="card-text">A race to translate as many words as you can.</p>
              <a href="games/word-dash" class="card-link" title="Play WordDash">Play</a>
            </div>
          </div>
        </div>
        
      </div>

    </div>

    <!-- Bootstrap JS -->
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

  </body>

</html>
