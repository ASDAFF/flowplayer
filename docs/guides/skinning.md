*   [Skinning with CSS](#skinning-with-css)
*   + [Loading the skin](#loading-the-skin)
    *   [Server side](#server-side)
*   + [Brand colors](#brand-colors)
    *   [Brand](#brand)
    *   [Control bar](#control-bar)
    *   [Play button](#play-button)
    *   [Canvas](#canvas)
*   + [Themes](#themes)
    *   [Default](#default)
    *   [Minimal](#minimal)
    *   [Playful](#playful)
    *   [Fixed controls](#fixed-controls)
*   + [Timeline](#timeline)
    *   [Slim](#slim)
    *   [Full](#full)
    *   [Fat](#fat)
    *   [No buffer](#no-buffer)
*   + [Icons](#icons)
    *   [Edgy](#edgy)
    *   [Outlined](#outlined)
    *   [Mute button](#mute-button)
    *   [No volume](#no-volume)
    *   [Combined](#combined)
    *   [Extension icons](#extension-icons)
*   [Right to left support](#rtl)
*   + [States](#states)
    *   [Configurable states](#configurable-states)
    *   [Extension and plugin states](#extension-and-plugin-states)
*   + [HTML layout](#html-layout)
    *   [Custom controls](#custom-controls)
        *   [Hiding controls](#hiding-controls)
        *   [Adding controls](#adding-controls)
    *   [Custom UI elements](#custom-ui-elements)
    *   [fp-toggle](#fp-toggle)
*   + [Commercial features](#commercial-features)
    *   [Context menu](#context-menu)
    *   [Logo](#logo)
*   [Migration from Version 6](#migration-from-version-6)


# Skinning with CSS

The Flowplayer skin is designed with [CSS3](http://www.w3schools.com/css/css3_intro.asp). It offers extreme flexibility when it comes to customization.

There are various approaches to tailor the design to your wishes:

1.  change the [brand colors](#brand-colors) via CSS
2.  add CSS **modifier** classes to the container element to pick a [theme](#themes) and change [icons](#icons) and [timeline controls](#timeline)
3.  override some directives with your own CSS
4.  clone our default skins and edit them - the skin resources are managed in [GitHub](http://github.com/flowplayer/flowplayer/tree/master/skin)
5.  write a skin from scratch

Typically you use a combination of 1, 2, and 3.


# Loading the skin

The skin [stylesheet](//releases.flowplayer.org/7.0.4/skin/skin.css) is loaded in the HEAD section of the page:

```html
<link rel="stylesheet" href="//releases.flowplayer.org/7.0.4/skin/skin.css">
```

To use the skin you can:

1.  download it and put it on your [server](#server-side) or
2.  load it directly from our CDN URL as shown above


## Server side

The Flowplayer skin also contain fonts instead of graphics for fast loading. The font files must be served on a loose cross-origin policy ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)) with an appropriate `Access-Control-Allow-Origin` header if they are loaded from a different domain, for instance when the player is [shared](sharing.html).

Simple apache sample config:

```
Header set Access-Control-Allow-Origin "*"
```

For more details look up [cross-orgin resource sharing](http://enable-cors.org/).


# Brand colors

The most decisive aspect in making the player "yours" is to set the brand color.


## Brand

Change the color of the progress bar and active menu items with a CSS directive for the `fp-color` class:

```css
.flowplayer .fp-color {
  background-color: #373484;
}
```

Default color: `#00abcd`.


## Control bar

```css
.flowplayer .fp-controls {
  background-color: #ec6c4c;
}
```

By default the control bar background is transparent.

## Play button

The big play button in the center of the screen can be emphasized with circled background color:

```css
.flowplayer .fp-color-play {
  fill: #ec6c4c;
}
```

Flowplayer's handling of the on-screen play button is unconventional: It is only visible until playback is initiated. From then only pause and play action indicators alert to the change of player state at the moment of pausing or resuming.

The player can still be customize to feature the traditional approach of showing a center-screen play button during pause as in [this demo](http://demos.flowplayer.org/lookandfeel/traditional-play-button.html).


## Canvas

The player canvas is normally visible only when the video is letterboxed or pillarboxed in fullscreen more, or during the transition from one playlist item to another. Its color is dark grey: `#333`.

Make the canvas black:

```css
.flowplayer.is-ready .fp-player {
  background-color: #000;
}
```

See also the `bgcolor` [option](setup.html#player-options) for the Flash failover.

For HTML5 video even the canvas color can be used for effect and changed dynamically. Play [this](http://demos.flowplayer.org/playlist/adverts-in-playlist) in fullscreen.

# Themes

Three themes are available for the overall look of the player.

## Default

This is how the skin looks like without and modifications:

![alt-текст](../img/2017-05-22_032241.jpg)

```html
<div class="flowplayer"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

[view standalone page](https://flowplayer.org/standalone/skin/default.html)

## Minimal

A highly stripped mode when not in fullscreen mode with just a short and slim [timeline](#timeline). In fullscreen all the configured buttons are visible and the timeline is usable. [Outlined icons](#outlined) only. Use on special occasions when you don't want the player skin to be in the way at all.

Set up by adding the `fp-minimal` class to the container element.


```html
<div class="flowplayer fp-minimal"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```



[view standalone page](/standalone/skin/minimal.html)


## Playful

The playful theme uses the [fat](#fat) (tall) [timeline](#timeline) design with <span style="background-color:#006680;color:#fff">petrol</span> `#006680` background color and <span style="color:#ec6c4c">orange</span> `#ec6c4c` brand color.

Set up by adding the `fp-playful` class to the container element.

```html
<div class="flowplayer fp-playful"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## Fixed controls

Normally player controls are shown when hovering over the player or in paused [state](#states). By adding the `no-toggle` class to the container element you can make them stick and always visible.

```html
<div class="flowplayer no-toggle"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

# Timeline

Change the looks of the timeline with CSS classes.


## Slim

A slim timeline, expanding on mouseover, can be set up by adding the `fp-slim` class to the container element.

```html
<div class="flowplayer fp-slim"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## Full

Positions the timeline above the controlbar buttons and makes it span the whole width, similar to the YouTube player. Can be set up by adding the `fp-full` class to the container element.

```html
<div class="flowplayer fp-full"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## Fat

To enhance the prominence of the brand color with a tall timeline add the `fp-fat` class to the container element.

```html
<div class="flowplayer fp-fat"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## No buffer

The buffer indicator can be removed by adding the `no-buffer` class to the container element.

```html
<div class="flowplayer no-buffer"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

# Icons

Customize the look of, and add/remove interactive icons with CSS classes.


## Edgy

Angular icons are set up by adding the `fp-edgy` class to the container element.

```html
<div class="flowplayer fp-edgy"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## Outlined

Outlined icons are set up by adding the `fp-outlined` class to the container element.

```html
<div class="flowplayer fp-outlined"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## Mute button

A mute/unmute button can be added with the `fp-mute` class.

```html
<div class="flowplayer fp-mute"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## No volume

The volume control can be removed by adding the `no-volume` class to the container element. This is done automatically on mobile devices where the volume and can only be changed via device controls.

```html
<div class="flowplayer no-volume"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## Combined

[Timeline](#timeline) and [icon](#icons) modifiers can be combined, offering a multitude of easy custom variants. Example combining the [fp-full](#full), [fp-edgy](#edgy) and [fp-outlined](#outlined) modifiers:

```html
<div class="flowplayer fp-full fp-edgy fp-outlined"
     data-aspect-ratio="12:5">
   <video>
      <source type="video/webm"
              src="//edge.flowplayer.org/functional.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/functional.mp4">
      </video>
</div>
```

## Extension icons

*   `fp-default-playlist` [playlist extension](playlist.html#interface)
*   `fp-custom-playlist` [playlist extension](playlist.html#interface)


# Right to left support

Flowplayer inherently supports right-to-left layouts. On pages which have set RTL direction globally:

```css
body {
   direction: rtl;
}
```

Flowplayer will automatically do the right thing and become a right to left video player.

Of course you can also set up Flowplayer in the opposite direction of the body. The following CSS directives will result in left to right players on a right to left page:

```css
body {
   direction: rtl;
}
.flowplayer {
   direction: ltr;
}
```

A demo of a right to left player on a left to right page can be found [here](/demos/i18n/).

# States

The player can be in various states during playback, and for each state there is a CSS class name which is added or removed according to the current state. For example:

```html
<div class="is-ready is-paused">
   <video>
      <source type="video/mp4" src="//mydomain.com/my/video.mp4">
   </video>
</div>
```

As you can specify CSS directives for these states you gain a powerful tool to skin the player and the descendant elements **dynamically** during the lifetime of a player. Most of our demos are just CSS "programming". This is where Flowplayer excels as a truly HTML-based video player: concept and design evolve smoothly from the core structure of the underlying markup language.

These classes are in use no matter whether you are using a default or custom skin. By convention all state class names start with an "is-" prefix.

*   `is-closeable` a close/unload button replaces the fullscreen toggler
*   `is-disabled` after the _disabled()_ [method](/docs/api.html#methods) was called
*   `is-dvr` when the player is set up to play a live DVR stream
*   `is-embedded` while the player is embedded at an external site
*   `is-error` after a player error has occured
*   `is-finished` after playback has finished - [view demo](/demos/timeline#endscreen-demo)
*   `is-fullscreen` while the player is in fullscreen mode; native or not
*   `is-help` while the help overlay is displayed
*   `is-inverted` while remaining time is shown instead of current position
*   `is-live` when the player is set up to play a live stream
*   `is-long` when the video duration exceeds 1 hour
*   `is-loading` while the video is initially loading
*   `is-mouseout` while the mouse is outside the player area
*   `is-mouseover` while the mouse hovers over the player area
*   `is-muted` while the player is muted
*   `is-paused` while the player is paused
*   `is-playing` while the player is playing
*   `is-poster` while the player is in [poster](/docs/setup.html#poster) state
*   `is-ready` once player and video are completely loaded
*   `is-seeking` while the player is seeking
*   `is-splash` while the [splash screen](/docs/setup.html#splash) is visible and awaits a click
*   `is-touch` when the device supports touch controls

## Configurable states

The following of the above state classes can be specified by the user at installation time in the same way as [modifier classes](#modifier-classes). Accordingly they also affect the player behaviour and user experience. They work like [configuration options](/docs/setup.html#player-options), and indeed adding the `is-splash` class to the container element has the same effect as setting `splash: true` in the JavaScript configuration.

*   `is-closeable` the player can be unloaded via a close button - fullscreen mode can only be toggled via the "f" [keyboard shortcut](/docs/setup.html#keyboard)
*   `is-dvr` tells the player that it will play back a live DVR stream, seekable inside its DVR window; JavaScript alternative: _dvr_ [option](/docs/setup.html#player-options) - [view demo](http://demos.flowplayer.org/basics/dvr.html)
*   `is-inverted` tells the player to show the remaining time instead of the duration of the movie; can still be toggled by clicking on the time element [view demo](http://demos.flowplayer.org/lookandfeel/site-intro.html)
*   `is-live` tells the player that it will play back a live stream, controls specific to video on demand are not shown; JavaScript alternative: _live_ [option](/docs/setup.html#player-options) - [view demo](http://demos.flowplayer.org/basics/live.html)
*   `is-splash` enforces a [splash](/docs/setup.html#splash) setup; JavaScript alternative: _splash_ [option](/docs/setup.html#player-options)


## Extension and plugin states

The following classes are dynamically applied to the container element as dynamic [state indicators](#state) by player extensions or plugins:

*   `is-ad-visible` [AdSense plugin](asf.html#css-classes)
*   `is-ad-visible` [VAST plugin](vast.html#css-classes)
*   `is-ad-nonlinear` [adsense plugin](asf.html#css-classes)
*   `is-ad-nonlinear` [VAST plugin](vast.html#css-classes)
*   `is-audio` [Audio plugin](plugins.html#audio-css-classes)
*   `is-audio-only` [Audio plugin](plugins.html#audio-css-classes) (configurable state)
*   `is-background` [Background plugin](plugins.html#background-css-classes)
*   `is-open` [Overlay plugin](plugins.html#overlay-css-classes)
*   `is-overlaid` [Overlay plugin](plugins.html#overlay-css-classes)
*   `cue{index}` [cuepoints extension](cuepoints.html#css-classes)
*   `cue{index}` [subtitles extension](subtitles.html#css-classes)
*   `has-menu` [subtitles extension](subtitles.html#css-classes)
*   `last-video` [playlist extension](playlist.html#css-classes)
*   `video{index}` [playlist extension](playlist.html#css-classes)


# HTML layout

Here is the HTML layout rendered by the player. All elements inside the root are prefixed with "fp-" to avoid name collisions

```html
<!-- player root -->
<div class="flowplayer fp-default-playlist is-ready is-paused is-mouseout" data-ratio="0.4167" data-flowplayer-instance-id="0">
   <!--
      A magic element that specifies the aspect ratio on different screen sizes
      http://ansciath.tumblr.com/post/7347495869/css-aspect-ratio
   -->
   <div class="fp-ratio" style="padding-top: 41.67%;"></div>
   <!-- core player element -->
   <div class="fp-player">
 
      <!-- video or object tag depending on browser support (here it's just DIV) -->
      <div class="fp-engine"></div>
 
      <!-- user interface -->
      <div class="fp-ui">
 
         <!-- loading indicator -->
         <div class="fp-waiting"> <em></em> <em></em> <em></em> </div>
 
         <!-- top buttons -->
         <div class="fp-header">
            <a class="fp-share fp-icon"></a>
            <a class="fp-fullscreen fp-icon"></a>
            <a class="fp-unload fp-icon"></a>
         </div>
 
         <!-- playback speed display -->
         <p class="fp-speed-flash"></p>
 
         <!-- big play/pause button -->
         <div class="fp-play fp-visible">
            <a class="fp-icon fp-playbtn"></a>
            <svg class="fp-play-rounded-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <svg class="fp-play-rounded-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.844 99.8434">
            <svg class="fp-play-sharp-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <svg class="fp-play-sharp-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.844 99.8434">
         </div>
         <div class="fp-pause">
            <a class="fp-icon fp-playbtn"></a>
            <svg class="fp-pause-sharp-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.8434 99.8434">
            <svg class="fp-pause-sharp-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <svg class="fp-pause-rounded-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.8434 99.8434">
            <svg class="fp-pause-rounded-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
         </div>
 
         <!-- controlbar -->
         <div class="fp-controls">
 
            <!-- play/pause button -->
            <a class="fp-icon fp-playbtn"></a>
            <!-- current playback time -->
            <span class="fp-elapsed">00:00</span>
 
            <!-- timeline, progress bar -->
            <div class="fp-timeline fp-bar">
               <div class="fp-buffer" style="width: 13.8954%;"></div>
               <span class="fp-timestamp"></span>
               <div class="fp-progress fp-color"></div>
            </div>
 
            <!-- duration/remaining time -->
            <span class="fp-duration">00:28</span>
            <span class="fp-remaining">00:28</span>
 
            <!-- volume control -->
            <div class="fp-volume">
               <a class="fp-icon fp-volumebtn"></a>
               <div class="fp-volumebar fp-bar-slider">
                  <em class="fp-color"></em>
                  <em class="fp-color"></em>
                  <em class="fp-color"></em>
                  <em class="fp-color"></em>
                  <em class="fp-color"></em>
                  <em class="fp-color"></em>
                  <em class="fp-color"></em>
               </div>
            </div>
 
            <strong class="fp-speed fp-hidden"></strong>
 
            <!-- captions (subtitle) button -->
            <strong class="fp-cc fp-hidden">CC</strong>
         </div>
         <div class="fp-menu fp-share-menu">
            <strong>Share</strong>
            <a class="fp-icon fp-twitter">Twitter</a>
            <a class="fp-icon fp-embed" title="Copy to your site">Embed</a>
         </div>
 
         <!-- caption (subtitle) menu -->
         <div class="fp-menu fp-subtitle-menu">
            <strong>Closed Captions</strong>
            <a class="fp-selected" data-subtitle-index="-1">No subtitles</a>
         </div>
      </div>
 
      <!-- context menu - customizable or omitted in licensed players -->
      <div class="fp-context-menu fp-menu"><!-- ... --></div>
 
      <!-- captions (subtitles) if present -->
      <div class="fp-captions"></div>
   </div>
 

   <!-- any custom HTML goes here -->
   
</div>
```

Whether you are using the shipped skin or building your own from scratch Flowplayer skinning is all about writing CSS for the layout shown above and taking advantage of the and player [state](#states) classes.

## Custom controls

Control elements can be added or removed (hidden) with great ease.

### Hiding controls

Control elements are hidden via CSS. The following rule hides the duration indicator:

```css
.flowplayer .fp-duration {
  display: none;
}
```

Note that the remaining control elements will align themselves automatically. There will be no gap where the duration indicator was hidden.

### Adding controls

Elements can be added to the controlbar - `.fp-controls` - and header - `.fp-header` - UI elements. Take a look at [this example](http://demos.flowplayer.org/lookandfeel/fs-controlbar.html) which shows how to move the fullscreen button from the header element to the controlbar.

This also applies to menus, the [speed menu plugin](plugins.html#speed-menu) is an example; check its [source code](https://github.com/flowplayer/flowplayer-speed-menu).

Similarly to [hiding control elements](#hiding-controls) the other elements adjust themselves automatically.

## Custom UI elements

You can add your own UI elements to the player area. To be operational - e.g. clickable - they must be stacked on top of the Flowplayer UI in the z-axis with a `z-index` of at least `1`. As This also applies to added elements interfacing existing Flowplayer functionality or extensions.

Similarly any **interactive** overlayed element must be stacked on top accordingly, for instance if [cuepoints](/docs/cuepoints.html) should be clickable links as shown [here](http://demos.flowplayer.org/lookandfeel/link-cues.html).

## fp-toggle

An added element with the magic `class="fp-toggle"` behaves like a play button: it toggles between paused and playing state by invoking the `toggle()` [API method](api.html#methods). That way you can add a complete custom playback control without any extra scripting.

This comes in handy for example if you want to add a customized [replay button](http://demos.flowplayer.org/lookandfeel/finish.html).

# Commercial features

## Context menu


For commercial setups, a custom context menu can be added by inserting the following html inside the player container:

```html
<!-- requires both fp-context-menu and fp-menu classes -->
<div class="fp-context-menu fp-menu">
   <strong>Context menu</strong>
   <a href="#">First menu item</a>
   <a href="#">Second menu item</a>
</div>
```

## Logo

If a logo is [configured](setup.html#commercial-options) its appearance can be customized via CSS: [position](http://demos.flowplayer.org/commercial/logo-right.html), size, [dynamic visibility](http://demos.flowplayer.org/commercial/logo-mouseover.html) etc.

To hide the logo on the origin domain and show it only on foreign sites the player is [shared](sharing.html) to, simply hide the logo with your site's CSS:

```css
.flowplayer .fp-logo {
  display: none;
}
```

The code used for sharing will ignore this local CSS directive, and the logo will be visible as intended.

# Migration from Version 6

There is [only one](#loading-the-skin) (default) skin to load. All easy customization is done by adding CSS classes.

[Hiding](#hiding-controls) and [adding](#adding-controls) control elements has become much easier as other elements will re-arrange themselves automatically.

[Context menu](#context-menu) items are not list items anymore. The element additionally requires the `fp-menu` class.

The logo is always visible, also on the origin domain. The old behavior can be implemented with [a simple CSS rule](#logo).