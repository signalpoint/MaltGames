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

    $routes = [

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
        ],
      ],

        // DOCS / SITES / CONFIG
        'mkDocs.config' => [
          'path' => 'docs/sites/config',
          'page' => [
            'body' => [
              'file' => $baseDir . '/sites/config.php',
            ],
          ],
        ],

        // DOCS / SITES / MODS
        'mkDocs.mods' => [
          'path' => 'docs/sites/mods',
          'page' => [
            'body' => [
              'file' => $baseDir . '/sites/mods.php',
            ],
          ],
        ],

        // DOCS / SITES / THEMES
        'mkDocs.themes' => [
          'path' => 'docs/sites/themes',
          'page' => [
            'body' => [
              'file' => $baseDir . '/sites/themes.php',
            ],
          ],
        ],

      // DOCS / GAMES
      'mkDocs.games' => [
        'path' => 'docs/games',
        'page' => [
          'body' => [
            'file' => $baseDir . '/games/games.php',
          ],
        ],
      ],

      // DOCS / APPS
      'mkDocs.apps' => [
        'path' => 'docs/apps',
        'page' => [
          'body' => [
            'file' => $baseDir . '/apps/apps.php',
          ],
        ],
      ],

    ];

    // Set the controller and content template for all routes except the docs
    // home page.
    foreach ($routes as $id => $route) {
      if ($id == 'mkDocs.docs') { continue; }
      $routes[$id]['page']['controller'] = $controller;
      $routes[$id]['page']['contentTemplate'] = 'docs';
    }

    return $routes;

  }

}
