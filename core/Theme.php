<?php

namespace MaltKit;

class Theme {

  protected $id;

  public $namespace;
  public $class;
  public $name;
  public $path;
  public $description;
  public $files;

  public $regions;
  public $pageTemplates;
  public $contentTemplates;

  public function __construct($id, $theme) {

    $this->id = $id;
    $this->regions = [];
    $this->pageTemplates = [];
    $this->contentTemplates = [];

    if (isset($theme['namespace'])) { $this->namespace = $theme['namespace']; }
    if (isset($theme['class'])) { $this->class = $theme['class']; }
    if (isset($theme['name'])) { $this->name = $theme['name']; }
    if (isset($theme['path'])) { $this->path = $theme['path']; }
    if (isset($theme['description'])) { $this->description = $theme['description']; }
    if (isset($theme['files'])) { $this->files = $theme['files']; }

    if (isset($theme['regions'])) { $this->regions = $theme['regions']; }
    if (isset($theme['pageTemplates'])) { $this->pageTemplates = $theme['pageTemplates']; }
    if (isset($theme['contentTemplates'])) { $this->contentTemplates = $theme['contentTemplates']; }

  } // __construct

  // PROXIES

  public function id() {
    return $this->getId();
  }

  // METHODS

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

  // REGIONS

  public function getRegions() {
    return $this->regions;
  }
  public function addRegions($regions) {
    foreach ($regions as $id => $region) {
      $this->addRegion($id, $region);
    }
  }
  public function addRegion($id, $region) {
    $this->regions[$id] = $region;
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

  // CURRENT PAGE TEMPLATE

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

  /**
   *
   * INTERFACES
   *
   *    Implement these when you extend Theme.
   *
   */

  public function regions() {
    return NULL;
  }

  public function pageTemplates() {
    return NULL;
  }

  public function contentTemplates() {
    return NULL;
  }

}
