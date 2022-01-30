<div class="container border-top pt-3 mt-md-5"><footer>

  <div class="row">

    <!-- GET STARTED -->
    <div class="col-12 col-lg-3">

      <?php

      // If we're looking at a game, show the source code widget. Otherwise...
      if (mkArg(1) === 'game') {

//        require "game-source-code.inc";

      }
      else { ?>

      <h5>...</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">...</a></li>
      </ul>

      <?php }

      ?>

    </div>

    <div class="col-12 col-lg-3">
      <h5>...</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">...</a></li>
      </ul>
    </div>

    <div class="col-12 col-lg-3">
      <h5>...</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">...</a></li>
      </ul>
    </div>

    <!-- ABOUT -->
    <div class="col-12 col-lg-3">
      <h5>About</h5>
      <ul class="nav flex-column">

        <!-- Contact -->
        <li class="nav-item mb-2">
          <a href="<?php print $baseUrl; ?>/contact" class="nav-link p-0 text-muted" title="Contact information for MaltKit">Contact</a>
        </li>

        <!-- Privacy -->
        <li class="nav-item mb-2">
          <a href="<?php print $baseUrl; ?>/privacy" class="nav-link p-0 text-muted">Privacy Policy</a>
        </li>

        <!-- Terms -->
        <li class="nav-item mb-2">
          <a href="<?php print $baseUrl; ?>/terms" class="nav-link p-0 text-muted">Terms & Conditions</a>
        </li>

      </ul>
    </div>

  </div>

  <div class="d-flex justify-content-between py-4 my-4 border-top">

    <!-- SLOGAN -->
    <?php
      // TODO sort by favorite
      $slogans = [
        'Mobile App Language Toolkit',
        'Mobile App Languages Toolkit',
        'Mobile App Learning Toolkit',
        'Mobile App Learning Technology',
        'Modern App Language Toolkit',
        'Modern App Languages Toolkit',
        'Modern Application Language Toolkit',
        'Modern Application Languages Toolkit',
        'Modern Application Learning Technology Kit',
        'Modern Application Learning & Teaching Kit',
        'Modern App Launch Toolkit',
        'Mini App Launch Toolkit',
//        'Marijuana and Love, Technology Kit', // TODO April 20th only.
      ];
      $randomSlogan = $slogans[array_rand($slogans, 1)];
    ?>
    <p>
      <span class="text-muted">
        <a href="<?php print $baseUrl; ?>" title="Powered by MaltKit">MaltKit</a> | <?php print $randomSlogan; ?>
      </span>
    </p>

    <!-- SOCIAL -->
    <ul class="list-unstyled d-flex">
      <?php foreach (mkSocialNetworks() as $name => $item) { ?>
      <li class="ms-3">
        <a class="link-dark" href="<?php print $item['url']; ?>" title="<?php print $item['title']; ?>" target="_blank">
          <i class="fab fa-<?php print $name; ?>"></i>
        </a>
      </li>
      <?php } ?>
    </ul>

  </div>

</footer></div>
