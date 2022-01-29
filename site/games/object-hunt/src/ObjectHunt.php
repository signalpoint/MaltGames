<?php

namespace MaltKit;

use MaltKit\Game;

class ObjectHunt extends Game {

  public function __construct($id, $game) {
    $this->name = 'ObjectHunt';
    $this->version = '0.0.0';
    $this->slogan = 'Learn Objects in Another Language';
    $this->description = 'Hunt for objects and their matching translation.';
    $this->page = [
      'head' => [
        'scripts' => [
          'main.js',
          'brain.js',
          'classes/card.js',
        ],
      ],
    ];
    parent::__construct($id, $game);
  }

  public function rest() {

    return [

        'objects' => [
          'get' => [],
        ],

        'sound' => [
          'get' => [
            'header' => [
              'Content-Type' => 'audio/mpeg'
            ],
          ],
        ],

      ];

  }

  public function api($resource, $method, $data = NULL) {

    switch ($resource) {

      case 'objects':

        if ($method == 'get') {

          $language = 'vi';

          return [
            'icons' => $this->icons(),
            'words' => $this->words($language),
          ];

        }

        break;

      case 'sound':

        // * @param type $languageCode {String} The language code you want to translate to.
        // * @param type $number {String} The native number you want translated.
        if ($method == 'get') {

          $languageCode = mkArg(3);
          $word = mkArg(4);

          $words = $this->api('objects', 'get')['words'];

          $urlEncodedWord = urlencode($words[$word]);

          $url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q={$urlEncodedWord}&tl={$languageCode}&client=tw-ob";

          return file_get_contents($url, false, stream_context_create([
            'http' => [
              'ignore_errors' => true,
              'header' => "Content-Type: audio/mpeg;",
            ]
          ]));

        }

        break;

    }

  }

  /**
 * A map of English words (objects) to their respective Font Awesome 5 icon. An
 * icon value of 0 means the word maps cleanly to the icon name.
 * @return array
 */
  public function icons() {
    return [
      'ambulance' => 0,
      'anchor' => 0,
      'baby' => 0,
      'bacon' => 0,
      'bacteria' => 0,
      'band-aid' => 0,
      'barcode' => 0,
      'baseball' => 'baseball-ball',
      'basketball' => 'basketball-ball',
      'bath' => 0,
      'battery' => 'battery-full',
      'bed' => 0,
      'bicycle' => 0,
      'binoculars' => 0,
      'blender' => 0,
      'bomb' => 0,
      'bone' => 0,
      'book' => 0,
      'bowling ball' => 'bowling-ball',
      'box' => 0,
      'brain' => 0,
      'bread' => 'bread-slice',
      'broom' => 0,
      'brush' => 0,
      'bug' => 0,
      'building' => 0,
      'bullseye' => 0,
      'bus' => 0,
      'cake' => 'birthday-cake',
      'calculator' => 0,
      'calendar' => 'calendar-alt',
      'camera' => 0,
      'campground' => 0,
      'car' => 0,
      'carrot' => 0,
      'cash register' => 'cash-register',
      'cat' => 0,
      'chair' => 0,
      'charging station' => 'charging-station',
      'cheese' => 0,
      'chess' => 0,
      'bishop' => 'chess-bishop',
      'king' => 'chess-king',
      'knight' => 'chess-knight',
      'pawn' => 'chess-pawn',
      'queen' => 'chess-queen',
      'rook' => 'chess-rook',
      'child' => 0,
      'church' => 0,
      'city' => 0,
      'clock' => 0,
      'cloud' => 0,
      'rain' => 'cloud-rain',
      'coffee' => 0,
      'compass' => 0,
      'bell' => 'concierge-bell',
      'cookie' => 0,
      'couch' => 0,
      'crosshairs' => 0,
      'crow' => 0,
      'crown' => 0,
      'crutch' => 0,
      'cube' => 0,
      'dice' => 0,
      'dog' => 0,
      'dove' => 0,
      'dragon' => 0,
      'drum' => 0,
      'dumbbell' => 0,
      'dumpster' => 0,
      'egg' => 0,
      'ellipsis' => 'ellipsis-h',
      'envelope' => 0,
      'equals' => 0,
      'eraser' => 0,
      'exclamation point' => 'exclamation',
      'eye' => 0,
    ];
  }

