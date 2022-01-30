<?php

  $buttons = [

    // DOCS
    'docs' => [
      'path' => 'docs',
      'text' => 'Docs',
      'icon' => 'book',
      'attributes' => [
        'title' => 'View the MaltKit Documentation',
      ],
    ],

    // BUILD
//    'build' => [
//      'path' => 'build',
//      'text' => 'Build',
//      'icon' => 'tools',
//      'attributes' => [
//        'title' => 'Build with MaltKit',
//      ],
//    ],

    // SITES
    'sites' => [
      'path' => 'sites',
      'text' => 'Sites',
      'icon' => NULL,
    ],

    // GAMES
    'games' => [
      'path' => 'games',
      'text' => 'Games',
      'icon' => 'gamepad',
      'attributes' => [
        'title' => 'Play Games Built with MaltKit',
      ],
    ],

    // APPS
    'apps' => [
      'path' => 'apps',
      'text' => 'Apps',
      'icon' => 'mobile-alt',
    ],

    // MUSIC
//    'music' => [
//      'path' => 'music',
//      'text' => 'Music',
//      'icon' => 'music',
//    ],

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
          <?php
            $defaultBtnAttrs = [
              'class' => ['nav-link'],
              'href' => $baseUrl . '/' . $button['path'],
            ];
            if (explode('/', $button['path'])[0] === mkArg(0)) {
              $defaultBtnAttrs['class'][] = 'active';
            }
            $button['attributes'] = isset($button['attributes']) ?
              array_merge($defaultBtnAttrs, $button['attributes']) : $defaultBtnAttrs;
          ?>
            <li class="nav-item">
              <a <?php print mkAttributes($button['attributes']); ?>>
                <?php if (isset($button['icon']) && $button['icon']) { ?>
                  <i class="fas fa-<?php print $button['icon']; ?> me-2"></i>
                <?php }?>
                <?php print $button['text']; ?>
              </a>
            </li>
          <?php } ?>
          </ul>
        </div>
      </div>
    </nav>

  </div>

</div>
