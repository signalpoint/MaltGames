<?php

namespace MaltKit;

use MaltKit\Theme;

class Boots extends Theme {

  public function __construct($id, $theme) {

    $this->namespace = 'MaltKit';
    $this->class = 'Boots';
    $this->name = 'Boots Theme';
    $this->path = 'site/themes/Boots';
    $this->description = 'The Bootstrap 5 Theme for MaltKit.';

    parent::__construct($id, $theme);

  }

  public function regions() {
    $themeFolder = $this->getPath();
    return [
      'header' => [
        'file' => $themeFolder. '/regions/site/header.inc',
      ],
      'content' => [
        'file' => $themeFolder. '/regions/site/content.inc',
      ],
      'footer' => [
        'file' => $themeFolder. '/regions/site/footer.inc',
      ],
    ];
  }

  public function pageTemplates() {
    $baseUrl = $GLOBALS['site']->getBaseUrl();
    return [

      // Default
      'default' => [

        // <head>
        'head' => [
          'title' => 'MaltKit',
          'metas' => [
            [
              'charset' => 'utf-8',
            ],
            [
              'name' => 'viewport',
              'content' => 'width=device-width, initial-scale=1',
            ],
          ],
          'scripts' => [

            // Font Awesome
            [
              //'defer' => NULL, // TODO this ends up as defer="", instead of just, defer
              'src' => $baseUrl . '/vendor/fontawesome-free-5.15.4-web/js/all.min.js',
            ],

          ],
          'links' => [

            // Bootstrap CSS
            [
              'href' => $baseUrl . '/vendor/twbs/bootstrap/dist/css/bootstrap.min.css',
              'rel' => 'stylesheet'
            ],

            // Theme CSS
            [
              'href' => $baseUrl . '/site/themes/Boots/css/bs.css',
              'rel' => 'stylesheet'
            ],

          ],
        ],
        // </head>

        // <body>
        'body' => [
          'scripts' => [

            // Bootstrap JS
            [
              'src' => $baseUrl . '/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js',
            ],

          ],
        ],
        // </body>

      ], // default

    ];
  }

  public function contentTemplates() {
    $themeFolder = $this->getPath();
    return [

      'docs' => [
        'file' => $themeFolder . '/contentTemplates/docs.tpl.php',
      ],

    ];
  }


}
