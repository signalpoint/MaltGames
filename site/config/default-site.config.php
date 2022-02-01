<?php

use MaltKit\Mk;

function mkSiteConfig() {

  return [

    'defaultRoute' => 'example.home',

    // MODS

    'mods' => [

      // Example
      'example' => [
        'namespace' => 'MaltKit',
        'class' => 'Example',
      ], // example

    ], // mods

    // THEMES

    'themes' => [

      // Boots Theme - A Bootstrap 5 Theme
      'boots' => [
        'namespace' => 'MaltKit',
        'class' => 'Boots',
      ],

    ], // themes

    // CURRENT THEME

    'theme' => 'boots',

  ];

}
