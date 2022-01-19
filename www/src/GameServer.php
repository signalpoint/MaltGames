<?php

namespace MaltGames;

use stdClass;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class GameServer implements MessageComponentInterface {

    protected $clients;

    public function __construct() {

      // The WebSocket clients (Ratchet connection interfaces).
      $this->clients = new \SplObjectStorage;

      // The Players in the Game.
      $this->players = new \SplObjectStorage;

      // The Chat in the Game.
      $this->chat = new \SplObjectStorage;

      // The game status.
      $this->gameStatus = NULL;

      $this->language = NULL;

      // The game disctionary.
      $this->dictionary = NULL;

      // The words left in the Game.
      $this->words = []; // DEPRECATED

    }

    public function onOpen(ConnectionInterface $conn) {

      // If it's a new game... mark it as such.
      if (!$this->gameStatus) {

        // Load the dictionary, set it and its English words aside.

//        $this->language = 'Spanish';
//        $dictionary = wordSmashDictionaryEs();

//        $this->language = 'Vietnamese';
//        $dictionary = wordSmashDictionaryVi();

//        $this->dictionary = $dictionary;

//        foreach ($dictionary as $en => $intl) {
//          $this->words[] = $en;
//        }

        $this->gameStatus = GAME_NEW;

      }

      // Store the new connection to send messages to later
      $this->clients->attach($conn);

      echo "New connection! ({$conn->resourceId})\n";

      // Tell this new player about...

        // their new connection, their player id, the game status and the dictionary
        $data = [
          'op' => 'currentPlayerJustConnected',
          'id' => $conn->resourceId,
          'gameStatus' => $this->gameStatus,
          'language' => $this->language,
          'dictionary' => $this->dictionary,
        ];

        // any existing players,
        $existingPlayers = [];
        foreach ($this->players as $player) {
          $existingPlayers[] = $player;
        }
        $data['existingPlayers'] = count($existingPlayers) ? $existingPlayers : NULL;

      $conn->send(json_encode($data));

    }

    public function onMessage(ConnectionInterface $from, $msg) {

      $playerId = $from->resourceId;
      $data = json_decode($msg);
      $op = $data->op;

      // TODO access check: anytime a player is involved, make sure the id
      // matches their resource id :)

      echo sprintf('%s => %d', $op, $playerId) . "\n";

      switch ($op) {

        case 'addPlayer':

          $newPlayer = $data->player;
//          echo "<pre>" . print_r($data, TRUE) . "</pre>\n";

          // Add the new Player to the Game.
          $this->players->attach($newPlayer);

          // Tell any existing players about the new player.
          foreach ($this->players as $existingPlayer) {
            if ($newPlayer->_id == $existingPlayer->_id) { continue; } // Skip the new player.
            $conn = $this->getConnection($existingPlayer->_id);
            if ($conn) {
              $conn->send(json_encode([
                'op' => 'playerAdded',
                'player' => $newPlayer,
              ]));
            }
          }

          break;

        case 'setLanguage':

          $code = $data->code;

          $codeMap = [
            'es' => [
              'label' => 'Spanish',
              'callback' => 'wordSmashDictionaryEs',
            ],
            'vi' => [
              'label' => 'Vietnamese',
              'callback' => 'wordSmashDictionaryVi',
            ],
          ];

          if (isset($codeMap[$code])) {
            $map = $codeMap[$code];
            $this->language = $map['label'];
            $this->dictionary = call_user_func($map['callback']);
          }
          else {
            $this->language = NULL;
            $this->dictionary = NULL;
          }

          // Tell all the players about the language and dictionary.
          foreach ($this->players as $player) {
            $conn = $this->getConnection($player->_id);
            if ($conn) {
              $conn->send(json_encode([
                'op' => 'languageSet',
                'language' => $this->language,
                'dictionary' => $this->dictionary,
              ]));
            }
          }

          // Load the dictionary, set it and its English words aside.

//        $this->language = 'Spanish';
//        $dictionary = wordSmashDictionaryEs();

//        $this->language = 'Vietnamese';
//        $dictionary = wordSmashDictionaryVi();

          break;

        case 'updatePlayerName':

          // Load the player...
          $player = $this->getPlayer($playerId);
          if ($player) {

            // Update the player name.
            $player->_name = $data->name;

            // Tell other players about the change.
            foreach ($this->players as $otherPlayer) {
              if ($player->_id == $otherPlayer->_id) { continue; } // Skip the current player.
              $conn = $this->getConnection($otherPlayer->_id);
              if ($conn) {
                $conn->send(json_encode([
                  'op' => 'playerUpdated',
                  'player' => $player,
                ]));
              }
            }

          }

          break;

        case 'updatePlayerStatus':

          // Load the player...
          $player = $this->getPlayer($playerId);
          if ($player) {

            // Update the player status.
            $player->_gameStatus = $data->gameStatus;

            // Tell the current player we know they're ready.
            // TODO only do this when status changes to ready, right?
            $from->send(json_encode([
              'op' => $op,
              'response' => 'currentPlayerReady',
              'player' => $player,
            ]));

            // Tell other players about the change.
            foreach ($this->players as $otherPlayer) {
              if ($player->_id == $otherPlayer->_id) { continue; } // Skip the current player.
              $conn = $this->getConnection($otherPlayer->_id);
              if ($conn) {
                $conn->send(json_encode([
                  'op' => 'playerUpdated',
                  'player' => $player,
                ]));
              }
            }

          }

          break;

        case 'sendMessage':

          $msg = new stdClass();
          $msg->_playerId = $playerId;
          $msg->_text = $data->text;
          $msg->_created = time();

          // Add the message to the chat.
          $this->chat->attach($msg);

          // Send the message back to all clients.
          foreach ($this->players as $player) {
            $conn = $this->getConnection($player->_id);
            if ($conn) {
              $conn->send(json_encode([
                'op' => 'messageAdded',
                'message' => $msg,
              ]));
            }
          }

          break;

        case 'startGame':

          // Tell all the players the game has started.
          $this->gameStatus = GAME_IN_PROGRESS;
          foreach ($this->players as $player) {
            $conn = $this->getConnection($player->_id);
            if ($conn) {
              $conn->send(json_encode([
                'op' => 'gameStarted',
              ]));
            }
          }

          break;

        case 'stopGame':

          // Tell all the players the game has stopped.
          $this->gameStatus = GAME_FINISHED;
          foreach ($this->players as $player) {
            $conn = $this->getConnection($player->_id);
            if ($conn) {
              $conn->send(json_encode([
                'op' => 'gameStarted',
              ]));
            }
          }

          break;

        case 'correctAnswer':

          // Tell all the players about this correct answer. Increase the
          // current player's score by one.
          foreach ($this->players as $player) {
            if ($player->_id == $playerId) {
              $player->_score++;
            }
            $conn = $this->getConnection($player->_id);
            if ($conn) {
              $conn->send(json_encode([
                'op' => 'answeredCorrectly',
                'playerId' => $playerId,
              ]));
            }
          }

          break;

        case 'completedGame':

          $this->gameStatus = GAME_FINISHED;

          // Tell all the players about the completion of the game.
          foreach ($this->players as $player) {
            $conn = $this->getConnection($player->_id);
            if ($conn) {
              $conn->send(json_encode([
                'op' => 'gameCompleted',
                'playerId' => $playerId,
//                'dictionary' => wordSmashDictionaryEs(),
                'dictionary' => wordSmashDictionaryVi(),
              ]));
            }
          }

          break;

        default:

          echo "onmessage, unknown op: {$op}\n";

          // TODO send error message to client?

          break;

      }

//        $numRecv = count($this->clients) - 1;
//        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
//            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
//
//        foreach ($this->clients as $client) {
//            if ($from !== $client) {
//                // The sender is not the receiver, send to each client connected
//                $client->send($msg);
//            }
//        }
    }

    public function onClose(ConnectionInterface $conn) {

      $playerId = $conn->resourceId;

      // Remove the player.
      $this->removePlayer($playerId);

      // Remove the connection.
      $this->clients->detach($conn);
      echo "Connection {$playerId} has disconnected\n";

      // Tell the remaining players about the player that left.
      foreach ($this->players as $existingPlayer) {

        $conn = $this->getConnection($existingPlayer->_id);
        if ($conn) {
          $conn->send(json_encode([
            'op' => 'playerRemoved',
            'id' => $playerId,
          ]));
        }

      }

      // Remove any chat messages from this player.
      foreach ($this->chat as $message) {

        if ($message->_playerId === $playerId) {
          $this->chat->detach($message);
        }

      }

      // TODO doesn't seem to be working
      // If this was the last connection, set the game back to new.
      if ($this->clients->count() === 1) {
        $this->status = GAME_NEW;
      }

    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

    public function getConnection($id) {
      foreach ($this->clients as $client) {
        if ($client->resourceId == $id) { return $client; }
      }
      return NULL;
    }

    public function getPlayer($id) {
      foreach ($this->players as $player) {
        if ($player->_id == $id) { return $player; }
      }
      return NULL;
    }

    public function removePlayer($id) {
      $player = $this->getPlayer($id);
      if ($player) {
        $this->players->detach($player);
        echo "Removed player {$id}\n";
      }
    }

}