  public function words($language) {
    $dictionary = [
      'ambulance' => [
        'es' => '',
        'vi' => 'xe cứu thương',
      ],
      'anchor' => [
        'es' => '',
        'vi' => 'mỏ neo',
      ],
      'baby' => [
        'es' => '',
        'vi' => 'đứa bé',
      ],
      'bacon' => [
        'es' => '',
        'vi' => 'Thịt ba rọi',
      ],
      'bacteria' => [
        'es' => '',
        'vi' => 'vi khuẩn',
      ],
      'band-aid' => [
        'es' => '',
        'vi' => 'băng cá nhân',
      ],
      'barcode' => [
        'es' => '',
        'vi' => 'mã vạch',
      ],
      'baseball' => [
        'es' => '',
        'vi' => 'bóng chày',
      ],
      'basketball' => [
        'es' => '',
        'vi' => 'bóng rổ',
      ],
      'bath' => [
        'es' => '',
        'vi' => 'bồn tắm',
      ],
      'battery' => [
        'es' => '',
        'vi' => 'pin',
      ],
      'bed' => [
        'es' => '',
        'vi' => 'Giường',
      ],
      'bicycle' => [
        'es' => '',
        'vi' => 'Xe đạp',
      ],
      'binoculars' => [
        'es' => '',
        'vi' => 'ống nhòm',
      ],
      'blender' => [
        'es' => '',
        'vi' => 'máy xay',
      ],
      'bomb' => [
        'es' => '',
        'vi' => 'bom',
      ],
      'bone' => [
        'es' => '',
        'vi' => 'khúc xương',
      ],
      'book' => [
        'es' => '',
        'vi' => 'sách',
      ],
      'bowling ball' => [
        'es' => '',
        'vi' => 'bóng bowling',
      ],
      'box' => [
        'es' => '',
        'vi' => 'hộp',
      ],
      'brain' => [
        'es' => '',
        'vi' => 'óc',
      ],
      'bread' => [
        'es' => '',
        'vi' => 'bánh mỳ',
      ],
      'broom' => [
        'es' => '',
        'vi' => 'chổi',
      ],
      'brush' => [
        'es' => '',
        'vi' => 'chải',
      ],
      'bug' => [
        'es' => '',
        'vi' => 'sâu bọ',
      ],
      'building' => [
        'es' => '',
        'vi' => 'Tòa nhà',
      ],
      'bullseye' => [
        'es' => '',
        'vi' => 'mắt bò',
      ],
      'bus' => [
        'es' => '',
        'vi' => 'xe buýt',
      ],
      'cake' => [
        'es' => '',
        'vi' => 'bánh ngọt',
      ],
      'calculator' => [
        'es' => '',
        'vi' => 'máy tính',
      ],
      'calendar' => [
        'es' => '',
        'vi' => 'lịch',
      ],
      'camera' => [
        'es' => '',
        'vi' => 'Máy ảnh',
      ],
      'campground' => [
        'es' => '',
        'vi' => 'khu cắm trại',
      ],
      'car' => [
        'es' => '',
        'vi' => 'xe ô tô',
      ],
      'carrot' => [
        'es' => '',
        'vi' => 'củ cà rốt',
      ],
      'cash register' => [
        'es' => '',
        'vi' => 'máy tính tiền',
      ],
      'cat' => [
        'es' => '',
        'vi' => 'con mèo',
      ],
      'chair' => [
        'es' => '',
        'vi' => 'cái ghế',
      ],
      'charging station' => [
        'es' => '',
        'vi' => 'trạm sạc',
      ],
      'cheese' => [
        'es' => '',
        'vi' => 'phô mai',
      ],
      'chess' => [
        'es' => '',
        'vi' => 'cờ vua',
      ],
      'bishop' => [
        'es' => '',
        'vi' => 'giám mục',
      ],
      'king' => [
        'es' => '',
        'vi' => 'nhà vua',
      ],
      'knight' => [
        'es' => '',
        'vi' => 'Hiệp sỹ',
      ],
      'pawn' => [
        'es' => '',
        'vi' => 'cầm đồ',
      ],
      'queen' => [
        'es' => '',
        'vi' => 'nữ hoàng',
      ],
      'rook' => [
        'es' => '',
        'vi' => 'rook',
      ],
      'child' => [
        'es' => '',
        'vi' => 'đứa trẻ',
      ],
      'church' => [
        'es' => '',
        'vi' => 'Nhà thờ',
      ],
      'city' => [
        'es' => '',
        'vi' => 'thành phố',
      ],
      'clock' => [
        'es' => '',
        'vi' => 'cái đồng hồ',
      ],
      'cloud' => [
        'es' => '',
        'vi' => 'đám mây',
      ],
      'rain' => [
        'es' => '',
        'vi' => 'cơn mưa',
      ],
      'coffee' => [
        'es' => '',
        'vi' => 'cà phê',
      ],
      'compass' => [
        'es' => '',
        'vi' => 'phạm vi',
      ],
      'bell' => [
        'es' => '',
        'vi' => 'chuông',
      ],
      'cookie' => [
        'es' => '',
        'vi' => 'bánh quy',
      ],
      'couch' => [
        'es' => '',
        'vi' => 'đi văng',
      ],
      'crosshairs' => [
        'es' => '',
        'vi' => 'ghế chéo',
      ],
      'crow' => [
        'es' => '',
        'vi' => 'con quạ',
      ],
      'crown' => [
        'es' => '',
        'vi' => 'Vương miện',
      ],
      'crutch' => [
        'es' => '',
        'vi' => 'cái nạng',
      ],
      'cube' => [
        'es' => '',
        'vi' => 'khối lập phương',
      ],
      'dice' => [
        'es' => '',
        'vi' => 'xúc xắc',
      ],
      'dog' => [
        'es' => '',
        'vi' => 'chú chó',
      ],
      'dove' => [
        'es' => '',
        'vi' => 'chim bồ câu',
      ],
      'dragon' => [
        'es' => '',
        'vi' => 'rồng',
      ],
      'drum' => [
        'es' => '',
        'vi' => 'cái trống',
      ],
      'dumbbell' => [
        'es' => '',
        'vi' => 'chuông hư',
      ],
      'dumpster' => [
        'es' => '',
        'vi' => 'bãi rác',
      ],
      'egg' => [
        'es' => '',
        'vi' => 'trứng',
      ],
      'ellipsis' => [
        'es' => '',
        'vi' => 'dấu chấm lửng',
      ],
      'envelope' => [
        'es' => '',
        'vi' => 'phong bì',
      ],
      'equals' => [
        'es' => '',
        'vi' => 'bằng',
      ],
      'eraser' => [
        'es' => '',
        'vi' => 'cục gôm',
      ],
      'exclamation point' => [
        'es' => '',
        'vi' => 'dấu chấm than',
      ],
      'eye' => [
        'es' => '',
        'vi' => 'con mắt',
      ],
    ];
    $words = [];
    foreach ($dictionary as $word => $translations) {
      $words[$word] = $translations[$language] != '' ?
        $translations[$language] : NULL;
    }
    return $words;
  }

}
