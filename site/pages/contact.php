<div class="container">

  <h1 class="mb-3">Contact</h1>

  <p>Please use any of the following mediums to contact us...</p>

  <ul class="list-group mb-3">
    <?php foreach (mkSocialNetworks() as $name => $item) { ?>
    <li class="list-group-item">
      <i class="fab fa-<?php print $name; ?> fa-lg me-2"></i>
      <a href="<?php print $item['url']; ?>" target="_blank" title="<?php print $item['title']; ?>">
        <?php print $item['handle'] ? "@{$item['handle']}" : $item['title']; ?>
      </a>
    </li>
    <?php } ?>
  </ul>

</div>
