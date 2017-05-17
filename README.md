
# Flowplayer

[Сайт](https://flowplayer.org) | [Демо](https://flowplayer.org/demos/) | [Документация](https://flowplayer.org/docs/)

## Для нетерпеливых

1. [Скачать Flowplayer](https://flowplayer.org/latest)
2. Распаковать
3. Загрузить папку на сервер


## Минимальные настройки

```html
<!DOCTYPE html>

<head>
   <!-- flowplayer depends on jQuery 1.7.1+ (for now) -->
   <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

   <!-- flowplayer.js -->
   <script type="text/javascript" src="flowplayer.min.js"></script>

   <!-- player styling -->
   <link rel="stylesheet" type="text/css" href="flowplayer/minimalist.css">

</head>

<body>

   <!-- player 1 -->
   <div class="flowplayer">
      <video src="my-video.mp4"></video>
   </div>

   <!-- player 2 -->
   <div class="flowplayer">
      <video>
         <source type="video/webm" src="my-video2.webm">
         <source type="video/mp4" src="my-video2.mp4">
      </video>
   </div>

</body>

```

## Примеры API

```js
// listen to events on second player
flowplayer(1).bind("load", function (e, api, video) {

}).bind("pause", function (e, api) {

});

// work with jQuery
$(".flowplayer").bind("unload", function (e, api) {

});
```

## Компиляция Flash

- Скачать [Open Source Flex SDK, v4.5.1](http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+4.5)

```
export mxmlc=<PATH_TO>/flex_sdk_4.5.1.21328_mpl/bin/mxmlc
cd ./flowplayer # this repository
make flash
```

## Отчеты об ошибках

Пожалуйста, ознакомьтесь с [руководящими принципами](CONTRIBUTING.md), чтобы сообщить о проблемах или отправьте исправления.

## Выполнение тестов

Наш автоматический набор тестов спонсируется [BrowserStack](http://browserstack.com). Спасибо вам!

### Выполнение локально

Тесты запускаются на [BrowserStack](http://browserstack.com)

 * Установка зависимостей: `bundle install`
 * Настройка туннеля broserstack: `java -jar features/support/BrowserStackTunnel.jar -f <your tunnel api key> /path/to/flowplayer/repo`
 * Запуск функций cucumber: `rake username=<browserstack username> key=<broserstack automate api key> base_url=http://<something>.browserstack.com`

## Лицензия

[GPL v3 with an ADDITIONAL TERM per GPL Section 7](LICENSE.md)

Copyright (c) 2012 Flowplayer Ltd
