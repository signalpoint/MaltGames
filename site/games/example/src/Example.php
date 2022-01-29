<?php

namespace MaltKit;

use MaltKit\Game;

class Example extends Game {

  public function rest() {

    return [

      'hello' => [

        'get' => [

        ],

      ],

    ];

  }

  public function api($resource, $method, $data = NULL) {

    if ($resource == 'hello' && $method == 'get') {
      return 'Hi!';
    }

  }

}
