<?php

//
// TODO
//
// - allow formats to be returned, e.g. by default go w/ "php" so php can use
// the resources to get arrays/objects/etc, then at the end if somebody needs
// json/etc, we just set the headers, encode it, and echo it, bingo bango!
// e.g. game->apiGet('directory', ['format' => 'json']);
//

use MaltKit\Site;

require 'vendor/autoload.php';

require 'site/config/site.config.php';

require "core/common.inc";

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

// VARIABLES

$method = mkMethod();
$args = explode('/', mkQ());
$argCount = count($args);

// CONFIG

$config = mkSiteConfig();

// SITE

$site = new Site($config);

// MODS

// If the Site config has mods, initialize them.
if (isset($config['mods'])) {
  $site->initMods($config['mods']);
}

// HEADER DEFAULTS
$header = [
  'Content-Type' => 'application/json',
  'charset' => 'utf-8',
];

// Let's check to make sure they provided a mod and resource name...

// NO MOD PROVIDED
if ($argCount < 1) {
  http_response_code(500);
  $responseForClient([
    'error' => [
      'code' => 500,
      'msg' => 'No mod provided',
    ],
  ], $header);
  return;
}

// NO RESOURCE NAME PROVIDED
if ($argCount < 2) {
  http_response_code(500);
  $responseForClient([
    'error' => [
      'code' => 500,
      'msg' => 'No resource provided',
    ],
  ], $header);
  return;
}

// Gather the mod id and load the Module.
$modName = array_shift($args);
$mod = $site->getMod($modName);

// Make sure the mod exists.
if (!$mod) {

  // MOD NOT FOUND
  http_response_code(404);
  $responseForClient([
    'error' => [
      'code' => 404,
      'msg' => 'Mod not found',
    ],
  ], $header);
  return;

}

// We've got the mod...

// Get the resource name from the URL path arguments.
$resource = array_shift($args);

// Load the mod's API, if any.
$api = $mod->getApi();

// Make sure the mod's API exists.
if (!$api) {
  http_response_code(500);
  $responseForClient([
    'error' => [
      'code' => 500,
      'msg' => 'No mod API',
    ],
  ], $header);
  return;
}

// Merge any headers from the mod's API.
if (isset($api[$resource][$method]['header'])) {
  $header = array_merge($header, $api[$resource][$method]['header']);
}

// Set the header.
header($buildHeaderString($header));

// If the mod's API has a matching resource...
if (isset($api[$resource])) {

  // If the mod's API implements the method for this resource...
  if (isset($api[$resource][$method])) {

    // Depending on the method, get the response from the resource...
    switch ($method) {

      // POST
      case 'post':
        $response = $mod->api($resource, $method, json_decode(file_get_contents('php://input')));
        break;

      // GET
      // *
      case 'get':
      default:
        $response = $mod->api($resource, $method);
        break;

    }

  }
  else {

    // UNSUPPORTED METHOD
    http_response_code(405);
    $response = [
      'error' => [
        'code' => 405,
        'msg' => 'Method not allowed',
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
      'msg' => 'Resource not found',
    ],
  ];

}

echo $responseForClient($response, $header);
