<?php

/**
 * Gets the "q" parameter from the query string.
 * @return type {String}
 */
function mkQ() {
  return filter_input(INPUT_GET, 'q', FILTER_SANITIZE_URL);
}

/**
 * Gets the request method (as lower case).
 * @return type {String}
 */
function mkMethod() {
  return strtolower(
    filter_input(INPUT_SERVER, 'REQUEST_METHOD')
  );
}

/**
 * Returns the URI path as an array.
 * @see mkQ()
 * @return type {Array}
 */
function mkArgs() {

//  return explode('/', mkQ());

  // Grab the URI instead and remove its leading and trailing slashes.
  $uri = $_SERVER['REQUEST_URI'];
  $path = substr($uri, 1);
  $trailingChar = substr($path, -1);
  if ($trailingChar === '/') { $path = substr($path, 0, -1); }

  return explode('/', $path);

}

/**
 * Returns the value at a position in the "q" parameter from the query string.
 * @param type $position
 * @return type
 */
function mkArg($position) {
  $args = mkArgs();
  return isset($args[$position]) ? $args[$position] : NULL;
}

function mkPath() {
  return implode('/', mkArgs());
}

function mkProtocol() {
  return $_SERVER['REQUEST_SCHEME'];
}

function mkDomain() {
  return $_SERVER['SERVER_NAME'];
}

function mkBaseUrl() {
  return mkProtocol() . '://' . mkDomain();
}

function mkSite() {
  return isset($GLOBALS['site']) ? $GLOBALS['site'] : NULL;
}

function mkGameUrl($key) {
  return mkBaseUrl() . "/game/{$key}";
}

function mkDump($stuff) {
  echo "<pre>" . print_r($stuff, TRUE) . "</pre>";
  // "<p>" . debug_backtrace()[1]['function'] . "</p>"
}

function mkError($stuff) {
  error_log("<pre>" . print_r($stuff, TRUE) . "</pre>");
}

/**
 * @see https://api.drupal.org/api/drupal/includes%21common.inc/function/drupal_attributes/7.x
 */
function mkAttributes($attributes = array()) {
  foreach ($attributes as $attribute => &$data) {
    $data = implode(' ', (array) $data);
    $data = $attribute . '="' . htmlspecialchars($data, ENT_QUOTES, 'UTF-8') . '"';
  }
  return $attributes ? ' ' . implode(' ', $attributes) : '';
}
