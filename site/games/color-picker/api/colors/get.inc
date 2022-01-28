<?php

// TODO dude what are you doing w/ this naming convention, you need to be using
// psr4 autoload mechanism(s) and declare a MaltKit\ApiResource and implement
//  ->get(), ->post(), etc.

function color_picker_api_colors_get($languageCode) {
  $map = [
    'es' => [
      "black" => "negro",
      "blue" => "azul",
      "brown" => "marrón",
      "gray" => "gris",
      "green" => "verde",
      "orange" => "naranja",
      "pink" => "rosa",
      "purple" => "morado",
      "red" => "rojo",
      "white" => "blanco",
      "yellow" => "amarillo",
    ],
    'vi' => [
      "black" => "màu đen",
      "blue" => "màu xanh lam",
      "brown" => "màu nâu",
      "gray" => "màu xám",
      "green" => "màu xanh lá",
      "orange" => "màu da cam",
      "pink" => "màu hồng",
      "purple" => "màu tím",
      "red" => "màu đỏ",
      "white" => "màu trắng",
      "yellow" => "màu vàng",
    ],
  ];
  return isset($map[$languageCode]) ? $map[$languageCode] : NULL;
}
