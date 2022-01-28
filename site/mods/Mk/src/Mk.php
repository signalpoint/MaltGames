<?php

namespace MaltKit;

use MaltGames\Mod;

class Mk extends Mod {

  public function getRoutes() {

    $baseUrl = mkBaseUrl();

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
            'scripts' => [],
            'links' => [],
          ],
          'body' => [
            'file' => 'site/pages/build/build.tpl.php',
            'content' => [],
            'scripts' => [],
          ],
        ],

      ],

      // GAMES
      'mk.games' => [

        'path' => 'games',

        'page' => [
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

      ],

      // GAME
      'mk.game' => [

        'path' => 'game',

        'page' => [
          'head' => [
            'title' => 'MaltKit | Game', // TODO $game['name'] | $game['slogan']
            'metas' => [
              [
                'name' => 'description',
                'content' => 'Game description', // TODO
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
            'file' => 'site/pages/game/game.controller.php',
            'load' => 'gamePageControllerLoad',
            'preProcess' => 'gamePageControllerPreProcess',
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

}
