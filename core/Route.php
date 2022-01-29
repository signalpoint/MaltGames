<?php

namespace MaltKit;

class Route {

  protected $id;
  public $path;
  public $require;
  public $page;

  public function __construct($id, $route) {

    $this->id = $id;

    if (isset($route['path'])) { $this->path = $route['path']; }
    if (isset($route['require'])) { $this->require = $route['require']; }
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

  public function getRequire() {
    return $this->require;
  }
  public function hasRequire() {
    return !!$this->getRequire();
  }
  public function loadRequire() {
    foreach ($this->getRequire() as $file) {
      require $file;
    }
  }

  public function getPage() {
    return $this->page;
  }

}
