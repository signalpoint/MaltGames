<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MaltGames\GameServer;

define('GAME_NEW', 1);
define('GAME_IN_PROGRESS', 2);
define('GAME_PAUSED', 3);
define('GAME_FINISHED', 4);

require 'vendor/autoload.php';
require 'games/dictionary.php';

// START THE SERVER...

  $server = IoServer::factory(
      new HttpServer(
          new WsServer(
              new GameServer()
          )
      ),
      8080
  );

  echo "Running server...\n";
  $server->run();
