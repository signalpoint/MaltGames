<?php

namespace MaltKit;

use MaltKit\Theme;

class Fruits extends Theme {

  public function __construct($id, $theme) {

    $this->namespace = 'MaltKit';
    $this->class = 'Fruits';
    $this->name = 'Fruits Theme';
    $this->path = 'site/themes/Fruits';
    $this->description = 'The Foundation 6 Theme for MaltKit.';

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

          ],
          'links' => [

            // Fruitstrap CSS
            [
              'href' => $baseUrl . '/vendor/twbs/fruitstrap/dist/css/fruitstrap.min.css',
              'rel' => 'stylesheet'
            ],

            // Theme CSS
            [
              'href' => $baseUrl . '/site/themes/Fruits/css/bs.css',
              'rel' => 'stylesheet'
            ],

          ],
        ],
        // </head>

        // <body>
        'body' => [
          'scripts' => [

            // Fruitstrap JS
            [
              'src' => $baseUrl . '/vendor/twbs/fruitstrap/dist/js/fruitstrap.bundle.min.js',
            ],

          ],
        ],
        // </body>

      ], // default

    ];
  }


}
