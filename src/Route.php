<?php

namespace MaltGames;

class Route {

  protected $id;
  protected $path;
  protected $page;

  public function __construct($id, $route) {

    $this->id = $id;

    if (isset($route['path'])) { $this->path = $route['path']; }
    if (isset($route['page'])) { $this->page = new Page($id, $route['page']); }

  } // __construct

  // proxy helpers
  public function id() {
    return $this->getId();
  }

  // VARIABLES...

  public function getId() {
    return $this->id;
  }

  public function getPath() {
    return $this->path;
  }

  public function getPage() {
    return $this->page;
  }

}
