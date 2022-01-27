<?php

namespace MaltGames;

class Mod {

  protected $id;
  protected $namespace;
  protected $class;
  protected $name;
  protected $description;
  protected $files;

  public function __construct($id, $mod) {

    $this->id = $id;

    if (isset($mod['namespace'])) { $this->namespace = $mod['namespace']; }
    if (isset($mod['class'])) { $this->class = $mod['class']; }
    if (isset($mod['name'])) { $this->name = $mod['name']; }
    if (isset($mod['description'])) { $this->description = $mod['description']; }
    if (isset($mod['files'])) { $this->files = $mod['files']; }

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

  public function getDescription() {
    return $this->description;
  }

  public function getFiles() {
    return $this->files;
  }

  public function load() {
//    $namespaceClass = $this->getNamespace() . "\\" . $this->getClass();
//    use "$namespaceClass";
    foreach ($this->getFiles() as $file) {
      require $file;
    }
  }

  /**
   *
   * INTERFACES
   *
   *    Implement these in your extension of Mod.
   *
   */

  public function getRoutes() {
    return NULL;
  }

}
