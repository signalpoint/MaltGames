<?php

/**
 *
 * @param type $languageCode {String} The language code you want to translate to.
 * @param type $word {String} The native word you want translated.
 * @return type
 */
function color_picker_api_sound_get($languageCode, $word) {

  require "site/games/color-picker/api/colors/get.inc";

  $colors = color_picker_api_colors_get($languageCode);

  $urlEncodedWord = urlencode($colors[$word]);

  $url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q={$urlEncodedWord}&tl={$languageCode}&client=tw-ob";

  // TODO put some serious caching on this so the client hangs onto it!
  return file_get_contents($url, false, stream_context_create([
    'http' => [
      'ignore_errors' => true,
      'header' => "Content-Type: audio/mpeg;",
    ]
  ]));

}
