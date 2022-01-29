<div class="container mb-3">

  <!-- GAMES -->
  <h1 class="visually-hidden">Games</h1>
  <div class="row row-cols-1 row-cols-md-2 g-4">

    <?php foreach (mkGames() as $key => $game) { ?>
    <?php
      $game = mkGameLoad($key);
      $hasSlogan = !!$game->getSlogan();
      $hasDescription = !!$game->getDescription();
    ?>
    <div class="col">
      <div class="card text-dark bg-light">
        <?php if ($hasSlogan) { ?>
        <div class="card-header"><?php print $game->getSlogan(); ?></div>
        <?php } ?>
        <div class="card-body">
          <h3 class="card-title"><?php print $game->getName(); ?></h3>
          <?php if ($hasDescription) { ?>
          <p class="card-text"><?php print $game->getDescription(); ?></p>
          <?php } ?>
          <a href="<?php print $game->getUrl(); ?>" class="card-link" title="Play <?php print $game->getName(); ?>">Play</a>
        </div>
      </div>
    </div>
    <?php } ?>

  </div>

</div>