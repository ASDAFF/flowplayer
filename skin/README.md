
# Использование CSS-классов

## Параметры шкалы времени
`(no class)` – по умолчанию

`.flow-slim` – тонкая шкала времени

`.flow-full` – шкала времени над кнопками (стиль YouTube)

`.flow-fat` – Высокая шкала времени (стиль Wistia)


## Модификаторы
`.flow-edgy` – без закругления границ в любом элементе


## Iconsets (coming soon)
`(no class)` – сплошной белый

`.flow-outlined` – только контур

`.flow-edgy` – сплошная, без закругления

`.flow-outlined.flow-edgy` – выделено, без закругления



## Stripping out elements
`.flow-fullscreen { display: none }`

`.flow-volume { display: none }`

etc...


## Brand coloring
`.flow-controls { background-color: #373484 }` – controlbar background color

`.flow-color { background-color: #373484, fill: #ec6c4c }` – progress bars, play button & active menu items

No stronger selector or `!important` is needed.

## Skins

**functional** = default settings
**playful** = `.flow-fat`, 2 brand colors, play button background
**minimal** = `.flow-minimal`

The minimal mode is a highly stripped mode when *not* in fullscreen mode. The timeline is not even clickable. In fullscreen all the configured buttons are visible and timeline is usable. Uses outlined icons.

Playful skin uses Flowplayer colors by default:

- `#016682` for controlbar
- `#ec6c4c` as "flow-color"




## Эффекты

`-grayscale` – apply "grayscale" effect for the video
`-sepia` – apply "sepia" effect for the video
`-blur` – apply "blur" effect for the video


## Внутреннее использование
`.flow-ui-shown` – элементы управления всегда отображаются при наведении курсора, при паузе

`.no-flex` – нет поддержки flexbox

`.is-rtl` – поддержка RTL

`.flow-play.flow-visible` – основная кнопка воспроизведения отображается в течение 300 мс


