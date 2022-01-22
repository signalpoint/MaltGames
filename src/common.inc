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
 * Returns the "q" parameter from the query string as an array.
 * @see mkQ()
 * @return type {Array}
 */
function mkArgs() {
  return explode('/', mkQ());
}

/**
 * Returns the value at a position in the "q" parameter from the query string.
 * @param type $position
 * @return type
 */
function mkArg($position) {
  return mkArgs()[$position];
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

function mkGameUrl($key) {
  return mkBaseUrl() . "/game/{$key}";
}
