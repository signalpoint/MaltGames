<?php

namespace MaltKit;

class Page {

  protected $id;

  // <head>
  public $title;
  public $metas;
  public $scripts;
  public $links;
  // </head>

  // <body>
  public $bodyFilePath; // TODO consider rename to content; allow array of items
  public $bodyAttributes;
  public $bottomScripts;
  // </body>

  public $controller;
  public $contentTemplate;

  public function __construct($id, $page) {

    $this->id = $id;

    $head = isset($page['head']) ? $page['head'] : [];
    $body = isset($page['body']) ? $page['body'] : [];

    // <head>
    $this->title = '';
    $this->metas = [];
    $this->scripts = [];
    $this->links = [];
    // </head>

    // <body>
    $this->bodyFilePath = isset($body['file']) ? $body['file'] : NULL;
    $this->bodyAttributes = isset($body['attributes']) ? $body['attributes'] : NULL;
    $this->content = [];
    $this->bottomScripts = [];
    // </body>

    // HEAD
    if (count($head)) {
      foreach ($head as $type => $item) {
        switch ($type) {
          case 'title':
            $this->title = $item;
            break;
          case 'metas':
            $this->metas = $item;
            break;
          case 'scripts':
            $this->scripts = $item;
            break;
          case 'links':
            $this->links = $item;
            break;
        }
      }
    }

    // BODY
    if (count($body)) {
      foreach ($body as $type => $item) {
        switch ($type) {
//          case 'content':
//            $this->content = $item;
//            break;
          case 'scripts':
            $this->bottomScripts = $item;
            break;
        }
      }
    }

    // CONTROLLER

    $this->controller = isset($page['controller']) ?
      $page['controller'] :
      NULL;

    // CONTENT TEMPLATE

    $this->contentTemplate = isset($page['contentTemplate']) ?
      $page['contentTemplate'] :
      NULL;

  } // __construct

  // PROXIES

  public function id() {
    return $this->getId();
  }
  public function addJs($script) {
    $this->addScript($script);
  }
  public function addCss($link) {
    $this->addLink($link);
  }
  public function getData() {
    return $this->hasControllerData() ? $this->getControllerData() : NULL;
  }

  // VARIABLES

  public function getId() {
    return $this->id;
  }

  public function getTitle() {
    return $this->title;
  }
  public function setTitle($title) {
    $this->title = $title;
  }

  public function getMetas() {
    return $this->metas;
  }
  public function setMetas($metas) {
    $this->metas = $metas;
  }
  public function addMetaTags($metaTags) {
    foreach ($metaTags as $metaTag) {
      $this->addMetaTag($metaTag);
    }
  }
  public function addMetaTag($metaTag) {
    $this->metas[] = $metaTag;
  }
  public function addMetaTagsAtFront($metaTags) {
    foreach ($metaTags as $metaTag) {
      $this->addMetaTagAtFront($metaTag);
    }
  }
  public function addMetaTagAtFront($metaTag) {
    array_unshift($this->metas, $metaTag);
  }

  public function getScripts() {
    return $this->scripts;
  }
  public function setScripts($scripts) {
    $this->scripts = $scripts;
  }
  public function addScripts($scripts) {
    foreach ($scripts as $script) {
      $this->addScript($script);
    }
  }
  public function addScript($script) {
    $this->scripts[] = $script;
  }
  public function addScriptsAtFront($scripts) {
    foreach ($scripts as $script) {
      $this->addScriptAtFront($script);
    }
  }
  public function addScriptAtFront($script) {
    array_unshift($this->scripts, $script);
  }

  public function getLinks() {
    return $this->links;
  }
  public function setLinks($links) {
    $this->links = $links;
  }
  public function addLinks($links) {
    foreach ($links as $link) {
      $this->addLink($link);
    }
  }
  public function addLink($link) {
    $this->links[] = $link;
  }
  public function addLinksAtFront($links) {
    foreach ($links as $link) {
      $this->addLinkAtFront($link);
    }
  }
  public function addLinkAtFront($link) {
    array_unshift($this->links, $link);
  }

  public function getBodyFilePath() {
    return $this->bodyFilePath;
  }
  public function setBodyFilePath($filePath) {
    $this->bodyFilePath = $filePath;
  }

  public function getBodyAttributes() {
    return $this->bodyAttributes;
  }
  public function setBodyAttributes($attributes) {
    $this->bodyAttributes = $attributes;
  }
  public function hasBodyAttributes() {
    return !!$this->getBodyAttributes();
  }

  public function getContentTemplate() {
    return $this->contentTemplate;
  }
  public function setContentTemplate($contentTemplate) {
    $this->contentTemplate = $contentTemplate;
  }

  public function getBottomScripts() {
    return $this->bottomScripts;
  }
  public function setBottomScripts($scripts) {
    $this->bottomScripts = $scripts;
  }
  public function addBottomScripts($scripts) {
    foreach ($scripts as $script) {
      $this->addBottomScript($script);
    }
  }
  public function addBottomScript($script) {
    $this->bottomScripts[] = $script;
  }
  public function addJsToBottom($script) {
    $this->addBottomScript($script);
  }

  public function getController() {
    return $this->controller;
  }
  public function setController($controller) {
    $this->controller = $controller;
  }
  public function hasController() {
    return !!$this->controller;
  }

  public function getControllerFile() {
    return $this->hasControllerFile() ?
      $this->getController()['file'] :
      NULL;
  }
  public function setControllerFile($file) {
    $this->controller['file'] = $file;
  }
  public function hasControllerFile() {
    return isset($this->getController()['file']);
  }

  public function getControllerLoad() {
    return $this->hasControllerLoad() ?
      $this->getController()['load'] :
      NULL;
  }
  public function setControllerLoad($load) {
    $this->controller['load'] = $load;
  }
  public function hasControllerLoad() {
    return isset($this->getController()['load']);
  }

  public function getControllerPreProcess() {
    return $this->hasControllerPreProcess() ?
      $this->getController()['preProcess'] :
      NULL;
  }
  public function setControllerPreProcess($preProcess) {
    $this->controller['preProcess'] = $preProcess;
  }
  public function hasControllerPreProcess() {
    return isset($this->getController()['preProcess']);
  }

  public function getControllerData() {
    return $this->hasControllerData() ?
      $this->getController()['data'] :
      NULL;
  }
  public function setControllerData($data) {
    $this->controller['data'] = $data;
  }
  public function hasControllerData() {
    return isset($this->getController()['data']);
  }

}
