<?php

function mkDocsTableOfContentsMenu() {
  // TODO honestly the menu system should just be made up of Page objects, that
  // way they have all the goodies with html,head,body,etc alongside them.
  return [

    // SITES
    'sites' => [
      'text' => 'Sites',
      'route' => 'mkDocs.sites',
    ],

    // GAMES
    'games' => [
      'text' => 'Games',
      'route' => 'mkDocs.games',
    ],

    // APPS
    'apps' => [
      'text' => 'Apps',
      'route' => 'mkDocs.apps',
    ],

  ];
}
