<!doctype html>
<html lang="en">
<?php

  use MaltKit\Site;

  require 'vendor/autoload.php';

  include 'site/config/site.config.php';

  require "core/common.inc";


  // VARIABLES
  // TODO using generic variable names at the global level is bad. Anybody that
  // uses e.g. $page = $foo, the whole $page object is wiped out below.

  $baseUrl = mkBaseUrl();
  $currentPath = mkPath();

  // CONFIG

  $config = mkSiteConfig();

  // SITE

  $site = new Site($config);

  // MODS

  // If the Site config has mods, initialize them.
  if (isset($config['mods'])) {
    $site->initMods($config['mods']);
  }

  // THEMES

  // If the site config has themes, initialize them.
  if (isset($config['themes'])) {
    $site->initThemes($config['themes']);
  }

  // CURRENT THEME

  // With the theme name from the config, get the Theme from the Site, then
  // set it as the current Theme on the Site.
  $themeId = $config['theme'];
  $theme = $site->getTheme($themeId);
  $site->setCurrentTheme($theme);

  // ROUTE

  // Determine the current route.
  $route = $site->determineCurrentRoute();

  // 404 | TODO load up a "404" page, so it can run through the engine below.
  if (!$route) {
    echo "404 - Not Found";
    return;
  }

  // If the Route has any "require" files, load them.
  if ($route->hasRequire()) {
    $route->loadRequire();
  }

  // PAGE

  // Get the Page from the Route.
  $page = $route->getPage();

  // Get the Theme's default page template.
  $defaultPageTemplate = $theme->getPageTemplate('default');

  // If the title was empty, use the default page title.
  if ($page->getTitle() === '') {
    $page->setTitle($defaultPageTemplate['head']['title']);
  }

  // <head> : meta, script, link
  // Add the scripts, metas and links from the default page's head to the
  // loaded page.
  foreach ([
    'metas',
    'scripts',
    'links',
  ] as $type) {
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

  // <body> : script
  // Add the scripts from the default page's body to the loaded page.
  foreach ([
    'scripts',
  ] as $type) {
    if (!isset($defaultPageTemplate['body'][$type])) { continue; }
    $items = $defaultPageTemplate['body'][$type];
    if (count($items)) {
      switch ($type) {
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

//  mkDump($site->getMods());
//  mkDump($site->getRoutes());
//  mkDump($theme);
//  mkDump($page);

?>

  <head>

    <?php // META TAGS

      $metaTags = $page->getMetas();
      if ($metaTags) {
        foreach ($metaTags as $meta) {

    ?>
    <meta <?php print mkAttributes($meta); ?>>
    <?php

        }
      }

    ?>

    <title><?php print $page->getTitle(); ?></title>

    <?php // SCRIPTS

      $scripts = $page->getScripts();
      if ($scripts) {
        foreach ($scripts as $script) {

    ?>
    <script <?php print is_array($script) ? mkAttributes($script) : 'src="' . $script . '"'; ?>></script>
    <?php

        }
      }

    ?>

    <?php // LINKS

      $links = $page->getLinks();
      if ($links) {
        foreach ($links as $link) {

    ?>
    <link <?php print mkAttributes($link); ?>>
    <?php

        }
      }

    ?>

  </head>

  <body<?php print $page->hasBodyAttributes() ? mkAttributes($page->getBodyAttributes()) : ''?>>

    <?php // REGIONS

    foreach ($theme->getRegions() as $region) {
      include $region['file'];
    }

    ?>

    <?php // BOTTOM SCRIPTS

      // TODO rename to getBodyScripts()
      $bottomScripts = $page->getBottomScripts();
      if ($bottomScripts) {
        foreach ($bottomScripts as $script) {

    ?>
    <script <?php print is_array($script) ? mkAttributes($script) : 'src="' . $script . '"'; ?>></script>
    <?php

        }
      }

    ?>

  </body>

</html>
