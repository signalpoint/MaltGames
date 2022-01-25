<?php

namespace MaltGames;

use MaltGames\Page;

class Site {

    protected $pages;
    protected $pageTemplates;
    protected $protocol;
    protected $domain;
    protected $baseUrl;

    public function __construct() {

      $this->pages = [];
      $this->pageTemplates = [];
      $this->protocol = mkProtocol();
      $this->domain = mkDomain();
      $this->baseUrl = mkBaseUrl();

    }

    public function addPages($pages) {
      foreach ($pages as $id => $page) {
        $this->addPage($id, $page);
      }
    }

    public function addPage($id, $page) {
      $this->pages[$id] = new Page($id, $page);
    }

    /**
     *
     * @param type $id
     * @return MaltGames\Page
     */
    public function loadPage($id) {
      return isset($this->pages[$id]) ? $this->pages[$id] : NULL;
    }

    public function getPageTemplate($name) {
      return isset($this->pageTemplates[$name]) ?
      $this->pageTemplates[$name] : NULL;
    }
    public function setPageTemplate($name, $template) {
      $this->pageTemplates[$name] = $template;
    }

    public function getProtocol() {
      return $this->protocol;
    }

    public function getDomain() {
      return $this->domain;
    }

    public function getBaseUrl() {
      return $this->baseUrl;
    }

}
