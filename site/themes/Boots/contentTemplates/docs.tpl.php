<?php

function docsRenderItem($item, $depth = 0) {

  $site = $GLOBALS['site'];
  $baseUrl = $site->getBaseUrl();
  $currentPath = mkPath();

  $route = $site->getRoute($item['route']);
  $path = $route->getPath();
  $isActive = $currentPath == $path;
  $linkAttrs = [
    'href' => $baseUrl . "/{$path}",
    'class' => [
      'nav-link',
    ],
  ];
  if ($depth > 0) {
    $linkAttrs['class'][] = 'text-muted';
  }
  if ($isActive) {
    $linkAttrs['class'][] = 'active';
    $linkAttrs['class'][] = 'text-decoration-underline';
    $linkAttrs['aria-current'] = 'page';
  }

  $html = '<a ' . mkAttributes($linkAttrs) . '>' . $item['text'] . '</a>';

  if (isset($item['routes'])) {
    $depth++;
    $html .= '<ul class="nav flex-column ms-' . $depth . ' ps-' . $depth . '">';
    foreach ($item['routes'] as $subRoute) {
      $html .= '<li class="nav-item">' . docsRenderItem($subRoute, $depth) . '</li>';
    }
    $html .= '</ul>';
  }

  return $html;

}

?>
<div class="container">

  <h1 class="visually-hidden">MaltKit Documentation</h1>

  <div class="row">

    <div class="col-12 col-md-2 border-end">

      <h2 class="visually-hidden">Table of Contents</h2>
      <ul class="nav flex-column">
        <?php
          foreach (mkDocsTableOfContentsMenu() as $item) {
        ?>
        <li class="nav-item"><?php print docsRenderItem($item); ?></li>
        <?php
          }
        ?>
      </ul>

    </div>

    <div class="col-12 col-md-10">

      <?php

      require $site->getCurrentRoute()->getPage()->getBodyFilePath();

      ?>

    </div>

  </div>


</div>
