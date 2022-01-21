<?php

// @deprecated

function color_picker_api_sound_post($data) {

  // GOOD URL!
  $url = "https://translate.google.com.vn/translate_tts?" . http_build_query([
    'ie' => 'UTF-8',
    'q' => $data->word,
    'tl' => $data->languageCode,
    'client' => 'tw-ob',
  ]);

//  return $url;

//  return [
//    'code' => $languageCode,
//    'word' => $word,
//    'url' => $url,
//  ];

  return file_get_contents($url, false, stream_context_create([
    'http' => [
      'ignore_errors' => true,
      'header' => "Content-Type: audio/mpeg;",
    ]
  ]));

}
