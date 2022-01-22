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
      'slogan' => 'Learn Colors in Another Language',
      'description' => 'See, hear and touch colors! Quickly learn the ' .
        'names of colors.',
      'src' => [
        'js' => [
          'main.js',
          'widgets/the-color-to-learn.js',
          'widgets/colored-buttons.js',
          'widgets/score-board.js',
        ],
      ],
    ],

    'word-dash' => [
      'name' => 'WordDash',
      'slogan' => 'Translation Race',
      'description' => 'A race to translate as many words as you can.',
      'src' => [
        'js' => [
          'chat.js',
          'main.js',
          'play.js',
          'player.js',
          'players.js',
          'words.js',
        ],
      ],
    ],

  ];

  foreach ($games as $key => $game) {
    $games[$key]['url'] = mkGameUrl($key);
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
