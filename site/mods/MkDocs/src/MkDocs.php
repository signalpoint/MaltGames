<?php

namespace MaltKit;

use MaltKit\Mod;

class MkDocs extends Mod {

  public function __construct($id, $mod) {

    $this->name = 'MaltKit Docs';
    $this->path = 'site/mods/MkDocs';
    $this->description = 'The MaltKit Docs Mod.';
    $this->files = [
      'site/mods/MkDocs/mkDocs.php',
    ];

    parent::__construct($id, $mod);

  }

  public function getRoutes() {

    $baseUrl = mkBaseUrl();
    $baseDir = "site/pages/docs";

    $controllerFile = $baseDir . '/docs.controller.php';
    $controller = [
      'file' => $controllerFile,
//      'load' => 'gamePageControllerLoad',
//      'preProcess' => 'gamePageControllerPreProcess',
    ];

    return [

      // DOCS
      'mkDocs.docs' => [

        'path' => 'docs',

        'page' => [
          'head' => [
            'title' => 'MaltKit | Documentation',
            'metas' => [
              [
                'name' => 'description',
                'content' => 'The documentation for MaltKit.',
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/docs/docs.tpl.php',
          ],
          'controller' => $controller,
        ],

      ],

      // DOCS / SITES
      'mkDocs.sites' => [
        'path' => 'docs/sites',
        'page' => [
          'body' => [
            'file' => $baseDir . '/sites/sites.php',
          ],
          'controller' => $controller,
          'contentTemplate' => 'docs',
        ],
      ],

      // DOCS / GAMES
      'mkDocs.games' => [
        'path' => 'docs/games',
        'page' => [
          'body' => [
            'file' => $baseDir . '/games/games.php',
          ],
          'controller' => $controller,
          'contentTemplate' => 'docs',
        ],
      ],

      // DOCS / APPS
      'mkDocs.apps' => [
        'path' => 'docs/apps',
        'page' => [
          'body' => [
            'file' => $baseDir . '/apps/apps.php',
          ],
          'controller' => $controller,
          'contentTemplate' => 'docs',
        ],
      ],

    ];

  }

}
