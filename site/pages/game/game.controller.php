<?php

function gamePageControllerLoad(&$page) {
  $key = mkArg(1);
  return mkGameLoad($key);
}

function gamePageControllerPreProcess(&$page) {

  $site = mkSite();
  $baseUrl = $site->getBaseUrl();
  $game = $page->getControllerData();

  return;

  $gamePage = $game->getPage();
  $gameDirUrl = $baseUrl . '/' . $game->getPath();

  // Add the Game's src code to the page...

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
