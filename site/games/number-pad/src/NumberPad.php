<?php

namespace MaltKit;

use MaltKit\Game;

class NumberPad extends Game {

  public function __construct($id, $game) {
    $this->name = 'NumberPad';
    $this->version = '0.0.0';
    $this->slogan = 'Learn Numbers in Another Language';
    $this->description = 'See, hear and touch numbers to quickly learn zero through nine.';
    $this->page = [
      'head' => [
        'scripts' => [
          'main.js',
          'brain.js',
          'widgets/the-number-to-learn.js',
          'widgets/dial-pad.js',
          'widgets/score-board.js',
        ],
      ],
    ];
    parent::__construct($id, $game);
  }

  public function rest() {

    return [

      'numbers' => [
        'get' => [],
      ],

      'sound' => [
        'get' => [
          'header' => [
            'Content-Type' => 'audio/mpeg'
          ],
        ],
      ],

    ];

  }

  public function api($resource, $method, $data = NULL) {

    switch ($resource) {

      case 'numbers':

        if ($method == 'get') {
          $languageCode = mkArg(3);
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

        break;

      case 'sound':

        // * @param type $languageCode {String} The language code you want to translate to.
        // * @param type $number {String} The native number you want translated.
        if ($method == 'get') {

          $languageCode = mkArg(3);
          $number = mkArg(4);

          $numbers = $this->api('numbers', 'get');

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

        break;

    }

  }

}
