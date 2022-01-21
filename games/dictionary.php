<?php

function maltGamesDictionary($gameKey, $languageCode) {
  $map = [
    'color-smash' => [
      'vi' => 'colorSmashDictionaryVi',
    ],
  ];
  return isset($map[$gameKey]) && isset($map[$gameKey][$languageCode]) ?
    $map[$gameKey][$languageCode] : NULL;
}

/**
 * SPANISH
 */
function wordSmashDictionaryEs() {
  // TODO should've used array_merge to pull in color-picker dictionary
  return [
    "black" => "negro",
    "blue" => "azul",
    "brown" => "marrón",
    "chicken" => "pollo",
    "friend" => "amigo",
    "gray" => "gris",
    "green" => "verde",
    "goodbye" => "adiós",
    "hello" => "hola",
    "love" => "amor",
    "no" => "no",
    "orange" => "naranja",
    "pink" => "rosa",
    "purple" => "morado",
    "red" => "rojo",
    "water" => "agua",
    "what" => "qué",
    "white" => "blanco",
    "yes" => "sí",
    "yellow" => "amarillo",
  ];
}

/**
 * VIETNAMESE
 */
function wordSmashDictionaryVi() {
  // TODO should've used array_merge to pull in color-picker dictionary
  return [
    "black" => "màu đen",
    "blue" => "màu xanh lam",
    "brown" => "màu nâu",
    "chicken" => "gà",
    "dad" => "bố",
    "grandma" => "bà",
    "grandpa" => "ông",
    "gray" => "màu xám",
    "green" => "màu xanh lá",
    "love" => "yêu",
    "mom" => "mẹ",
    "no" => "không",
    "noodle" => "bún",
    "not yet" => "chưa",
    "orange" => "màu da cam",
    "over there" => "đằng kia",
    "pink" => "màu hồng",
    "purple" => "màu tím",
    "red" => "màu đỏ",
    "today" => "hôm nay",
    "tomorrow" => "ngày mai",
    "water" => "nước",
    "white" => "màu trắng",
    "yes" => "có",
    "yesterday" => "hôm qua",
    "yellow" => "màu vàng",
  ];
}
