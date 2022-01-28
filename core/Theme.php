<?php

namespace MaltKit;

class Theme {

  protected $id;
  protected $regions;
  protected $pageTemplates;
  protected $contentTemplates;

  public function __construct($id, $theme) {

    $this->id = $id;
    $this->regions = [];
    $this->pageTemplates = [];
    $this->contentTemplates = [];

    if (isset($theme['regions'])) {
      $this->regions = $theme['regions'];
    }
    if (isset($theme['pageTemplates'])) {
      $this->pageTemplates = $theme['pageTemplates'];
    }
    if (isset($theme['contentTemplates'])) {
      $this->contentTemplates = $theme['contentTemplates'];
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

  // CURRENT PAGE TEMPLATES

  public function getCurrentPageTemplate() {
    return $this->currentPageTemplate;
  }
  public function setCurrentPageTemplate($pageTemplate) {
    $this->currentPageTemplate = $pageTemplate;
  }

  // CONTENT TEMPLATES

  public function getContentTemplates() { return $this->contentTemplates; }
  public function addContentTemplates($contentTemplates) {
    foreach ($contentTemplates as $id => $contentTemplate) {
      $this->addContentTemplate($id, $contentTemplate);
    }
  }

  public function getContentTemplate($id) {
    return isset($this->contentTemplates[$id]) ? $this->contentTemplates[$id] : NULL;
  }
  public function addContentTemplate($id, $contentTemplate) {
    $this->contentTemplates[$id] = $contentTemplate;
  }

}
