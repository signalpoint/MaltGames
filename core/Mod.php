<?php

namespace MaltKit;

class Mod {

  protected $id;
  public $namespace;
  public $class;
  public $name;
  public $path;
  public $description;
  public $files;
//  public $api;

  public function __construct($id, $mod) {

    $this->id = $id;

    if (isset($mod['namespace'])) { $this->namespace = $mod['namespace']; }
    if (isset($mod['class'])) { $this->class = $mod['class']; }
    if (isset($mod['name'])) { $this->name = $mod['name']; }
    if (isset($mod['path'])) { $this->path = $mod['path']; }
    if (isset($mod['description'])) { $this->description = $mod['description']; }
    if (isset($mod['files'])) { $this->files = $mod['files']; }
//    if (isset($mod['api'])) { $this->api = $mod['api']; }

  } // __construct

  // proxy helpers
  public function id() {
    return $this->getId();
  }

  // VARIABLES...

  public function getId() {
    return $this->id;
  }

  public function getNamespace() {
    return $this->namespace;
  }

  public function getClass() {
    return $this->class;
  }

  public function getName() {
    return $this->name;
  }

  public function getPath() {
    return $this->path;
  }

  public function getDescription() {
    return $this->description;
  }

  public function getFiles() {
    return $this->files;
  }

  public function load() {
    foreach ($this->getFiles() as $file) {
      require $file;
    }
  }

  public function getApi() {
    return $this->rest();
  }

  /**
   *
   * INTERFACES
   *
   *    Implement these when you extend Mod.
   *
   */

  // TODO rename to routes()
  public function getRoutes() {
    return NULL;
  }

  public function rest() {
    return NULL;
  }

  public function api($resource, $method, $data = NULL) {

  }

}
