<div class="container">

  <h1 class="visually-hidden">MaltKit Documentation</h1>

  <div class="row">

    <div class="col-12 col-md-2 border-end">

      <h2 class="visually-hidden">Table of Contents</h2>
      <ul class="nav flex-column">
        <?php
          foreach (mkDocsTableOfContentsMenu() as $item) {
            $route = $site->getRoute($item['route']);
            $path = $route->getPath();
//            mkDump($route);
            $isActive = $currentPath == $path;
            $linkAttrs = [
              'href' => $baseUrl . "/{$path}",
              'class' => [
                'nav-link',
              ],
            ];
            if ($isActive) {
              $linkAttrs['class'][] = 'active';
              $linkAttrs['aria-current'] = 'page';
            }
        ?>
        <li class="nav-item">
          <a <?php print mkAttributes($linkAttrs); ?>><?php print $item['text'];  ?></a>
        </li>
        <?php } ?>
      </ul>

    </div>

    <div class="col-12 col-md-10">

      <?php

      require $site->getCurrentRoute()->getPage()->getBodyFilePath();

      ?>

    </div>

  </div>


</div>
