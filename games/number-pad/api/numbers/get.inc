<?php

// TODO since this game's dictionary is so simple, we could pretty easily use
//   the Google Translate API to support pretty much every language here and
//   not have to manually define the vocabularies below.

function number_pad_api_numbers_get($languageCode) {
  $map = [
    'es' => [
      "one" => "uno",
      "two" => "dos",
      "three" => "tres",
      "four" => "cuatro",
      "five" => "cinco",
      "six" => "seis",
      "seven" => "siete",
      "eight" => "ocho",
      "nine" => "nueve",
      "zero" => "cero",
    ],
    'vi' => [
      "one" => "một",
      "two" => "hai",
      "three" => "ba",
      "four" => "bốn",
      "five" => "năm",
      "six" => "sáu",
      "seven" => "bảy",
      "eight" => "tám",
      "nine" => "chín",
      "zero" => "số không",
    ],
  ];
  return isset($map[$languageCode]) ? $map[$languageCode] : NULL;
}
