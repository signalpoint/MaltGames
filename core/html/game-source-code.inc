<!-- TODO have it open in a modal, w/ quick tabs to move between files! so sweet! -->
<!-- TODO better indentation when a folder is "opened" -->
<h5 class="mb-3" title="Browse the source code for <?php print $game['name']; ?>"><i class="fas fa-laptop-code me-2"></i>Source Code</h5>
<h6>
  <a href="https://github.com/signalpoint/MaltGames/blob/main/games/<?php print $key; ?>" class="text-muted" target="_blank">
    <i class="fas fa-folder me-2"></i><?php print $key; ?>
  </a>
</h6>
<ul class="nav flex-column">
  <?php foreach($game['src']['js'] as $jsFile) { ?>
  <li class="nav-item mb-2 ms-2">
    <a href="https://github.com/signalpoint/MaltGames/blob/main/games/<?php print $key; ?>/js/<?php print $jsFile; ?>" class="nav-link p-0 text-muted" target="_blank">
      <i class="fab fa-js-square me-2 text-sm"></i><?php print $jsFile; ?>
    </a>
  </li>
  <?php } ?>
</ul>
