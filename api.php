<?php

//
// TODO
//
// - allow formats to be returned, e.g. by default go w/ "php" so php can use
// the resources to get arrays/objects/etc, then at the end if somebody needs
// json/etc, we just set the headers, encode it, and echo it, bingo bango!
// e.g. game->apiGet('directory', ['format' => 'json']);
//
// - figure out a psr4+autoload strategy!
//
// - put a basic access layer on this by making sure server request URL's
// game key matches the game key provided to the api.
//

require "src/common.inc";
require "src/games.inc";

// Set up a function to send appropriate response to the client.
$responseForClient = function($response, $header) {
  echo $header['Content-Type'] == 'application/json' ?
    json_encode($response) :
    $response;
};

// Set up a function to build a header string from an array.
$buildHeaderString = function($header) {
  $items = [];
  foreach ($header as $key => $value) {
    $items[] = "{$key}: $value";
  }
  return implode('; ', $items);
};

// Set up helper variables.
$method = mkMethod();
$args = mkArgs();
$argCount = count($args);

// Let's check to make sure they provided a game key and resource name...

// NO GAME KEY PROVIDED
if ($argCount < 1) {
  http_response_code(500);
  $responseForClient([
    'error' => [
      'code' => 500,
      'msg' => 'No Game Key Provided',
    ],
  ]);
  return;
}

// NO RESOURCE NAME PROVIDED
if ($argCount < 2) {
  http_response_code(500);
  $responseForClient([
    'error' => [
      'code' => 500,
      'msg' => 'No Resource Name Provided',
    ],
  ]);
  return;
}

// Gather the game key and load the game.
$gameKey = array_shift($args);
$game = mkGameLoad($gameKey);

// Make sure the game exists.
if (!$game) {

  // GAME NOT FOUND
  http_response_code(404);
  $responseForClient([
    'error' => [
      'code' => 404,
      'msg' => 'Game Not Found',
    ],
  ]);
  return;

}

// We've got the game...

// Get the resource name from the URL path arguments.
$resource = array_shift($args);

// Load the game's API, if any.
$api = mkGameLoadApi($gameKey);

// Make sure the game's API exists.
if (!$api) {
  http_response_code(500);
  $responseForClient([
    'error' => [
      'code' => 500,
      'msg' => 'No Game API',
    ],
  ]);
  return;
}

// Set up header defaults.
$header = [
  'Content-Type' => 'application/json',
  'charset' => 'utf-8',
];

// Merge any headers from the game's API.
if (isset($api[$resource][$method]['header'])) {
  $header = array_merge($header, $api[$resource][$method]['header']);
}

// Set the header.
header($buildHeaderString($header));

// If the game's API has a matching resource...
if (isset($api[$resource])) {

  // If the game's API implements the method for this resource...
  if (isset($api[$resource][$method])) {

    // Load the game's API .inc file.
    $path = "games/{$gameKey}/api/{$resource}/{$method}.inc";
    require $path;

    // Convert dashes to underscores to make a safe game key and resource name.
    $safeGameKey = strpos($gameKey, "-") !== FALSE ?
      str_replace("-", "_", $gameKey) : $gameKey;
    $safeResource = strpos($resource, "-") !== FALSE ?
      str_replace("-", "_", $resource) : $resource;

    // Determine function name to call for the resource.
    $function = "{$safeGameKey}_api_{$safeResource}_{$method}";

    // Depending on the method, get the response from the resource...
    switch ($method) {

      // POST
      case 'post':
        $response = call_user_func($function, json_decode(file_get_contents('php://input')));
        break;

      // GET
      // *
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

echo $responseForClient($response, $header);
