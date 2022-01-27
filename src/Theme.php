<?php

namespace MaltGames;

class Theme {

  protected $id;
  protected $regions;
  protected $pageTemplates;

  public function __construct($id, $theme) {

    $this->id = $id;
    $this->regions = [];
    $this->pageTemplates = [];

    if (isset($theme['pageTemplates'])) {
      $this->pageTemplates = $theme['pageTemplates'];
    }
    if (isset($theme['regions'])) {
      $this->regions = $theme['regions'];
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

  // REGIONS

  public function getRegions() {
    return $this->regions;
  }
  public function getRegion($id) {
    return isset($this->regions[$id]) ? $this->regions[$id] : NULL;
  }

  // PAGE TEMPLATES

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
