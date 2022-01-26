<?php

  $buttons = [

    // BUILD
    'build' => [
      'path' => 'build',
      'text' => 'Build',
      'icon' => 'tools',
    ],

    // GAMES
    'games' => [
      'path' => 'games',
      'text' => 'Games',
      'icon' => 'gamepad',
    ],

    // APPS
    'apps' => [
      'path' => 'apps',
      'text' => 'Apps',
      'icon' => 'mobile-alt',
    ],

    // SITES
    'sites' => [
      'path' => 'sites',
      'text' => 'Sites',
      'icon' => NULL,
    ],

  ];

  // Use random globe icon for Sites button.
  $iconsForSitesBtn = [
    'africa',
    'americas',
    'asia',
    'europe',
  ];
  $randomIconsForSiteBtn = $iconsForSitesBtn[array_rand($iconsForSitesBtn, 1)];
  $buttons['sites']['icon'] = 'globe-' . $randomIconsForSiteBtn;

?>
<div class="bg-dark mb-3 mb-md-4">

  <div class="container">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <i class="fas fa-toolbox me-2 text-white"></i><a class="navbar-brand" href="<?php print $baseUrl; ?>/">MaltKit</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
          <?php foreach ($buttons as $key => $button) { ?>
            <li class="nav-item">
              <a class="nav-link <?php if ($button['path'] == mkArg(0)) { print 'active'; } ?>" href="<?php print $baseUrl . '/' . $button['path']; ?>">
                <i class="fas fa-<?php print $button['icon']; ?> me-2"></i><?php print $button['text']; ?>
              </a>
            </li>
          <?php } ?>
          </ul>
        </div>
      </div>
    </nav>

  </div>

</div>
