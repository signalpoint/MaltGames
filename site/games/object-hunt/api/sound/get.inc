<?php

/**
 *
 * @param type $languageCode {String} The language code you want to translate to.
 * @param type $word {String} The native object name you want translated.
 * @return type
 */
function object_hunt_api_sound_get($languageCode, $word) {

  require "site/games/object-hunt/api/objects/get.inc";

  $words = object_hunt_api_objects_get($languageCode)['words'];

  $urlEncodedWord = urlencode($words[$word]);

  $url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q={$urlEncodedWord}&tl={$languageCode}&client=tw-ob";

  return file_get_contents($url, false, stream_context_create([
    'http' => [
      'ignore_errors' => true,
      'header' => "Content-Type: audio/mpeg;",
    ]
  ]));

}
