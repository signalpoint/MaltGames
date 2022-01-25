<?php

function gamePageControllerLoad(&$page) {
  $key = mkArg(1);
  return mkGameLoad($key);
}

function gamePageControllerPreProcess(&$page) {

  // Add the Game's src code to the page...

  $site = mkSite();
  $game = $page->getControllerData();
  $gameBaseUrl = $site->getBaseUrl() . "/site/games/{$game['key']}";

  // Add any game scripts to page.
  if (isset($game['page']['head']['scripts'])) {
    foreach ($game['page']['head']['scripts'] as $fileName) {
      $url = "{$gameBaseUrl}/js/{$fileName}";
      $page->addJs($url);
    }
  }

  // Add any game links to page.
  if (isset($game['page']['head']['links'])) {
    foreach ($game['page']['head']['links'] as $fileName) {
      $url = "{$gameBaseUrl}/css/{$fileName}";
      $page->addCss($url);
    }
  }

  // Toast
  $page->addBottomScript($site->getBaseUrl() . '/gdk/modal.js');

}
