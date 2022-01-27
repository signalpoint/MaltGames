<?php

namespace MaltGames;

class Theme {

  protected $id;
  protected $pageTemplates;

  public function __construct($id, $theme) {

    $this->id = $id;
    $this->pageTemplates = [];

    if (isset($theme['pageTemplates'])) {
      $this->pageTemplates = $theme['pageTemplates'];
    }

  } // __construct

  // proxy helpers
  public function id() {
    return $this->getId();
  }

  // METHODS...

  public function getId() {
    return $this->id;
  }

  public function getPageTemplates() { return $this->pageTemplates; }
  public function addPageTemplates($pageTemplates) {
    foreach ($pageTemplates as $id => $pageTemplate) {
      $this->addPageTemplate($id, $pageTemplate);
    }
  }
  public function addPageTemplate($id, $pageTemplate) {
    $this->pageTemplates[$id] = $pageTemplate;
  }
  public function getPageTemplate($id) {
    return isset($this->pageTemplates[$id]) ? $this->pageTemplates[$id] : NULL;
  }
  public function getCurrentPageTemplate() {
    return $this->currentPageTemplate;
  }
  public function setCurrentPageTemplate($pageTemplate) {
    $this->currentPageTemplate = $pageTemplate;
  }

}
