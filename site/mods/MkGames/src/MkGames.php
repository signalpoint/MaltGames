<?php

namespace MaltKit;

use MaltKit\Mod;

class MkGames extends Mod {

  public function getRoutes() {

    $baseUrl = mkBaseUrl();

    return [

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
          ],
          'body' => [
            'file' => 'site/pages/games/games.tpl.php',
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
          ],
          'body' => [
            'file' => 'site/pages/game/game.tpl.php',
            'attributes' => [
              'onload' => 'loadTheGame()',
            ],
          ],
          'controller' => [
            'file' => 'site/pages/game/game.controller.php',
            'load' => 'gamePageControllerLoad',
            'preProcess' => 'gamePageControllerPreProcess',
          ],
        ],

      ],

    ];
  }

}
