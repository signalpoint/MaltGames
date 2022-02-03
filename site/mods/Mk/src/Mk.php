<?php

namespace MaltKit;

use MaltKit\Mod;

class Mk extends Mod {

  public function __construct($id, $mod) {

    $this->name = 'MaltKit';
    $this->path = 'site/mods/Mk';
    $this->description = 'The MaltKit Mod.';
    $this->files = [
      'site/mods/Mk/mk.php',
    ];

    parent::__construct($id, $mod);

  }

  public function getRoutes() {

    return [

      // HOME
      'mk.home' => [

        'path' => 'home',

        'page' => [
          'head' => [
            'title' => 'MaltKit | Mobile App Language Toolkit',
            'metas' => [
              [
                'name' => 'description',
                'content' => 'A tool box for learning modern coding ' .
                  'technologies and building your own custom games, ' .
                  'applications and websites, for all devices.',
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/home/home.tpl.php',
          ],
        ],

      ],

      // BUILD
      'mk.build' => [

        'path' => 'build',
        'page' => [
          'head' => [
            'title' => 'MaltKit | Build',
            'metas' => [
              [
                'name' => 'description',
                'content' => 'Build page description...',
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/build/build.tpl.php',
          ],
        ],

      ],

      // MUSIC
      'mk.music' => [

        'path' => 'music',
        'page' => [
          'head' => [
            'title' => 'MaltKit | Music',
            'metas' => [
              [
                'name' => 'description',
                'content' => '...', // TODO
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/music/music.tpl.php',
          ],
        ],

      ],

      // ABOUT
      'mk.about' => [

        'path' => 'about',

        'page' => [
          'head' => [
            'title' => 'MaltKit | About',
            'metas' => [
              [
                'name' => 'description',
                'content' => '...', // TODO
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/about.html',
          ],
        ],

      ],

      // BLOCKCHAIN
      'mk.blockchain' => [

        'path' => 'blockchain',

        'page' => [
          'head' => [
            'title' => 'MaltKit | Blockchain',
            'metas' => [
              [
                'name' => 'description',
                'content' => '...', // TODO
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/blockchain.html',
          ],
        ],

      ],

      // CONTACT
      'mk.contact' => [

        'path' => 'contact',

        'page' => [
          'head' => [
            'title' => 'MaltKit | Contact',
            'metas' => [
              [
                'name' => 'description',
                'content' => 'The contact information for MaltKit.',
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/contact.php',
          ],
        ],

      ],

      // PRIVACY
      'mk.privacy' => [

        'path' => 'privacy',

        'page' => [
          'head' => [
            'title' => 'MaltKit | Privacy Policy',
            'metas' => [
              [
                'name' => 'description',
                'content' => 'The privacy policy for MaltKit.',
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/privacy.html',
          ],
        ],

      ],

      // TERMS
      'mk.terms' => [

        'path' => 'terms',

        'page' => [
          'head' => [
            'title' => 'MaltKit | Terms & Conditions',
            'metas' => [
              [
                'name' => 'description',
                'content' => 'The terms and conditions for MaltKit.',
              ]
            ],
          ],
          'body' => [
            'file' => 'site/pages/terms.html',
          ],
        ],

      ],

    ];

  }

  public function rest() {

    return [
      'connect' => [
        'get' => [],
      ],
      'mods' => [
        'get' => [],
      ],
      'routes' => [
        'get' => [],
      ],
    ];

  }

  public function api($resource, $method, $data = NULL) {

    $site = $GLOBALS['site'];

    switch ($resource) {

      case 'connect':

        $response = [];
        $config = mkSiteConfig();

        // MODS

        $response['mods'] = $site->getMods();

        // THEMES

        if (isset($config['themes'])) { $site->addThemes($config['themes']); }
        $response['themes'] = $site->getThemes();

        // CURRENT THEME (name)

        $response['theme'] = $config['theme'];

        // ROUTES

        $response['routes'] = $site->getRoutes();

        return $response;

        break;

      case 'mods':

        if ($method == 'get') {
          return $site->getMods();
        }

        break;

      case 'routes':

        if ($method == 'get') {
          return $site->getRoutes();
        }

        break;

    }

  }

}
