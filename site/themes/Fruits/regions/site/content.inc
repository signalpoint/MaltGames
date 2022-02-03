<?php

$pageContentTemplateName = $page->getContentTemplate();
if ($pageContentTemplateName) {
  $contentTemplate = $theme->getContentTemplate($pageContentTemplateName);
  require $contentTemplate['file'];
}
else {
  require $page->getBodyFilePath();
}
