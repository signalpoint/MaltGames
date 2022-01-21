<?php

// TODO allow formats to be returned, e.g. by default go w/ "php" so php can use
// the resources to get arrays/objects/etc, then at the end if somebody needs
// json/etc, we just set the headers, encode it, and echo it, bingo bango!
// e.g. game->apiGet('directory', ['format' => 'json']);

$q = filter_input(INPUT_GET, 'q', FILTER_SANITIZE_URL);

//$method = strtolower($_SERVER['REQUEST_METHOD']);
$method = strtolower(
  filter_input(INPUT_SERVER, 'REQUEST_METHOD')
);

$args = explode('/', $q);

// TODO make sure there are enough args, throw error if not

$gameKey = array_shift($args);
$resource = array_shift($args);

// TODO gotta figure out how to register a game's api with the gdk
// TODO figure out a psr4+autoload strategy!
$api = [

  'color-picker' => [
    'colors' => [
      'get' => [],
    ],
    'sound' => [
      'get' => [],
      'post' => [],
    ],
  ],

];

//header('Content-Type: application/json; charset=utf-8');

// TODO gotta figure out Content-type abstraction for the client
$useAudioMpeg = $resource == 'sound' && ($method == 'get' || $method == 'post');
$useJson = !$useAudioMpeg;

if ($useAudioMpeg) {
  header('Content-Type: audio/mpeg;');
}
else {
  header('Content-Type: application/json; charset=utf-8');
}

if (isset($api[$gameKey])) {

  if (isset($api[$gameKey][$resource])) {

    if (isset($api[$gameKey][$resource][$method])) {

      $path = "games/{$gameKey}/api/{$resource}/{$method}.inc";
      require $path;

      $safeGameKey = strpos($gameKey, "-") !== FALSE ?
        str_replace("-", "_", $gameKey) : $gameKey;

      $safeResource = strpos($resource, "-") !== FALSE ?
        str_replace("-", "_", $resource) : $resource;

      $function = "{$safeGameKey}_api_{$safeResource}_{$method}";
      switch ($method) {
        case 'post':
          $response = call_user_func($function, json_decode(file_get_contents('php://input')));
          break;
        case 'get':
        default:
          $response = call_user_func_array($function, $args);
          break;
      }


    }
    else {

      // UNSUPPORTED METHOD
      http_response_code(405);
      $response = [
        'error' => [
          'code' => 405,
          'msg' => 'Method Not Allowed',
        ],
      ];

    }

  }
  else {

    // MISSING RESOURCE
    http_response_code(404);
    $response = [
      'error' => [
        'code' => 404,
        'msg' => 'Resource Not Found',
      ],
    ];

  }

}
else {

  // MISSING GAME
  http_response_code(404);
  $response = [
    'error' => [
      'code' => 404,
      'msg' => 'Game Not Found',
    ],
  ];

}

echo $useJson ? json_encode($response) : $response;
//echo json_encode($response);
