<?php

/**
 * Returns the games.
 * @return type
 */
function mkGames() {

  // TODO build a MaltKit\Game class
  //   then use psr4 and class extensions for each game

  // TODO inject these values into the mk/game object in javascript

  $games = [

    'color-picker' => [
      'name' => 'ColorPicker',
      'v' => '0.0.0',
      'slogan' => 'Learn Colors in Another Language',
      'description' => 'See, hear and touch colors to quickly learn the names of colors.',
      'page' => [
        'head' => [
          'scripts' => [
            'main.js',
            'brain.js',
            'widgets/the-color-to-learn.js',
            'widgets/colored-buttons.js',
            'widgets/score-board.js',
          ],
        ],
      ],
      'api' => [
        'colors' => [
          'get' => [],
        ],
        'sound' => [
          'get' => [
            'header' => [
              'Content-Type' => 'audio/mpeg'
            ],
          ],
        ],
      ],
    ],

    'number-pad' => [
      'name' => 'NumberPad',
      'v' => '0.0.0',
      'slogan' => 'Learn Numbers in Another Language',
      'description' => 'See, hear and touch numbers to quickly learn zero through nine.',
      'page' => [
        'head' => [
          'scripts' => [
            'main.js',
            'brain.js',
            'widgets/the-number-to-learn.js',
            'widgets/dial-pad.js',
            'widgets/score-board.js',
          ],
        ],
      ],
      'api' => [
        'numbers' => [
          'get' => [],
        ],
        'sound' => [
          'get' => [
            'header' => [
              'Content-Type' => 'audio/mpeg'
            ],
          ],
        ],
      ],
    ],

    'word-dash' => [
      'name' => 'WordDash',
      'v' => '0.0.0',
      'slogan' => 'Translation Race',
      'description' => 'A race to translate as many words as you can.',
      'page' => [
        'head' => [
          'scripts' => [
            'chat.js',
            'main.js',
            'play.js',
            'player.js',
            'players.js',
            'words.js',
          ],
        ],
      ],
    ],

  ];

  // Set the game url and key onto each game.
  foreach ($games as $key => $game) {
    $games[$key]['url'] = mkGameUrl($key);
    $games[$key]['key'] = $key;
  }

  return $games;
}

/**
 * Returns a game.
 * @param string $key
 * @return array
 */
function mkGameLoad($key) {
  $games = mkGames();
  return isset($games[$key]) ? $games[$key] : NULL;
}

function mkGameLoadApi($key) {
  $game = mkGameLoad($key);
  return isset($game['api']) ? $game['api'] : NULL;
}
