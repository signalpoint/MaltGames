<?php

namespace MaltKit;

use MaltKit\Game;

class ColorPicker extends Game {

  public function __construct($id, $game) {
    $this->name = 'ColorPicker';
    $this->version = '0.0.0';
    $this->slogan = 'Learn Colors in Another Language';
    $this->description = 'See, hear and touch colors to quickly learn the names of colors.';
    $this->page = [
      'head' => [
        'scripts' => [
          'main.js',
          'brain.js',
          'widgets/the-color-to-learn.js',
          'widgets/colored-buttons.js',
          'widgets/score-board.js',
        ],
      ],
    ];
    parent::__construct($id, $game);
  }

  public function rest() {

    return [

      'colors' => [
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

      case 'colors':

        if ($method == 'get') {
          $languageCode = mkArg(3);
          $map = [
            'es' => [
              "black" => "negro",
              "blue" => "azul",
              "brown" => "marrón",
              "gray" => "gris",
              "green" => "verde",
              "orange" => "naranja",
              "pink" => "rosa",
              "purple" => "morado",
              "red" => "rojo",
              "white" => "blanco",
              "yellow" => "amarillo",
            ],
            'vi' => [
              "black" => "màu đen",
              "blue" => "màu xanh lam",
              "brown" => "màu nâu",
              "gray" => "màu xám",
              "green" => "màu xanh lá",
              "orange" => "màu da cam",
              "pink" => "màu hồng",
              "purple" => "màu tím",
              "red" => "màu đỏ",
              "white" => "màu trắng",
              "yellow" => "màu vàng",
            ],
          ];
          return isset($map[$languageCode]) ? $map[$languageCode] : NULL;

        }

        break;

      case 'sound':

        // * @param type $languageCode {String} The language code you want to translate to.
        // * @param type $word {String} The native word you want translated.
        if ($method == 'get') {

          $languageCode = mkArg(3);
          $word = mkArg(4);

          $colors = $this->api('colors', 'get');

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

        break;

    }

  }

}
