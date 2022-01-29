<?php

namespace MaltKit;

use MaltKit\Mod;

class Game extends Mod {

  public $key;
  public $version;
  public $slogan;
  public $description;
  public $page;
  public $url;

  public function __construct($id, $game) {

    $this->key = $id;
    if (isset($game['version'])) { $this->version = $game['version']; }
    if (isset($game['slogan'])) { $this->slogan = $game['slogan']; }
    if (isset($game['description'])) { $this->description = $game['description']; }
    if (isset($game['page'])) { $this->page = $game['page']; }
    if (isset($game['url'])) { $this->url= $game['url']; }

    parent::__construct($id, $game);

  }

  public function getKey() {
    return $this->key;
  }

  public function getVersion() {
    return $this->version;
  }

  public function getSlogan() {
    return $this->slogan;
  }

  public function getDescription() {
    return $this->description;
  }

  public function getPage() {
    return $this->page;
  }

  public function getUrl() {
    return $this->url;
  }

}
