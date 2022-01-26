<div class="container mb-3">

  <!-- GAMES -->
  <h1 class="visually-hidden">Games</h1>
  <div class="row row-cols-1 row-cols-md-2 g-4">

    <?php foreach (mkGames() as $key => $game) { ?>
    <div class="col">
      <div class="card text-dark bg-light">
        <?php if (isset($game['slogan'])) { ?>
        <div class="card-header"><?php print $game['slogan']; ?></div>
        <?php } ?>
        <div class="card-body">
          <h3 class="card-title"><?php print $game['name']; ?></h3>
          <?php if (isset($game['slogan'])) { ?>
          <!--<h6 class="card-subtitle mb-2 text-muted"></h6>-->
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