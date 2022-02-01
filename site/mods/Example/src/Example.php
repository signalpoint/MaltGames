<?php

namespace MaltKit;

use MaltKit\Mod;

class Example extends Mod {

  public function __construct($id, $mod) {

    $this->name = 'Example';
    $this->path = 'site/mods/Example';
    $this->description = 'The MaltKit Example Mod.';
    $this->files = [
      'site/mods/Example/example.php',
    ];

    parent::__construct($id, $mod);
  }

  public function getRoutes() {
    return [

      // HOME
      'example.home' => [
        'path' => 'home',
        'page' => [
          'head' => [
            'title' => 'Example | Home',
            'metas' => [
              [
                'name' => 'description',
                'content' => 'The home page for Example.',
              ]
            ],
          ],
          'body' => [
            'file' => $this->getPath() . '/pages/home.inc',
          ],
        ],
      ],

    ];
  }

}
