<?php

namespace MaltKit;

use MaltKit\Theme;

class Example extends Theme {

  public function __construct($id, $theme) {

    $this->namespace = 'MaltKit';
    $this->class = 'Example';
    $this->name = 'Example Theme';
    $this->path = 'site/themes/Example';
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

          ],
        ],
        // </head>

        // <body>
        'body' => [
          'scripts' => [

          ],
        ],
        // </body>

      ], // default

    ];
  }

}
