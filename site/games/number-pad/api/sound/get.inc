<?php

/**
 *
 * @param type $languageCode {String} The language code you want to translate to.
 * @param type $number {String} The native number you want translated.
 * @return type
 */
function number_pad_api_sound_get($languageCode, $number) {

  require "site/games/number-pad/api/numbers/get.inc";

  $numbers = number_pad_api_numbers_get($languageCode);

  $urlEncodedNumber = urlencode($numbers[$number]);

  $url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q={$urlEncodedNumber}&tl={$languageCode}&client=tw-ob";

  // TODO put some serious caching on this so the client hangs onto it!
  return file_get_contents($url, false, stream_context_create([
    'http' => [
      'ignore_errors' => true,
      'header' => "Content-Type: audio/mpeg;",
    ]
  ]));

}
