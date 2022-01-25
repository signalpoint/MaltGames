<!doctype html>
<html lang="en">
<?php

  use MaltGames\Site;
  use MaltGames\Page;

  require 'vendor/autoload.php';

  require "src/common.inc";
  require "src/pages.inc";
  require "src/games.inc"; // TODO might not be needed here anymore

  $baseUrl = mkBaseUrl();

  $site = new Site();

  // Create default page template.
  $site->setPageTemplate('default', [
    'head' => [
      'title' => 'MaltKit',
      'description' => 'My MaltKit page page description.',
      'metas' => [
        [
          'charset' => 'utf-8',
        ],
        [
          'name' => 'viewport',
          'content' => 'width=device-width, initial-scale=1',
        ],
      ],
      'scripts' => [ // Make our prototype friendly though, page->addJs();

        // Font Awesome
        [
//          'defer' => NULL, // TODO this ends up as defer="", instead of just, defer
          'src' => $baseUrl . '/vendor/fontawesome-free-5.15.4-web/js/all.min.js',
        ],

      ],
      'links' => [ // Make our prototype friendly though, page->addCss();

        // Bootstrap CSS
        [
          'href' => $baseUrl . '/vendor/twbs/bootstrap/dist/css/bootstrap.min.css',
          'rel' => 'stylesheet'
        ],

      ],
    ],
    'body' => [
//      'content' => [], // We'll leave this empty here, and let the page builder decide!
      'scripts' => [

        // Bootstrap JS
        [
          'src' => $baseUrl . '/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js',
        ],

      ],
    ],
  ]);

  // Add pages to site.
  $site->addPages([

    // HOME PAGE
    'home' => [

      'head' => [
        'title' => 'MaltKit | Mobile App Language Toolkit',
        'metas' => [
          [
            'name' => 'description',
            'content' => 'Home page description...',
          ]
        ],
        'scripts' => [],
        'links' => [],
      ],
      'body' => [
        'file' => 'site/pages/home/home.tpl.php',
        'content' => [],
        'scripts' => [],
      ],

    ],

    // BUILD PAGE
    'build' => [

      'head' => [
        'title' => 'MaltKit | Build',
        'metas' => [
          [
            'name' => 'description',
            'content' => 'Build page description...',
          ]
        ],
        'scripts' => [],
        'links' => [],
      ],
      'body' => [
        'file' => 'site/pages/build/build.tpl.php',
        'content' => [],
        'scripts' => [],
      ],

    ],

    // GAMES PAGE
    'games' => [

      'head' => [
        'title' => 'MaltKit | Games',
        'metas' => [
          [
            'name' => 'description',
            'content' => 'Free Games, Learn Languages, Learn to Code with MaltKit',
          ]
        ],
        'scripts' => [],
        'links' => [],
      ],
      'body' => [
        'file' => 'site/pages/games/games.tpl.php',
        'content' => [],
        'scripts' => [],
      ],

    ],

    // TODO need a way to pre and/or post process a page, that way a page can
    // easily be tinkered with programmatically before its rendered. For
    // example, being able to set the <title></title> on a per game basic will
    // be critical.

    // GAME PAGE
    'game' => [

      'head' => [
        'title' => 'MaltKit | Game', // $game['name'] | $game['slogan']
        'metas' => [
          [
            'name' => 'description',
            'content' => 'Game description',
          ]
        ],
        'scripts' => [

          // Game Development Kit
          $baseUrl . '/gdk/game.js',
          $baseUrl . '/gdk/xhr.js',
          $baseUrl . '/gdk/api.js',
          $baseUrl . '/gdk/player.js',
          $baseUrl . '/gdk/toast-message.js',
          $baseUrl . '/gdk/chat.js',
          $baseUrl . '/gdk/message.js',

          // Game Source Code
          // @see gamePageControllerPreProcess

        ],
        'links' => [],
      ],

      'body' => [

        'file' => 'site/pages/game/game.tpl.php',
        'attributes' => [
          'onload' => 'loadTheGame()',
        ],
        'content' => [],
        'scripts' => [],
      ],

      'controller' => [

        // TODO likely turn this into a PageController class, le sigh
        'file' => 'site/pages/game/game.controller.php',
        'load' => 'gamePageControllerLoad',
        'preProcess' => 'gamePageControllerPreProcess',

      ],

    ],

  ]);


  $pageId = mkArg(0);
  if (!$pageId) { $pageId = 'home'; }

  $page = $site->loadPage($pageId);
  if (!$page) {
    // TODO load up a "404" page, so it can run through the engine below.
    echo "404 - Not Found";
    return;

  }

  $defaultPageTemplate = $site->getPageTemplate('default');

  // Page template metas, scripts, and links should be added to the front of
  // their respective arrays.

  // If the title was empty, use the default page title.
  if ($page->getTitle() === '') {
    $page->setTitle($defaultPageTemplate['head']['title']);
  }

  // Add the scripts, metas and links from the default page's head to the
  // loaded page.
  $types = [
    'metas',
    'scripts',
    'links',
  ];
  foreach ($types as $type) {
    $items = $defaultPageTemplate['head'][$type];
    if (count($items)) {
      switch ($type) {
        case 'metas':
          $page->addMetaTagsAtFront($items);
          break;
        case 'scripts':
          $page->addScriptsAtFront($items);
          break;
        case 'links':
          $page->addLinksAtFront($items);
          break;
      }
    }
  }


  // Add the scripts from the default page's body to the loaded page.
  $types = [
//    'content',
    'scripts',
  ];
  foreach ($types as $type) {
    if (!isset($defaultPageTemplate['body'][$type])) { continue; }
    $items = $defaultPageTemplate['body'][$type];
    if (count($items)) {
      switch ($type) {
        case 'content':
//            $page->addMultipleContent($items);
          break;
        case 'scripts':
          $page->addBottomScripts($items);
          break;
      }
    }
  }

  // CONTROLLER

  // Is their a controller for this page?
  if ($page->hasController()) {

    // TODO: turn this into a PageController class, right?
    $controller = $page->getController();

    $file = $page->getControllerFile();
    if ($file) {
      require $file;
    }

    $load = $page->getControllerLoad();
    if ($load) {
      $page->setControllerData($load($page));
    }

    $preProcess = $page->getControllerPreProcess();
    if ($preProcess) {
      $preProcess($page);
    }

  }

