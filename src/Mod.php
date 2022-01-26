<?php

namespace MaltGames;

class Mod {

  protected $id;
  protected $name;
  protected $description;
  protected $files;

  public function __construct($id, $mod) {

    $this->id = $id;

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

  public function getName() {
    return $this->name;
  }

  public function getDescription() {
    return $this->description;
  }

  public function getFiles() {
    return $this->files;
  }

}
