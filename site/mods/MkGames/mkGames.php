<?php

// For each Game...
//foreach (mkGames() as $game) {
//
//  $gameModPath = 'site/games/' . $game['key'];
//  $gameFiles = [
//    $gameModPath . "/{$game['key']}.php",
//  ];
//  if (isset($game['files'])) {
//    foreach ($game['files'] as $i => $file) {
//      $game['files'][$i] = $gameModPath . '/' . $file;
//    }
//    $gameFiles = array_merge($gameFiles, $game['files']);
//  }
//
//  // Add the Mod from the Game to the Site.
//  $GLOBALS['site']->addMod($game['key'], [
//    'namespace' => 'MaltKit',
//    'class' => $game['name'],
//    'name' => $game['name'],
//    'path' => $gameModPath,
//    'files' => $gameFiles,
//    'url' => $game['url'],
//  ]);
//
//}

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
    ],

    'number-pad' => [
      'name' => 'NumberPad',
    ],

    'object-hunt' => [
      'name' => 'ObjectHunt',
    ],
//
//    'word-dash' => [
//      'name' => 'WordDash',
//      'v' => '0.0.0',
//      'slogan' => 'Translation Race',
//      'description' => 'A race to translate as many words as you can.',
//      'page' => [
//        'head' => [
//          'scripts' => [
//            'chat.js',
//            'main.js',
//            'play.js',
//            'player.js',
//            'players.js',
//            'words.js',
//          ],
//        ],
//      ],
//    ],

  ];

  // Set the game url and key onto each game.
  foreach ($games as $key => $game) {
    $games[$key]['url'] = mkGameUrl($key);
    $games[$key]['key'] = $key;
  }

  return $games;
}

/**
 * Returns a Game.
 * @param string $key
 * @return Game
 */
function mkGameLoad($key) {
  print "mkGameLoad() - temporarily returning null";
  return NULL;
  //return $GLOBALS['site']->getMod($key);

  $gameModPath = "site/games/{$key}";

  $gameFiles = [
    $gameModPath . "/{$key}.php",
  ];

  if (isset($game['files'])) {
    foreach ($game['files'] as $i => $file) {
      $game['files'][$i] = $gameModPath . '/' . $file;
    }
    $gameFiles = array_merge($gameFiles, $game['files']);
  }

  // Add the Mod from the Game to the Site.
  $GLOBALS['site']->addMod($game['key'], [
    'namespace' => 'MaltKit',
    'class' => $game['name'],
    'name' => $game['name'],
    'path' => $gameModPath,
    'files' => $gameFiles,
    'url' => $game['url'],
  ]);

  return $GLOBALS['site']->getMod($key);

}