//  mkDump($page->getBottomScripts());

?>

  <head>

    <?php
      // META TAGS
      $metaTags = $page->getMetas();
      if ($metaTags) { foreach ($metaTags as $meta) {
    ?>
    <meta <?php print mkAttributes($meta); ?>>
    <?php } } ?>

    <title><?php print $page->getTitle(); ?></title>

    <?php
      // SCRIPTS
      $scripts = $page->getScripts();
      if ($scripts) { foreach ($scripts as $script) {
    ?>
    <script <?php print is_array($script) ? mkAttributes($script) : 'src="' . $script . '"'; ?>></script>
    <?php } } ?>

    <?php
      // CSS
      $links = $page->getLinks();
      if ($links) { foreach ($links as $link) {
    ?>
    <link <?php print mkAttributes($link); ?>>
    <?php } } ?>

  </head>

  <!-- TODO need body attributes capabilities -->
  <body<?php print $page->hasBodyAttributes() ? mkAttributes($page->getBodyAttributes()) : ''?>>

    <?php
      // CONTENT
    ?>

    <!-- HEADER -->
    <?php require "src/html/header.inc"; ?>

    <?php require $page->getBodyFilePath(); ?>

    <!-- FOOTER -->
    <?php require "src/html/footer.inc"; ?>

    <?php
      // BOTTOM SCRIPTS
      $bottomScripts = $page->getBottomScripts();
      if ($bottomScripts) { foreach ($bottomScripts as $script) {
    ?>
    <script <?php print is_array($script) ? mkAttributes($script) : 'src="' . $script . '"'; ?>></script>
    <?php } } ?>

  </body>

</html>
