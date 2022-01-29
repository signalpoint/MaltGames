<?php

function gamePageControllerLoad(&$page) {
  $key = mkArg(1);
  return mkGameLoad($key);
}

function gamePageControllerPreProcess(&$page) {

  // Add the Game's src code to the page...

  $site = mkSite();
  $baseUrl = $site->getBaseUrl();
  $game = $page->getControllerData();
  $gameDirUrl = $baseUrl . '/' . $game->getPath();
  $gamePage = $game->getPage();

  // Add any game scripts to page.
  if (isset($gamePage['head']['scripts'])) {
    foreach ($gamePage['head']['scripts'] as $fileName) {
      $url = "{$gameDirUrl}/js/{$fileName}";
      $page->addJs($url);
    }
  }

  // Add any game links to page.
  if (isset($gamePage['head']['links'])) {
    foreach ($gamePage['head']['links'] as $fileName) {
      $url = "{$gameDirUrl}/css/{$fileName}";
      $page->addCss($url);
    }
  }

  // Modal
  $page->addBottomScript($baseUrl . '/gdk/modal.js');

}
