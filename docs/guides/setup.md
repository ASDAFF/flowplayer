*   [DOCTYPE](#doctype)
*   [Prerequisites](#prerequisites)
*   − [Installation](#installation)
    *   [3 ways to install](#3-ways-to-install)
    *   [2 installation categories](#2-installation-categories)
    *   [Video tag based](#videotag-install)
        *   [Automatic installation](#automatic)
        *   [Manual installation with jQuery](#manual)
    *   [Pure JavaScript](#javascript-install)
        *   [Clip object](#clip-object)
    *   [Installation summary](#installation-summary)
*   + [Video](#video)
    *   [Clip and sources](#clip-and-sources)
    *   [Video formats](#video-formats)
    *   [HLS](#hls)
        *   [Cost effective](#cost-effective)
        *   [Live streaming](#live-streaming)
        *   [HLS quality selection](#hls-quality-selection)
        *   [DRM](#drm)
    *   [Recommended format offerings](#recommended-format-offerings)
    *   [Picking order](#picking-order)
*   + [Layout](#layout)
    *   [Player size](#player-size)
    *   [Start screen](#start-screen)
        *   [Poster](#poster)
        *   [Splash](#splash)
*   + [Configuration](#configuration)
    *   [Player options](#player-options)
    *   [Extension and plugin options](#extension-and-plugin-options)
    *   [Commercial configuration](#commercial-configuration)
        *   [Commercial prerequisites](#commercial-prerequisites)
        *   [Commercial options](#commercial-options)
        *   [Custom context menu](#custom-context-menu)
    *   [Clip options](#clip-options)
    *   [Extension and plugin clip options](#extension-and-plugin-clip-options)
    *   [Source options](#source-options)
    *   [Video tag attributes](#video-tag-attributes)
    *   [Global JavaScript configuration](#global-configuration)
    *   [Local JavaScript configuration](#local-configuration)
    *   [HTML configuration](#html-configuration)
    *   [Order of precedence](#configuration-precedence)
    *   [Configuration summary](#configuration-summary)
*   [Keyboard](#keyboard)
*   [Iframe](#iframe)
*   + [Engines](#engines)
    *   [html5 engine](#html5-engine)
        *   [HTML5 video](#html5-video)
    *   [Flash engine](#flash-engine)
        *   [Flash HLS](#flash-hls)
        *   [Flash video (RTMP)](#flash-video-rtmp)
*   + [Server side](#server-side)
    *   [Mime types](#mime-types)
    *   [HTTPS](#https)
    *   [Cross domain](#cross-domain)
    *   [Redirecting](#redirecting)
    *   [Random seeking](#random-seeking)
    *   [CDN](#cdn)
*   + [Advanced Flash configuration](#advanced-flash-configuration)
    *   [flashls](#flashls)
    *   [RTMP options](#rtmp-options)
*   [Migration from Version 6](#migration-from-version-6)
*   [Migration from Version 5](#migration-from-version-5)

# DOCTYPE

At the top of your page declare the HTML5 [doctype](http://www.w3schools.com/tags/tag_doctype.asp):

```html
<!DOCTYPE html>
```

This is mandatory. Otherwise HTML5 video will not work in some browsers, notably Internet Explorer 9.


# Prerequisites

Load the required assets and declare the page title - the TITLE tag is mandatory for HTML5 pages - in the [HEAD](http://www.w3schools.com/tags/tag_head.asp) section of your page:

```html
<title>My Flowplayer video</title>
 
<!-- 1. skin -->
<link rel="stylesheet" href="//releases.flowplayer.org/7.0.4/skin/skin.css">
 
<!-- 2. jquery library - required for video tag based installs -->
<script src="//code.jquery.com/jquery-1.12.4.min.js"></script>
 
<!-- 3. flowplayer -->
<script src="//releases.flowplayer.org/7.0.4/flowplayer.min.js"></script>
```

*   These assets are served globally from a content delivery network (Amazon CloudFront). Free for you to use.
*   You can place the files on your own servers too, maybe combine them with your existing files for faster initial load. The latest commercial version is always available from your [account page](/account/#players), while the free version can be found on the [free download page](/latest).
*   [jQuery](http://jquery.com/) v1.7.2+ is required for [VIDEO tag based installations](setup.md#videotag-install). Make sure to load only one version of the library when integrating Flowplayer in an existing page.
*   [Alternate skins](skinning.md) are available.
*   In general it is recommended to load CSS stylesheets before JavaScript assets.
*   It is not recommended to load the Flowplayer and jQuery Javascripts in the BODY or at the end of the document.


# Installation

For each player you need to prepare a html [DIV element](http://www.w3schools.com/tags/tag_div.asp) as player **container** inside the [BODY](http://www.w3schools.com/tags/tag_body.asp) of your page.

*   <span class="label">Note</span> Sections exclusively dedicated to [VIDEO tag based installations](setup.md#videotag-install) are flagged with a pink border, sections exclusively dedicated to [pure JavaScript installations](setup.md#javascript-install) with a green border.  
    Advanced opions and functions are colored

## 3 ways to install

*   [automatic installation](setup.md#automatic): quick, no fuss, no scripting required, and yet entirely customizable, including complete API access if the need arises
*   [manual installation](setup.md#manual-install): install on demand, individual customization both in HTML and JSON syntax
*   [pure JavaScript installation](setup.md#javascript-install): complete and consistent control via JavaScript, no dependence on external libraries, advanced configuration and seamless API integration

## 2 installation categories

*   [video tag based](setup.md#videotag-install) - precondition: a [html VIDEO tag](http://www.w3schools.com/tags/tag_video.asp) inside the container element on the page

 ```html
 <video>
    <source type="application/x-mpegurl" src="//mydomain.com/video.m3u8">
    <source type="video/mp4"             src="//mydomain.com/video.mp4">
 </video>
 ```

*   [purely JavaScript based](setup.md#javascript-install) - precondition: a JavaScript [clip](#clip-and-sources) object in the [player configuration](setup.md#player-options)

    ```js
    clip: {
        sources: [
              { type: "application/x-mpegurl",
                src:  "//mydomain.com/video.m3u8" },
              { type: "video/mp4",
                src:  "//mydomain.com/video.mp4" }
        ]
    }
    ```

## Video tag based

These installation methods require the [jQuery library](http://jquery.com/) to be [loaded](#prerequisites).

Always use SOURCE tags inside the VIDEO tag and specify the video `type`. Flowplayer will then tweak the VIDEO tag as needed by platform or browser. Or, for the [Flash](#flash) engine, replace it with a Flash OBJECT.

Advantages of video tag based installations:

*   The video is represented in the page source code in a **static** fashion. For you, as the page creator: **what you see is what you mean**.
*   For many users the easiest way to get started.

Restrictions of video tag based installations:

*   Fine-tuning the configuration on the [clip](setup.md#clip-options) and [source](setup.md#source-options) level is not possible or only in a restricted way for [playlists](playlists.html).

### Automatic installation

Flowplayer will be installed automatically into each container element for which the magic CSS class `"flowplayer"` is specified:

```html
<div class="flowplayer">
   <video>
      <source type="application/x-mpegurl" src="//mydomain.com/video.m3u8">
      <source type="video/mp4"             src="//mydomain.com/video.mp4">
   </video>
</div>
```

Advantages of the automatic installation method:

*   no further scripting required
*   players can be individually customized even with this automated installation: [all options on all levels](setup.md#configuration-summary) are also available in [HTML notation](#configuration).

Restriction of the automatic installation method:

*   will and can only be run **once** at page load.

The automatic method is used in the [quick start guide](quickstart.html) and an example for the automatic method is shipped with each Flowplayer distribution as [minimal example setup](//releases.flowplayer.org/7.0.4/index.html).

*   <span class="label">Recommendation</span> The automatic installation method is ideal to get started with Flowplayer, and for quick no-fuss results.

[view standalone page](/standalone/basics/minimal.html)



### Manual installation with jQuery

```html
<div class="player">
   <video>
      <source type="application/x-mpegurl" src="//mydomain.com/video.m3u8">
      <source type="video/mp4"             src="//mydomain.com/video.mp4">
   </video>
</div>
 
<script>
// run script after document is ready
$(function () {
 
   // install flowplayer into all elements with CSS class="player"
   $(".player").flowplayer();
 
});
</script>
```

*   The player is installed using the `flowplayer` jQuery plugin.
*   Container elements are targeted with a [jQuery selector](http://api.jquery.com/category/selectors/).

Advantages of the manual method over [automatic installation](setup.md#automatic):

*   you control where and **when** to install the player - not confined to page load
*   you can specify a [player specific configuration in JavaScript](setup.md#local-configuration) as argument to the `flowplayer` jQuery extension.

Advantage of the manual method over [pure JavaScript installation](setup.md#javascript-install):

*   jQuery allows you to select several container elements as install targets in one `flowplayer` call. The pure method can target only one element at a time, as it also must configure the individual [video clip](#clip-options).

    ```js
    $(".player").flowplayer({
        // configuration common to all players in
        // containers with class="player" goes here
    });
    ```

*   <span class="label">Recommendation</span> The manual installation method makes it easy to fine tune the customization of individual players in a flexible fashion.

[view standalone page](/standalone/basics/manual.html)



## Pure JavaScript

This installation method uses `flowplayer()` as pure JavaScript function. It takes a reference to the container element as first argument, and the [player configuration](setup.md#player-options) as mandatory second argument.

```html
<div id="player"></div>
 
<script>
// select the above element as player container
var container = document.getElementById("player");
 
// install flowplayer into selected container
flowplayer(container, {
    clip: {
        sources: [
              { type: "application/x-mpegurl",
                src:  "//mydomain.com/video.m3u8" },
              { type: "video/mp4",
                src:  "//mydomain.com/video.mp4" }
        ]
    }
});
</script>
```

Because video sources are absent on the page the `clip` [object](#clip-object) featuring its mandatory `sources` property _must_ be specified.

For convenience the container reference in the first argument can also be written in shorthand as a simple string formatted in [jQuery selector](http://api.jquery.com/category/selectors/) syntax:

```js
// install into container with id="#player"
// corresponding jquery selector: $("#player")
 
flowplayer("#player", {
    // mandatory player and clip configuration goes here
});

```

*   Caveat If the first argument references an array of elements, only the first array member will be targeted. To avoid surprises make sure that you always select a single unique element as installation target.

If the [jQuery library](http://jquery.com/) is loaded, `flowplayer()` can also be invoked as jQuery extension like in the [VIDEO tag based](setup.md#videotag-install) installation methods with the player configuration including `clip` in the first argument:

```js
$("#player").flowplayer({
    // mandatory player and clip configuration goes here
});
```

*   <span class="label">Warning</span> The jQuery invocation syntax is strongly discouraged for this installation method because it will not give [instant access](api.html#instant-api-access) to the Flowplayer JavaScript API and blurs the structure of the code.

Advantages of the pure JavaScript installation in addition to those of the [manual installation](setup.md#manual-install):

*   It does not depend on an external library - you may still use jQuery of course.
*   Availability of some advanced features with [playlists](playlist.html), like [subtitles](subtitles.html) or [looping of individual clips](setup.md#clip-options).
*   The entire player functionality is controled in one place, in one language.
*   A reference to a specific player's [JavaScript API](api.html#api-access) can be created in [one step](api.html#instant-api-access) at installation time.
*   The page will load faster because no VIDEO tag is present, especially with multiple [splash setups](setup.md#splash).

Restrictions of the pure JavaScript installation:

*   Only one player can be installed per `flowplayer()` call.
*   By definition options set via [HTML data attributes](setup.md#html-configuration) have no effect.

*   Recommendation If you want clearly structured code suited for long-term maintenance and extensibility, choose the JavaScript installation method.


### Clip object

The `clip` object is Flowplayer's concept and understanding of [video content](#video).

The `clip` [configuration object](setup.md#clip-options) is the representation of a HTML5 VIDEO tag, including [Flash video](#flash-video), in [JavaScript Object Notation](http://www.secretgeek.net/json_3mins.asp).

Each object in a clip's `sources` [array](setup.md#source-options) is the representation of a HTML5 SOURCE tag in [JavaScript Object Notation](http://www.secretgeek.net/json_3mins.asp).

[view standalone page](/standalone/basics/pure-js.html)



## Installation summary

<table>

<tbody>

<tr class="r1">

<td class="c1">method</td>

<td class="c2">video tag</td>

<td class="c3">container selection method</td>

<td class="c4">characteristic</td>

</tr>

<tr class="r2">

<td class="c1">automatic</td>

<td class="c2">yes</td>

<td class="c3">CSS class "flowplayer"</td>

<td class="c4">static</td>

</tr>

<tr class="r3">

<td class="c1">manual</td>

<td class="c2">yes</td>

<td class="c3">jQuery</td>

<td class="c4">mixed</td>

</tr>

<tr class="r4">

<td class="c1">pure JavaScript</td>

<td class="c2">no</td>

<td class="c3">JavaScript</td>

<td class="c4">dynamic</td>

</tr>

</tbody>

</table>

# Video

The Flowplayer [engines](#engines) can play a slew of [video formats](setup.md#video-formats): all videos which can be played by a [HTML5 video](#html-video) tag or by [Flash](#flash-video).

However, one of the main purposes of using Flowplayer is to achieve cross browser and cross device compatibility, so your videos can be viewed in all browsers and on all mobile devices. To achieve that goal, the videos must meet the these criteria:

1.  They must be correctly encoded for the purpose. See the [encoding docs](encoding.html) if you want to do this yourself - or use [Flowplayer Drive](drive.html).
2.  Not every format can be played in every browser or on every device. The trick is to find a combination of formats which meets the cross compatibility criterion with the least amount of fuss.

The second point will be covered in this section.

## Clip and sources

_clip_ is how we call the sum of everything related to one video content.

_sources_ is how we call the format variants of this video, i.e., technically differing representations of the same one content.

The audience will watch **one** clip - the content -, but to grant an optimal viewing experience the player should be provided with **several** sources to [choose from](setup.md#picking-order):

## Video formats

Flowplayer supports playback of the following video formats:

<table>

<tbody>

<tr class="r1">

<td class="c1">format</td>

<td class="c2">type</td>

<td class="c3">delivery protocol</td>

<td class="c4">flowplayer engine</td>

</tr>

<tr class="r2">

<td class="c1">[HLS](#hls)</td>

<td class="c2">application/x-mpegurl</td>

<td class="c3">HTTP</td>

<td class="c4">html5</td>

</tr>

<tr class="r3">

<td class="c1">[HLS](#hls)</td>

<td class="c2">application/x-mpegurl</td>

<td class="c3">HTTP</td>

<td class="c4">flash</td>

</tr>

<tr class="r4">

<td class="c1">WebM</td>

<td class="c2">video/webm</td>

<td class="c3">HTTP</td>

<td class="c4">html5</td>

</tr>

<tr class="r5">

<td class="c1">MP4</td>

<td class="c2">video/mp4</td>

<td class="c3">HTTP</td>

<td class="c4">html5</td>

</tr>

<tr class="r6">

<td class="c1">MP4</td>

<td class="c2">video/flash</td>

<td class="c3">RTMP</td>

<td class="c4">flash</td>

</tr>

<tr class="r7">

<td class="c1"><span class="hilite">OGG</span></td>

<td class="c2">video/ogg</td>

<td class="c3">HTTP</td>

<td class="c4">html5</td>

</tr>

<tr class="r8">

<td class="c1"><span class="hilite">FLV</span></td>

<td class="c2">video/flash</td>

<td class="c3">RTMP</td>

<td class="c4">flash</td>

</tr>

<tr class="r9">

<td class="c1">MP4</td>

<td class="c2">video/mp4</td>

<td class="c3"><span class="hilite">HTTP</span></td>

<td class="c4">flash</td>

</tr>

<tr class="r10">

<td class="c1"><span class="hilite">FLV</span></td>

<td class="c2">video/flash</td>

<td class="c3"><span class="hilite">HTTP</span></td>

<td class="c4">flash</td>

</tr>

</tbody>

</table>

The `type` column shows the source `type` property to be used in the [configuration of sources](#source-options). It is the same as the [mime type](#mime-types) the server should use for delivery of this format, except for `video/flash` which flags the source for the [flash engine](#flash-engine).

Discouraged format and delivery combinations are marked in <span class="hilite">red</span>.

*   OGG format: Its video codec has a low quality/bitrate ratio because development has stalled since years. In the extremely unlikely case a legacy browser not supporting any other format is encountered, chances are that its HTML5 video implementation is still buggy and it is better to fail over to the [Flash engine](#flash).
*   FLV format: By definition (_Fl_ash _V_ideo) can only be played in Flash mode. Use MP4 instead, which gives a much higher quality/bitrate ratio.
*   HTTP delivery of MP4 (or FLV) to the Flash engine: Seeking until the end of the video is not possible before the complete video is buffered (progressive download). See also the [section on server side setup](#server-side).


## HLS

HLS stands for [Apple HTTP Live Streaming](https://developer.apple.com/library/ios/documentation/networkinginternet/conceptual/streamingmediaguide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008332-CH1-SW1), but can just as well be used for video on demand. The source is a so-called playlist with filename suffix `m3u8`. It can deliver [multiple resolutions](/demos/qsel/#drive-qsel-demo) of a video presented via Adaptive Bit Rate and resolution streaming ([ABR](http://en.wikipedia.org/wiki/Adaptive_bitrate_streaming)). HLS ABR lets your audience enjoy your content at the best quality available with the current connection speed and device capabilities. In almost all scenarios it should be the preferred source and [listed first](setup.md#picking-order).

Flowplayer is shipped with the most complete HLS support: Out of the box it plays HLS whenever technically possible: Either if native HTML5 playback of HLS [is supported by the client](#html5-engine) or if the [Flash plugin](#flash-hls) in the browser is enabled.

*   important Make sure to have a [crossdomain.xml](#cross-domain) file in your media server root for Flash HLS.

*   tip The [hlsjs plugin](plugins.html#hlsjs) enables HLS playback in modern browsers and devices without requiring Flash. Its use is strongly recommended

### Cost effective

Its streaming feature makes HLS the most server resource friendly way to deploy video: Only what the viewers see is retrieved from the server. Therefore it is also the most cost effective format: **What they see, is what you pay for.** No large files are downloaded in the background. And the ABR mechanism ensures not only the best quality per bandwidth, but also an optimal quality/cost ratio.


### Live streaming

HLS is the only cross-device and cross-browser compatible [format](#recommended-format-offering) for [live streams](http://demos.flowplayer.org/basics/live.html) and [live DVR](http://demos.flowplayer.org/basics/dvr.html). Other solutions do not cover all scenarios:

*   RTMP delivery requires [Flash](#flash-video) and does not support DVR
*   [DASH](plugins.html#dashjs) requires a modern browser with MediaSource support, and for lack of the latter also does not work on iOS

Both of the above are supported by Flowplayer, but you would still need to offer HLS for cross-compatibility.

Flowplayer supports HLS everywhere:

*   native playback
*   with its [Flash engine](#flash-hls) in older browsers
*   with the [hlsjs plugin](plugins.html#hlsjs) in modern browsers

As Flash is on the decline, we recommend to make your [streams](plugins.html#hlsjs-stream-compatibility) and [server](plugins.html#hlsjs-server-side) ready for hlsjs.

Then simply switch the player to live mode by setting the `live` option for [player](setup.md#player-options) or [clip](setup.md#clip-options) to `true`.

### HLS quality selection

Manual HLS quality selection is available out of the box via the HD menu if the stream is delivered from a root playlist pointing to several variants.

**Note:** Native HLS playback - for example on iOS - does not allow manual HLS level selection. This feature is available with [hlsjs](plugins.html#hlsjs) and [Flash HLS](#flash-hls).

By default all HLS levels are shown in the HD menu. Manual selection can be disabled or a specific set of HLS levels specified with the `hlsQualities` [option](setup.md#player-options) on the [global](setup.md#global-configuration), [player](setup.md#player-options), and [clip](setup.md#clip-options) level.


### DRM

HLS offers the best [content protection](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/StreamingMediaGuide/UsingHTTPLiveStreaming/UsingHTTPLiveStreaming.html#//apple_ref/doc/uid/TP40008332-CH102-SW15) in HTML5 video. Flowplayer supports encrypted HLS also in Flash - check out the [demo](https://flowplayer.blacktrash.org/hls-crypt).


## Recommended format offerings

The following format combinations ensure best cross browser and cross device compatibility with Flowplayer. The formats are listed in the recommended [order](setup.md#picking-order). You can also see which combinations are on offer at our [Flowplayer Drive](drive.html#result-files) transcoding and delivery platform.

<table>

<tbody>

<tr class="r1">

<td class="c1">formats</td>

<td class="c2">drive </td>

<td class="c3">evaluation</td>

</tr>

<tr class="r2">

<td class="c1"><span class="hilite">MP4</span></td>

<td class="c2">no</td>

<td class="c3">Minimal format requirement for video on demand (VOD) cross compatibility to get started.  
In Flash failover mode [seeking to unbuffered positions](#random-seeking) is not possible.</td>

</tr>

<tr class="r3">

<td class="c1">WebM, MP4</td>

<td class="c2">no</td>

<td class="c3">Reliable HTML5 video friendly combination.*</td>

</tr>

<tr class="r4">

<td class="c1">HLS</td>

<td class="c2">no</td>

<td class="c3">Minimal format requirement for adaptive bit rate switching (ABR) and live streams.</td>

</tr>

<tr class="r5">

<td class="c1">HLS, MP4</td>

<td class="c2">yes</td>

<td class="c3">Reliable combination featuring ABR, with MP4 as safety fallback.</td>

</tr>

<tr class="r6">

<td class="c1">HLS, WebM, MP4</td>

<td class="c2">yes</td>

<td class="c3">Reliable combination.  
ABR viewing experience in almost all scenarios if the HLS master playlist points to multiple variants.*  
Available as [multiple resolution encoding](drive.html#multiple-resolutions) in Flowplayer Drive, optionally with multiple WebM and MP4 resolutions for manual quality selection with the [VOD quality selector plugin](plugins.html#vod-quality-selector).</td>

</tr>

<tr class="r7">

<td class="c1">WebM, MP4,  
MP4 (rtmp)</td>

<td class="c2">yes</td>

<td class="c3">Reliable combination if HLS is not available.  
RTMP delivery allows [seeking to unbuffered positions](#random-seeking) if the browser does not support HTML5 video.*  
Available as [standard encoding](drive.html#standard-resolution) in Flowplayer Drive.</td>

</tr>

</tbody>

</table>

*For WebM to be [chosen](#picking-order) it should be listed before MP4, because all current browsers now support MP4 playback, and will never get to pick WebM otherwise.


## Picking order

The order in which you specify the sources matters. Flowplayer will cycle through the sources and choose the first source it can play.

If a source can be played by more than one [engine](#engines) Flowplayer will try the html5 engine first. The main candidates for this scenario are the HLS and MP4 [formats](setup.md#video-formats): If the browser [cannot play](#html5-video) the format and its Flash plugin is enabled, then this source will be played using the flash engine. - Exception for convenience: If HTML5 video is not supported by the browser, HLS is not on offer, but an RTMP stream, the RTMP stream takes precedence over MP4 via HTTP.

You can completely control the picking order by setting the `engine` [source option](setup.md#source-options) explicitly.

This is the recommended order to provide the sources by `type`:

1.  `application/x-mpegurl` - HLS - Adaptive Bitrate Streaming allows optimal quality according to bandwidth and device compatibility; reduces [Content Delivery Network](#cdn) costs as some browsers will keep downloading a video **file** even while playback is paused
2.  `video/webm` - WebM - before MP4 because otherwise it won't be chosen.
3.  `video/mp4` - also required as Flash fallback if neither HLS nor an RTMP stream is available; for mobile device compatibility refer to our [encoding documentation](#encoding.html#mp4-for-ios-and-mobile-devices)
4.  `video/flash` - MP4 over RTMP if HLS is not available - allows [random seeking](#random-seeking) if html5 video is not available

*   <span class="label">Important</span> Engine plugins like [hlsjs](plugins.html#hlsjs) or [dashjs](plugins.html#dashjs) are usually inserted at the top of the above order and will take precedence.


# Layout

This section covers how the player is presented on the page before playback starts.


## Player size

The size of the player is determined by the dimensions of the container element. For example you can hard code them using CSS directives:

```css
.flowplayer {
   width: 600px;
   height: 338px;
}
```

However, hard coding width and height of the container element foregoes Flowplayer's **responsive design**: If you do not specify fixed dimensions for the container like above, the player will adapt itself to the dimensions of the parent element according to its `ratio` setting (see below) - very useful to make the player look good on small mobile screens for example. Therefore it is recommended to either just omit dimension directives, or you can use more flexible CSS rules like `max-width` and/or `max-height`:

```css
.flowplayer {
   max-width: 800px;
}
```

By default Flowplayer uses all the width that is given via CSS or the width of the container's parent element. The height of the player is determined by the `aspectRatio` or `ratio` [configuration settings](#configuration) which default to `"16:9"` or `9/16` respectively. Under the premise that letterboxing or empty sidebars on the video screen are to be avoided, this assumes a video of 16/9 aspect ratio. Note that the `ratio` notation is the inverse ratio of how one usually specifies the aspect ratio of a video: height/width (container) as opposed to width/height (video).

You can change the ratio in the [global player configuration](setup.md#global-configuration):

```js
flowplayer.conf.aspectRatio = "4:3";
```

This is the same as:

```js
flowplayer.conf.ratio = 3/4;
```

Or you can set the ratio in the [HTML configuration](setup.md#html-configuration) using the `data-aspect-ratio` or `data-ratio` attribute of the container element as follows:

```html
<div class="flowplayer" data-aspect-ratio="4:3">
   <video>...</video>
</div>
```

This is the same as:

```html
<div class="flowplayer" data-ratio="0.75">
   <video>...</video>
</div>
```

You may round a floating point value, but you should should not go below a precision of 4 decimals.

Here are the player `ratio` values for some widely used video aspect ratios:

<table>

<tbody>

<tr class="r1">

<td class="c1">aspect ratio</td>

<td class="c2">orientation</td>

<td class="c3">fraction ratio</td>

<td class="c4">float ratio</td>

<td class="c5">mandatory</td>

</tr>

<tr class="r2">

<td class="c1">16:9</td>

<td class="c2">landscape</td>

<td class="c3">9/16</td>

<td class="c4">0.5625</td>

<td class="c5">no</td>

</tr>

<tr class="r3">

<td class="c1">4:3</td>

<td class="c2">landscape</td>

<td class="c3">3/4</td>

<td class="c4">0.75</td>

<td class="c5">yes</td>

</tr>

<tr class="r4">

<td class="c1">12:5</td>

<td class="c2">landscape</td>

<td class="c3">5/12</td>

<td class="c4">0.4167</td>

<td class="c5">yes</td>

</tr>

<tr class="r5">

<td class="c1">9:16</td>

<td class="c2">portrait</td>

<td class="c3">16/9</td>

<td class="c4">1.1778</td>

<td class="c5">yes</td>

</tr>

<tr class="r6">

<td class="c1">3:4</td>

<td class="c2">portrait</td>

<td class="c3">4/3</td>

<td class="c4">1.3333</td>

<td class="c5">yes</td>

</tr>

</tbody>

</table>

Alternatively you can change the container's ratio via CSS while setting the `ratio` option to `false`:

```css
.flowplayer .fp-ratio {
   padding-top: 41.67%;
}
```

Now when you resize the browser the video size will adjust accordingly, and the player's width/height ratio is kept.

You may also let the player size dynamically be determined by the video's aspect ratio: Set the `adaptiveRatio` [player option](setup.md#player-options) to `true`.

This comes in handy for quick setups when you do not happen to know the exact dimensions of the video, but still want the player's screen size to match the aspect ratio of the video. By consequence refrain from configuring `adaptiveRatio` for a [splash setup](setup.md#splash) as the video's dimensions - and therefore its aspect ratio are only available once the video is loaded and the player is [ready](/docs/api.html#properties).

## Start screen

In a basic setup like the one in our [quick start guide](quickstart.html#flowplayer) the video is loaded and the first frame is shown - unless `autoplay` is [configured](setup.md#player-options).

In most cases however, you want to customize the initial screen as what is often called a splash or poster screen. Flowplayer offers two techniques to implement a start screen which are also named "poster" and "splash".

Common features of "poster" and "splash":

*   The visible result: the player area is filled with an image or coloring, and in the middle sits the play button to advertise a video player and invite the audience to play the video.
*   The implementation method: entirely via CSS, `background-image` or a `background-color` or both, as directives for the container element - not mandatory for "splash" because it also changes the initial player behaviour, see below.

Where "poster" and "splash" differ is their behaviour:

*   [poster](setup.md#poster): the video is loaded in the background
*   [splash](setup.md#splash): the video is loaded on demand, i.e. when the user starts playback with a click

*   **Important** A splash or poster setup is mandatory if the player is _hidden_ at some point in its life cycle. Some browsers forbid hiding the Flash object, and thus errors are encountered when the [flash engine](#engines) is in use. This notably concerns [modal window setups](/demos/layout/#overlay-demo).


### Poster

The poster setup is recommended when you want to preload the video at startup while giving the player a custom look and feel.

Flowplayer features an extended and flexible concept of the generic `poster` [VIDEO tag attribute](setup.md#video-tag-attributes): If the `poster` attribute is given, it will also be used as CSS background image of the container element. Par consequence you can also choose to omit the poster attribute, and instead specify a background image or background color (treated as monochrome "poster") CSS directive to the same effect.

The advantages of this approach:

1.  works consistently in Flash and HTML5
2.  does not break when browser is resized (very hard to do in Flash)
3.  you can take advantage of CSS techniques such as positioning, animations, scaling and many more
4.  you can use CSS sprites and thereby avoid multiple server calls
5.  you get rid of browser issues, for example Internet Explorer 9 loads the first frame of the video on top of the poster image
6.  you can use higher resolution images with Retina and similar devices

To sum up, a poster setup requires that

*   a `background-image` or `background-color` CSS rule applies to the container element or
*   the `poster` [configuration option](setup.md#player-options) is set or
*   the VIDEO tag carries a `poster` attribute and
*   the [splash](setup.md#splash) setup is not enforced.

If both `background-image` for the container and `poster` attribute for the VIDEO tag are given, the poster image takes precedence and replaces the background image.

When the above conditions are met, the CSS "is-poster" [state class](/docs/skinning.html#states) is assigned to the container at startup. For instance this allows you to create a loading animation for the entire player area with a few CSS rules.

[view standalone page](/standalone/basics/poster.html)


### Splash

Flowplayer has a _unique_ feature called "splash screen" which is similar to the poster setup except that the nested VIDEO or Flash OBJECT tag initially is not present on the page, but is inserted **on demand**. The player is installed on the fly when the user clicks on the splash screen. This has the following benefits:

1.  You can have an unlimited amount of players on the page and they - or rather their splash screens - all render immediately, even in Flash mode.
2.  There are no hidden Flash objects which interfere with your scripting or CSS layout dynamics.
3.  Only one video can be played at a time. When the user clicks on a splash screen while another player instance is running, the latter is unloaded automatically.

By design the splash setup also disables preloading of the video.

Please have a look at the poster and splash [comparison page](/standalone/basics/multiple.html).

To set up splash screens you either add the [state class](/docs/skinning.html#configurable-states) "is-splash" to the CSS class of the container element:

```html
<div class="flowplayer is-splash"
     style="background-color:#777; background-image:url(/path/to/splash.jpg);">
   <video>
      <source type="application/x-mpegurl" src="//mydomain.com/video.m3u8">
      <source type="video/mp4"             src="//mydomain.com/video.mp4">
   </video>
</div>
```

Or you configure the addition of the "is-splash" state class by setting the `splash` [option](setup.md#player-options) to `true` or to the location of the splash image. For instance this [global configuration](setup.md#global-configuration) applies the splash setup to all players on the page:

```js
flowplayer.conf = {
  splash: true
};
```

The splash image is given in the CSS `background-image` directive for the container element or by setting the `splash` option to the location of the image. However, providing an image is not mandatory to set up a Flowplayer splash screen; in fact there is no CSS or image requirement for the splash setup. Usually you want at least a `background-color` to discern the player from its surroundings.

Here is how it works:

*   [Video tag based installations](setup.md#videotag-install): Upon recognition of the "is-splash" class name or the `splash` option the VIDEO tag is temporarily removed from the container element on page load.
*   When the splash screen is clicked the VIDEO or an OBJECT tag, depending on the engine picked, is placed inside the player container and the "is-splash" CSS class name is removed.
*   Unloading does the opposite: the VIDEO or OBJECT tag is removed and the "is-splash" class is re-added.
*   The player can be made to go back to splash state by hitting the `q` [key](#keyboard) or by calling the `unload` [API method](api.html#methods).
*   Adding the "is-closeable" [state class](/docs/skinning.html#configurable-states) displays an unload button.

Splash screens are used heavily in our [demo area](/demos/). They are one of the main reasons why people use Flowplayer.

*   **Tip** The cleanest and fastest way to implement a splash setup is to use a [pure JavaScript installation](#javascript-install), and, if desired, to set the splash image via CSS.

[view standalone page](/standalone/basics/splash.html)



# Configuration

The player supports various configuration options. For example:

```html
<script>
$(".myplayer").flowplayer({
 
   // option 1
   ratio: 3/4,
 
   // option 2
   rtmp: 'rtmp://s3b78u0kbtx79q.cloudfront.net/cfx/st'
 
});
</script>
```

Configuration happens on 3 levels:

1.  player level: options which affect the player
2.  clip level: options which set or affect the video
3.  source level: options which set or affect source variants of the clip

JavaScript schema:

```js
var conf = {
    // player level
    clip: {
        // clip level
        sources: [
            // source level
            ...
        ]
    }
}
```

HTML schema:

```html
<div id="playerContainer" data-[option]="value" ...> <!-- player level -->
   <video>                                           <!-- clip level   -->
      <source ...>                                   <!-- source level -->
      ...
   </video>
</div>
```

*   <span class="label">Important</span> The HTML schema is less clear cut and sometimes less flexible at the clip and source level. We recommend to use the [JavaScript](#pure-javascript-install) installation method for complex setups.

The following tables show all options as they are declared in a [global](setup.md#global-configuration), [local](setup.md#local-configuration) or [pure](setup.md#javascript-install) JavaScript configuration in JSON syntax.

Options marked in <span class="hilite">red</span> are advanced options. Only set them when you know what you are doing and aware of potential side-effects or drawbacks.


## Player options

Here is a list of all core configuration options at [player level](setup.md#configuration-summary).

For [video tag based installations](setup.md#videotag-install) every player option can alternatively be specified in [HTML configuration syntax](setup.md#html-configuration) as [custom data-attribute](http://www.w3schools.com/tags/att_global_data.asp) of the container element - except for `clip` which is set via the VIDEO and SOURCE tags and `rtmp` if specified as Object. Camel cased option names like `adaptiveRatio` must be written as compound lower cased attributes: `data-adaptive-ratio`.

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">default value</td>

<td class="c3">description</td>

</tr>

<tr class="r2">

<td class="c1"><span class="hilite">adaptiveRatio</span></td>

<td class="c2">false</td>

<td class="c3">Whether the player's ratio adapts vertically to the video's aspect ratio. Do not apply in conjunction with the `aspectRatio` or `ratio` options.</td>

</tr>

<tr class="r3">

<td class="c1">aspectRatio</td>

<td class="c2">'16:9'</td>

<td class="c3">A string specifying the aspect ratio of the player, width to height. Usually should be set to the value as the video's aspect ratio. Both colon `:` and slash `/` separators are allowed.  
Refer to the section on [player size](#player-size) for further details.  
See also the `ratio` option.</td>

</tr>

<tr class="r4">

<td class="c1">autoplay</td>

<td class="c2">false</td>

<td class="c3">If `true`, playback will start automatically once the player is loaded.  
Contradicts a [splash setup](#splash) by definition and must not be used with it.  
Has no effect on mobile devices which [do not allow automatic playback](known-issues.html).</td>

</tr>

<tr class="r5">

<td class="c1"><span class="hilite">bgcolor</span></td>

<td class="c2">'#333333'</td>

<td class="c3">The background color (hex value) of the [player canvas](skinning.html#canvas) in Flash mode unless the `wmode` option is not set to "transparent". If a CSS `background-color` rule is specified for the container, its calculated full hex value becomes the default, so you usually want to configure this via CSS.</td>

</tr>

<tr class="r6">

<td class="c1">chromecast</td>

<td class="c2">true</td>

<td class="c3"><span class="since">v7.0.3</span> Whether [Chromecast](https://www.google.com/chromecast/) device detection and playback is is enabled. Set to `false` if you do not want the chromecast sender script to be loaded.</td>

</tr>

<tr class="r7">

<td class="c1">clip</td>

<td class="c2">Object</td>

<td class="c3">Configuration of the video to be loaded in a [pure JavaScript installation](#javascript-install). Refer to [clip options](#clip-options) for parameters and detailed descriptions.  
Not allowed in a [VIDEO tag based installation](#videotag-install).</td>

</tr>

<tr class="r8">

<td class="c1">debug</td>

<td class="c2">false</td>

<td class="c3">Whether to show debug messages in the browser console. Causes errors if `window.console` is not available.</td>

</tr>

<tr class="r9">

<td class="c1">disabled</td>

<td class="c2">false</td>

<td class="c3">Whether playback should be forced by disabling the UI. Seeking, pausing etc. is impossible. [API](api.html) still works. Typically used in ads.</td>

</tr>

<tr class="r10">

<td class="c1"><span class="hilite">errors</span></td>

<td class="c2">Array</td>

<td class="c3">An array of error messages. The default list can be found in the [API documentation](/docs/api.html#error-codes).</td>

</tr>

<tr class="r11">

<td class="c1">fullscreen</td>

<td class="c2">true</td>

<td class="c3">Whether fullscreen is enabled. Defaults to `false` when the player is viewed in an [IFRAME](#iframe). Must therefore be set to `true` explicitly to enable players in an IFRAME to go fullscreen.</td>

</tr>

<tr class="r12">

<td class="c1">hlsQualities</td>

<td class="c2">true</td>

<td class="c3">If `false`, disables [manual HLS quality selection](#hls-quality-selection). Shorthand for an array comprising all level index numbers.  
Can be set as `data-hls-qualities` HTML attribute.</td>

</tr>

<tr class="r13">

<td class="c1">hlsQualities</td>

<td class="c2">Array</td>

<td class="c3">An array of HLS levels to offer for [manual HLS quality selection](#hls-quality-selection). The levels are specified as index numbers from `0` (lowest) to highest. Level `-1` for adaptive bitrate switching must be listed first. Example:  
`[-1, 1, 6]`  
Can be set as `data-hls-qualities` HTML attribute.  
Levels may also be specified with a custom selector menu label:  
`[{level: -1, label: "ABR"},  
{level: 1, label: "SD"}, {level: 6, label: "HD"}]`  
In this case `hlsQualities` cannot be set as HTML data attribute.</td>

</tr>

<tr class="r14">

<td class="c1"><span class="hilite">hlsQualities</span></td>

<td class="c2">'drive'</td>

<td class="c3">For videos from [Flowplayer Drive](/features/#video-hosting) created with the Adaptive or Premium [profile](/features/#three-encoding-profiles): If set to `"drive"`, enables [manual HLS quality selection](#hls-quality-selection) of a selected range of up to [4 resolutions](/docs/drive.html#multiple-resolutions) ([demo](http://demos.flowplayer.org/api/hlsjs.html#hlsjsvod)).  
Can be set as `data-hls-qualities` HTML attribute.</td>

</tr>

<tr class="r15">

<td class="c1">keyboard</td>

<td class="c2">true</td>

<td class="c3">Whether [keyboard shortcuts](#keyboard) are enabled.</td>

</tr>

<tr class="r16">

<td class="c1">live</td>

<td class="c2">false</td>

<td class="c3">Whether the player is set up for live streaming.  
CSS alternative: the `is-live` [state class](skinning.html#configurable-states).  
See also the corresponding [clip option](#clip).</td>

</tr>

<tr class="r17">

<td class="c1">mouseoutTimeout</td>

<td class="c2">5000</td>

<td class="c3">How long the full controlbar stays visible in fullscreen after a mouse movement (in milliseconds).  
Has no effect in conjunction with the `fixed-controls` and `no-toggle` skin [modifier classes](skinning.html#modifier-classes).</td>

</tr>

<tr class="r18">

<td class="c1">muted</td>

<td class="c2">false</td>

<td class="c3">Whether the player should start in muted state.</td>

</tr>

<tr class="r19">

<td class="c1">native_fullscreen</td>

<td class="c2">false</td>

<td class="c3">Whether to use native fullscreen on iOS instead of the full browser window. The screen will be bigger but native video controls will be in use instead of customizable Flowplayer controls.  
Setting this to `true` is required to enable a player in an [IFRAME](#iframe) to go fullscreen on iOS.</td>

</tr>

<tr class="r20">

<td class="c1">poster</td>

<td class="c3">URL or path to poster image. Enables a [poster setup](#poster).  
**Caveat:** Setting the poster via this option is slow, because the poster image can only be shown once the player is loaded.  
If a CSS poster setup is detected on boot, the [API](api.html) sets this option to `true`.</td>

</tr>

<tr class="r21">

<td class="c1">ratio</td>

<td class="c2">9 / 16</td>

<td class="c3">A fraction or decimal number representing the height of the player in proportion to its width. Refer to the section on [player size](#player-size) for details.  
See also the `aspectRatio` option.  
Set this to `false` if you want to set the `ratio` via CSS only or set the player dimensions to a fixed size via CSS.</td>

</tr>

<tr class="r22">

<td class="c1"><span class="hilite">rtmp</span></td>

<td class="c2">Object</td>

<td class="c3">Flash (RTMP) only. When specified in JavaScript object notation: the [rtmp configuration object](#rtmp-options).</td>

</tr>

<tr class="r23">

<td class="c1">rtmp</td>

<td class="c3">Flash (RTMP) only. When specified as String: Address of the Flash RTMP server. **Mandatory** when a [Flash video source](#flash-video-rtmp) is delivered via RTMP.  
Shorthand for the `url` option in the [rtmp configuration object](#rtmp-options).</td>

</tr>

<tr class="r24">

<td class="c1">speeds</td>

<td class="c2">[0.25, 0.5,  
1.0, 1.5, 2.0]</td>

<td class="c3">The available speed levels that are used with SHIFT + arrow [keys](#keyboard) or by the `speed()` API [method](api.html#methods).  
To offer a user interface for playrate changes load the [speed menu plugin](plugins.html#speed-menu).  
The values in the given array are the factors by which normal playback speed is multiplied. Configured values will be rounded to 2 decimals.  
Values less than `1.0`: slow motion.  
Values greater than `1.0`: fast forward.  
Not supported by the Flash engine, older browsers and many mobile devices.  
</td>

</tr>

<tr class="r25">

<td class="c1">swf</td>

<td class="c3">Flash only. Location of the Flash file. URL or path. Defaults to  
`//releases.flowplayer.org/7.0.4/flowplayer.swf`  
for the free player.</td>

</tr>

<tr class="r26">

<td class="c1">swfHls</td>

<td class="c3">Flash only. Location of the [Flash HLS](#flash-hls) plugin. URL or path. Defaults to  
`//releases.flowplayer.org/7.0.4/flowplayerhls.swf`  
for the free player.  
Setting this to `false` will prevent playback of HLS by the Flash engine altogether.</td>

</tr>

<tr class="r27">

<td class="c1">splash</td>

<td class="c2">false</td>

<td class="c3">As boolean: enables a [splash setup](#splash). If a splash image is desired, it can be set as CSS `background-image` for the container element.  
CSS alternative: the `is-splash` [state class](skinning.html#configurable-states).</td>

</tr>

<tr class="r28">

<td class="c1">splash</td>

<td class="c3">As string: The location of the splash image. Enables a [splash setup](#splash).</td>

</tr>

<tr class="r29">

<td class="c1">volume</td>

<td class="c2">1.0</td>

<td class="c3">The initial volume level.</td>

</tr>

<tr class="r30">

<td class="c1"><span class="hilite">wmode</span></td>

<td class="c2">'opaque'</td>

<td class="c3">The `wmode` value to be used by the Flash engine. Refer to the [Adobe Flash documentation](http://helpx.adobe.com/flash/kb/flash-object-embed-tag-attributes.html#main_Browser_support_for_Window_Mode__wmode__values) for more info.  
**Warning:** Setting this to `"direct"` or `"window"` will cause problems in some browsers, namely Internet Explorer and Firefox on Windows.</td>

</tr>

</tbody>

</table>


## Extension and plugin options

The following options are `undefined` by default, but are supported by player extensions or additionally loaded plugins. Follow the link in the third column for details. The rightmost column indicates whether the option can also be set as data attribute in a [HTML configuration](setup.md#html-configuration). Some of the options accept a nested configuration object as value, in which case only the top-level option is listed here.

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">kind</td>

<td class="c3">extension/plugin</td>

<td class="c4">html configurable</td>

</tr>

<tr class="r2">

<td class="c1">active</td>

<td class="c2">String</td>

<td class="c3">[Playlist extension](playlist.html#configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r3">

<td class="c1">advance</td>

<td class="c2">Boolean</td>

<td class="c3">[Playlist extension](playlist.html#configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r4">

<td class="c1">analytics</td>

<td class="c2">String</td>

<td class="c3">[Analytics extension](analytics.html#setting-up)</td>

<td class="c4">yes</td>

</tr>

<tr class="r5">

<td class="c1">audio</td>

<td class="c2">Boolean</td>

<td class="c3">[Audio plugin](plugins.html#audio-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r6">

<td class="c1">audioOnly</td>

<td class="c2">Boolean</td>

<td class="c3">[Audio plugin](plugins.html#audio-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r7">

<td class="c1">background</td>

<td class="c2">Boolean</td>

<td class="c3">[Background plugin](plugins.html#background-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r8">

<td class="c1">background</td>

<td class="c2">Object</td>

<td class="c3">[Background plugin](plugins.html#background-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r9">

<td class="c1">coverImage</td>

<td class="c2">String</td>

<td class="c3">[Audio plugin](plugins.html#audio-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r10">

<td class="c1">cuepoints</td>

<td class="c2">Array</td>

<td class="c3">[Cuepoints extension](cuepoints.html#configuration)</td>

<td class="c4">restricted</td>

</tr>

<tr class="r11">

<td class="c1">dash</td>

<td class="c2">Object</td>

<td class="c3">[dashjs plugin](plugins.html#dashjs-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r12">

<td class="c1">dashQualities</td>

<td class="c2">Array</td>

<td class="c3">[dashjs plugin](plugins.html#dashjs-configuration)</td>

<td class="c4">restricted</td>

</tr>

<tr class="r13">

<td class="c1">dashQualities</td>

<td class="c2">Boolean</td>

<td class="c3">[dashjs plugin](plugins.html#dashjs-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r14">

<td class="c1">defaultQuality</td>

<td class="c2">String</td>

<td class="c3">[VOD quality selector plugin](plugins.html#vod-quality-selector-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r15">

<td class="c1">embed</td>

<td class="c2">Boolean</td>

<td class="c3">[Sharing extension](sharing.html#player-options)</td>

<td class="c4">yes</td>

</tr>

<tr class="r16">

<td class="c1">embed</td>

<td class="c2">Object</td>

<td class="c3">[Sharing extension](sharing.html#player-options)</td>

<td class="c4">no</td>

</tr>

<tr class="r17">

<td class="c1">facebook</td>

<td class="c2">Boolean</td>

<td class="c3">[Sharing extension](sharing.html#player-options)</td>

<td class="c4">yes</td>

</tr>

<tr class="r18">

<td class="c1">facebook</td>

<td class="c2">String</td>

<td class="c3">[Sharing extension](sharing.html#player-options)</td>

<td class="c4">yes</td>

</tr>

<tr class="r19">

<td class="c1">generate_cuepoints</td>

<td class="c2">Boolean</td>

<td class="c3">[Cuepoints extension](cuepoints.html#configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r20">

<td class="c1">hlsjs</td>

<td class="c2">Boolean</td>

<td class="c3">[hlsjs plugin](plugins.html#hlsjs-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r21">

<td class="c1">hlsjs</td>

<td class="c2">Object</td>

<td class="c3">[hlsjs plugin](plugins.html#hlsjs-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r22">

<td class="c1">ima</td>

<td class="c2">Object</td>

<td class="c3">[AdSense plugin](asf.html#plugin-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r23">

<td class="c1">ima</td>

<td class="c2">Object</td>

<td class="c3">[VAST plugin](vast.html#plugin-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r24">

<td class="c1">key</td>

<td class="c2">String</td>

<td class="c3">[Commercial extension](#commercial-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r25">

<td class="c1">logo</td>

<td class="c2">String</td>

<td class="c3">[Commercial extension](#commercial-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r26">

<td class="c1">loop</td>

<td class="c2">Boolean</td>

<td class="c3">[Playlist extension](playlist.html#configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r27">

<td class="c1">nativesubtitles</td>

<td class="c2">Boolean</td>

<td class="c3">[Subtitle extension](subtitles.html#configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r28">

<td class="c1">overlay</td>

<td class="c2">String</td>

<td class="c3">[Overlay plugin](plugins.html#overlay-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r29">

<td class="c1">overlay</td>

<td class="c2">Object</td>

<td class="c3">[Overlay plugin](plugins.html#overlay-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r30">

<td class="c1">playlist</td>

<td class="c2">Array</td>

<td class="c3">[Playlist extension](playlist.html#configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r31">

<td class="c1">qualities</td>

<td class="c2">Array</td>

<td class="c3">[VOD quality selector plugin](plugins.html#vod-quality-selector-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r32">

<td class="c1"><span class="hilite">qualities</span></td>

<td class="c2">String</td>

<td class="c3">[VOD quality selector plugin](plugins.html#vod-quality-selector-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r33">

<td class="c1">query</td>

<td class="c2">String</td>

<td class="c3">[Playlist extension](playlist.html#configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r34">

<td class="c1">share</td>

<td class="c2">Boolean</td>

<td class="c3">[Sharing extension](sharing.html#player-options)</td>

<td class="c4">yes</td>

</tr>

<tr class="r35">

<td class="c1">thumbnails</td>

<td class="c2">Object</td>

<td class="c3">[thumbnails plugin](plugins.html#thumbnails-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r36">

<td class="c1">twitter</td>

<td class="c2">Boolean</td>

<td class="c3">[Sharing extension](sharing.html#player-options)</td>

<td class="c4">yes</td>

</tr>

<tr class="r37">

<td class="c1">twitter</td>

<td class="c2">String</td>

<td class="c3">[Sharing extension](sharing.html#player-options)</td>

<td class="c4">yes</td>

</tr>

</tbody>

</table>


## Commercial configuration

The [commercial version](/pricing/player.html#players) allows you to get rid of the Flowplayer logo and optionally use your own. By default this will be displayed in the bottom/left corner of the player in the [shared](/docs/sharing.html) players. When a user clicks the logo [s]he will be redirected to the originating page.

The license key is tied to the domain name shown in the browser's location bar - in the case of IFRAMEs when the frame is viewed in its own window, i.e., the IFRAME source domain.


### Commercial prerequisites

Make sure to deploy and load the **commercial** release available at your [Flowplayer account](/account/), or simply load the commercial API script from `//releases.flowplayer.org/7.0.4/commercial/flowplayer.min.js`.

The following assets _must_ be commercial for license validation:

*   the API script: `flowplayer.min.js`
*   the Flash swf file: `flowplayer.swf` - if not loaded from our CDN (the default) the `swf` [option](#commercial-configuration) or the `data-swf` [container attribute](setup.md#html-configuration) must be set
*   the Flash HLS swf file: `flowplayerhls.swf` - if not loaded from our CDN (the default) the `swfHls` [option](#commercial-configuration) or the `data-swf-hls` [container attribute](setup.md#html-configuration) must be set


### Commercial options

Here are the player options for the commercial version:

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">description</td>

</tr>

<tr class="r2">

<td class="c1">key</td>

<td class="c2">A valid license key removes the Flowplayer branding from the player. The value can be a comma separated string of keys to support multiple domains. For example:  
`'$688345122773207, $334773811075656'`</td>

</tr>

<tr class="r3">

<td class="c1">logo</td>

<td class="c2">Location of your logo. URL or path.  
Clicking on the logo will redirect the viewer to the originating page.  
Its appearance can be further customized via [CSS](skinning.html#logo).</td>

</tr>

<tr class="r4">

<td class="c1">swf</td>

<td class="c2">Flash only. Location of the Flash file. URL or path. Defaults to  
`//releases.flowplayer.org/7.0.4/commercial/flowplayer.swf`</td>

</tr>

<tr class="r5">

<td class="c1">swfHls</td>

<td class="c2">Flash only. Location of the [Flash HLS](#flash-hls) plugin. URL or path. Defaults to  
`//releases.flowplayer.org/7.0.4/commercial/flowplayerhls.swf`.  
Setting this to `false` will prevent playback of HLS by the Flash engine altogether.</td>

</tr>

</tbody>

</table>

Here is a [minimal commercial setup](/standalone/commercial.html). Take a look at its source code and you can see how the key is provided. You create the key on your [account page](/account) after [purchase](/pricing/players.html#players) by entering the domain name you wish to license into the "Add domain" field.


### Custom context menu

The [context menu](skinning.html#html-layout) which shows up on right-click on the player area can be customized in licensed players. Refer to the skinning documentation for [how to set it up](skinning.html#context-menu).

By default no context menu is present in the commercial player.


## Clip options

The `clip` [object](setup.md#player-options) may not be empty. As any HTML5 player, Flowplayer requires a video to run. Therefore specifying a [sources](#source-options) parameter is mandatory for a valid clip configuration.

In a [VIDEO tag based installation](setup.md#videotag-install) the `sources` are already present as SOURCE tags. Options which are not generic [VIDEO tag attributes](setup.md#video-tag-attributes) can be set as data-attributes of the VIDEO tag if their value is not an `object`.

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">default</td>

<td class="c3">html syntax </td>

<td class="c4">description</td>

</tr>

<tr class="r2">

<td class="c1"><span class="hilite">flashls</span></td>

<td class="c2">Object</td>

<td class="c4">Flash (HLS) only. The [flashls object](#flashls-options) may be used to fine tune the behaviour of [Flash HLS](#flash-hls).  
Cannot be set in HTML syntax.</td>

</tr>

<tr class="r3">

<td class="c1">hlsQualities</td>

<td class="c2">true</td>

<td class="c3">data-hls-qualities</td>

<td class="c4">Overrides the `hlsQualities` [player configuration](#player-options) for this clip, turning manual HLS level selection on or off.</td>

</tr>

<tr class="r4">

<td class="c1">loop</td>

<td class="c2">false</td>

<td class="c3">loop</td>

<td class="c4">Whether this clip should play again automatically on finish.  
For loop playback of playlists use the `loop` option at [player level](#extension-and-plugin-options) provided by the [playlist extension](playlist.html#configuration).</td>

</tr>

<tr class="r5">

<td class="c1">live</td>

<td class="c2">false</td>

<td class="c3">data-live</td>

<td class="c4">Whether this clip is a live stream.  
Overrides the `live` [player option](#player-options).</td>

</tr>

<tr class="r6">

<td class="c1"><span class="hilite">rtmp</span></td>

<td class="c2">Object</td>

<td class="c4">Flash (RTMP) only. When specified in JavaScript object notation: the [rtmp object](#rtmp-options).  
Overrides the `rtmp` [player option](#player-options).  
Cannot be set in HTML syntax.</td>

</tr>

<tr class="r7">

<td class="c1">rtmp</td>

<td class="c3">data-rtmp</td>

<td class="c4">Flash (RTMP) only. When specified as String: Address of the Flash RTMP server. See also: [server side video handling](#server-side).  
Overrides the `rtmp` [player option](#player-options).</td>

</tr>

<tr class="r8">

<td class="c1">sources</td>

<td class="c2">Array</td>

<td class="c3">SOURCE tags</td>

<td class="c4">A list of [video formats](#video-formats). Refer to [source options](#source-options) for parameters and detailed descriptions.  
Setting this property is **mandatory**.</td>

</tr>

<tr class="r9">

<td class="c1">title</td>

<td class="c3">data-title</td>

<td class="c4">Set a title for this clip. Displayed in a top bar when hovering over the player.  
**Caveat:** Has no visible effect in conjunction with the `aside-time` skin [modifier class](skinning.html#modifier-classes).</td>

</tr>

</tbody>

</table>


## Extension and plugin clip options

These options are `undefined` by default but are supported by the referenced extensions or plugins, especially for use in [playlists](playlist.html).

The rightmost column indicates whether the option can also be set as data attribute in a [VIDEO tag based playlist installation](/docs/playlist.html#videotag-install) as custom data-attribute of a playlist "trigger" element.

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">kind</td>

<td class="c3">extension/plugin</td>

<td class="c4">html configurable</td>

</tr>

<tr class="r2">

<td class="c1">audio</td>

<td class="c2">Boolean</td>

<td class="c3">[Audio plugin](plugins.html#audio-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r3">

<td class="c1">coverImage</td>

<td class="c2">String</td>

<td class="c3">[Audio plugin](plugins.html#audio-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r4">

<td class="c1">cuepoints</td>

<td class="c2">Array</td>

<td class="c3">[Cuepoints extension](cuepoints.html#configuration)</td>

<td class="c4">restricted</td>

</tr>

<tr class="r5">

<td class="c1">dashQualities</td>

<td class="c2">Array</td>

<td class="c3">[dashjs plugin](plugins.html#dashjs-configuration)</td>

<td class="c4">restricted</td>

</tr>

<tr class="r6">

<td class="c1">dashQualities</td>

<td class="c2">Boolean</td>

<td class="c3">[dashjs plugin](plugins.html#dashjs-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r7">

<td class="c1">defaultQuality</td>

<td class="c2">String</td>

<td class="c3">[VOD quality selector plugin](plugins.html#vod-quality-selector-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r8">

<td class="c1">hlsjs</td>

<td class="c2">Object</td>

<td class="c3">[hlsjs plugin](plugins.html#hlsjs-options)</td>

<td class="c4">no</td>

</tr>

<tr class="r9">

<td class="c1">hlsQualities</td>

<td class="c2">Array</td>

<td class="c3">[hlsjs plugin](plugins.html#hlsjs-configuration)</td>

<td class="c4">restricted</td>

</tr>

<tr class="r10">

<td class="c1">hlsQualities</td>

<td class="c2">Boolean</td>

<td class="c3">[hlsjs plugin](plugins.html#hlsjs-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r11">

<td class="c1">ima</td>

<td class="c2">Object</td>

<td class="c3">[AdSense plugin](asf.html#plugin-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r12">

<td class="c1">ima</td>

<td class="c2">Object</td>

<td class="c3">[VAST plugin](vast.html#plugin-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r13">

<td class="c1">qualities</td>

<td class="c2">Array</td>

<td class="c3">[VOD quality selector plugin](plugins.html#vod-quality-selector-configuration)</td>

<td class="c4">no</td>

</tr>

<tr class="r14">

<td class="c1"><span class="hilite">qualities</span></td>

<td class="c2">String</td>

<td class="c3">[VOD quality selector plugin](plugins.html#vod-quality-selector-configuration)</td>

<td class="c4">yes</td>

</tr>

<tr class="r15">

<td class="c1">subtitles</td>

<td class="c2">Array</td>

<td class="c3">[Subtitle extension](subtitles.html#clip-options)</td>

<td class="c4">no</td>

</tr>

<tr class="r16">

<td class="c1">thumbnails</td>

<td class="c2">Object</td>

<td class="c3">[thumbnails plugin](plugins.html#thumbnails-configuration)</td>

<td class="c4">no</td>

</tr>

</tbody>

</table>


## Source options

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">mandatory </td>

<td class="c3">html syntax </td>

<td class="c4">description</td>

</tr>

<tr class="r2">

<td class="c1"><span class="hilite">engine</span></td>

<td class="c2">no</td>

<td class="c3"><span class="hilite">data-engine</span></td>

<td class="c4">The [engine](#engines) the player must use for this source, no other engine will be tested. If the source cannot be played by the specified engine or the engine is not supported by the browser, the next source will be tried.  
Makes [picking order](#picking-order) completely customizeable.</td>

</tr>

<tr class="r3">

<td class="c1">type</td>

<td class="c2">yes</td>

<td class="c3">type</td>

<td class="c4">The video type of this source.</td>

</tr>

<tr class="r4">

<td class="c1">src</td>

<td class="c2">yes</td>

<td class="c3">src</td>

<td class="c4">The location of this source. Path or URL.</td>

</tr>

</tbody>

</table>

*   **Warning** Source options cannot be set in a [VIDEO tag based playlist installation](playlist.html#videotag-install).


## Video tag attributes

In [VIDEO tag based installations](setup.md#videotag-install) you can apply the following standard html5 [VIDEO tag attributes](http://www.w3schools.com/tags/tag_video.asp):

<table>

<tbody>

<tr class="r1">

<td class="c1">attribute</td>

<td class="c2">kind</td>

<td class="c3">level </td>

<td class="c4">description</td>

</tr>

<tr class="r2">

<td class="c1">autoplay</td>

<td class="c2">boolean</td>

<td class="c3">player</td>

<td class="c4">If set, playback will start automatically once the player is loaded - [demo](/standalone/basics/autoplay.html). Same effect as the [player option](#player-options) of the same name.  
Has no effect on mobile devices which [do not allow automatic playback](known-issues.html).</td>

</tr>

<tr class="r3">

<td class="c1">loop</td>

<td class="c2">boolean</td>

<td class="c3">clip</td>

<td class="c4">If set, the video plays again automatically on finish. Corresponds to the JavaScript [clip option](#clip-options) of the same name.  
Cannot be used with [playlists](playlist.html).</td>

</tr>

<tr class="r4">

<td class="c1">poster</td>

<td class="c2">String</td>

<td class="c3">player</td>

<td class="c4">URL or path to [poster image](#poster).</td>

</tr>

</tbody>

</table>

*   <span class="label">Warning</span> Do not use any other standard VIDEO tag attributes as they might cause conflicting or unpredictable behaviour.


## Global JavaScript configuration

Here we provide global settings for _all_ players on the page:

```html
<script src="//releases.flowplayer.org/7.0.4/flowplayer.min.js"></script>
 
<!-- global options -->
<script>
flowplayer.conf = {
   ratio: 5/12,
   splash: true,
   analytics: "UA-27182341-1"
};
</script>
```

The `flowplayer.conf` object sets the global [configuration](#configuration) for Flowplayer. You should customize its properties right after Flowplayer has been included in the [HEAD section](#prerequisites) of your page (with `script src`). Another common place to put site-wide Flowplayer defaults is in an external javascript file which contains the website logic and is loaded after the basic assets. This is a practical way to specify global settings such as the [Google Analytics ID](analytics.html#configuration).

Each player will have these as defaults but they can be overridden for individual players.

You can set individual options as follows:

```html
<script src="//releases.flowplayer.org/7.0.4/flowplayer.min.js"></script>
 
<script>
flowplayer.conf.ratio = 5/12;
</script>
```

Remember to set these _after_ the `flowplayer.conf = {...}` setting if you have one because setting the entire `conf` object will discard any individual property settings. Or use the `flowplayer.set` [function](api.html#flowplayerset) which allows to **extend** an existing global configuration.

## Local JavaScript configuration

The scope of both the pure JavaScript installation and manual installation methods is local. Player specific configuration is passed as argument to the `flowplayer()` function.

*   [manual installation (jQuery)](setup.md#manual-install): 1st argument (optional)
*   [pure JavaScript installation](setup.md#javascript-install): 2nd argument - mandatory, as a `clip` must be configured

Here is an example how to configure the `ratio` [option](setup.md#player-options) for all players which are manually installed into containers of class "player".

```js
// install player manually after DOM is ready
$(function() {
    // install into all elements with class="player"
    $(".player").flowplayer({
        // video dimensions: 470px / 250px
        aspectRatio: "47:25",
        rtmp: "rtmp://s3b78u0kbtx79q.cloudfront.net/cfx/st"
    });
});
```

The configuration is normally passed as in [JavaScript Object Notation](http://www.secretgeek.net/json_3mins.asp) as argument to the `flowplayer()` call. If the argument is a simple string it is treated as the location of the flowplayer swf file.

Local configuration overrides [global configuration](setup.md#global-configuration).

[view standalone page](/standalone/basics/manual.html)

## HTML configuration

Configuration options for specific players can also be set directly in HTML syntax:

```html
<div data-aspect-ratio="47:25" class="flowplayer no-volume">
   <video autoplay>
      <source type="video/webm"
              src="//edge.flowplayer.org/black/470x250.webm">
      <source type="video/mp4"
              src="//edge.flowplayer.org/black/470x250.mp4">
      </video>
</div>
```

The HTML syntax allows to customize specific players even when they are [automatically installed](setup.md#automatic).

HTML configuration overrides [global configuration](setup.md#global-configuration) and [local JavaScript configuration](setup.md#local-configuration).

[view standalone page](/standalone/basics/autoplay.html)


## Order of precedence

The above override rules result in this order of precedence regarding the possibilities to configure the player:

1.  [HTML configuration](setup.md#html-configuration)
2.  [local JavaScript configuration](setup.md#local-configuration)
3.  [global JavaScript configuration](setup.md#global-configuration)


## Configuration summary

Here is an overwiew of the ways to configure Flowplayer mapped to their respective coding, level, and installation method.

● = mandatory   + = accepted   − = not possible

<table>

<tbody>

<tr class="r1">

<td class="c2">syntax</td>

<td class="c3">level</td>

<td class="c4">[automatic](#automatic)</td>

<td class="c5">[manual](#manual-install)</td>

<td class="c6">[pure](#javascript-install)</td>

</tr>

<tr class="r2">

<td class="c1">flowplayer.conf</td>

<td class="c2">JavaScript</td>

<td class="c3">[global](#global-configuration)</td>

<td class="c4">+  
− `clip`</td>

<td class="c5">+  
− `clip`</td>

<td class="c6">+</td>

</tr>

<tr class="r4">

<td class="c1">DIV data-<span class="hilite">attr</span></td>

<td class="c2">HTML</td>

<td class="c3">[player](#player-options)</td>

<td class="c4">+  
− `clip`</td>

<td class="c5">+  
− `clip`</td>

<td class="c6">−</td>

</tr>

<tr class="r5">

<td class="c1">$(sel).flowplayer({  
 <span class="hilite">conf</span>  
})</td>

<td class="c2">jQuery</td>

<td class="c3">[player](#player-options)</td>

<td class="c4">−</td>

<td class="c5">+  
− `clip`</td>

<td class="c6">−</td>

</tr>

<tr class="r6">

<td class="c1">flowplayer(DIV, {  
 <span class="hilite">conf</span>  
})</td>

<td class="c2">JavaScript</td>

<td class="c3">[player](#player-options)</td>

<td class="c4">−</td>

<td class="c5">−</td>

<td class="c6">● `clip`</td>

</tr>

<tr class="r8">

<td class="c1">VIDEO</td>

<td class="c2">HTML</td>

<td class="c3">[clip](#clip-options)</td>

<td class="c4">● SOURCE</td>

<td class="c5">● SOURCE</td>

<td class="c6">−</td>

</tr>

<tr class="r9">

<td class="c1">VIDEO <span class="hilite">attr</span></td>

<td class="c2">HTML</td>

<td class="c3">[mixed](#video-tag-attributes)</td>

<td class="c4">+</td>

<td class="c5">+</td>

<td class="c6">−</td>

</tr>

<tr class="r10">

<td class="c1">clip</td>

<td class="c2">JavaScript</td>

<td class="c3">[clip](#clip-options)</td>

<td class="c4">−</td>

<td class="c5">−</td>

<td class="c6">● `sources`</td>

</tr>

<tr class="r12">

<td class="c1">SOURCE</td>

<td class="c2">HTML</td>

<td class="c3">[source](#source-options)</td>

<td class="c4">●</td>

<td class="c5">●</td>

<td class="c6">−</td>

</tr>

<tr class="r13">

<td class="c1">SOURCE <span class="hilite">attr</span></td>

<td class="c2">HTML</td>

<td class="c3">[source](#source-options)</td>

<td class="c4">● type  
● src  
</td>

<td class="c5">● type  
● src  
</td>

<td class="c6">−</td>

</tr>

<tr class="r14">

<td class="c1">sources[<span class="hilite">index</span>]</td>

<td class="c2">JavaScript</td>

<td class="c3">[source](#source-options)</td>

<td class="c4">−</td>

<td class="c5">−</td>

<td class="c6">● `type`  
● `src`</td>

</tr>

</tbody>

</table>

`sel` = [jQuery selector](http://api.jquery.com/category/selectors/) `DIV` = container element

`attr` = element attribute `conf` = [JSON](http://www.secretgeek.net/json_3mins.asp) option: value mapping `index` = array index


# Keyboard

Flowplayer not only offers a graphical interface. It can also be controled via the keyboard. Here is an overview of the available keyboard shortcuts:

<table>

<tbody>

<tr class="r1">

<td class="c1">Key</td>

<td class="c2">Action</td>

</tr>

<tr class="r2">

<td class="c1">space</td>

<td class="c2">play/pause</td>

</tr>

<tr class="r3">

<td class="c1">q</td>

<td class="c2">stop | unload (in a [splash setup](#splash))</td>

</tr>

<tr class="r4">

<td class="c1">f</td>

<td class="c2">fullscreen</td>

</tr>

<tr class="r5">

<td class="c1">shift + left arrow</td>

<td class="c2">slower (see the [speeds](#player-options) option)</td>

</tr>

<tr class="r6">

<td class="c1">shift + right arrow</td>

<td class="c2">faster (see the [speeds](#player-options) option)</td>

</tr>

<tr class="r7">

<td class="c1">down arrow</td>

<td class="c2">volume down</td>

</tr>

<tr class="r8">

<td class="c1">up arrow</td>

<td class="c2">volume up</td>

</tr>

<tr class="r9">

<td class="c1">m</td>

<td class="c2">mute</td>

</tr>

<tr class="r10">

<td class="c1">left arrow</td>

<td class="c2">seek backward</td>

</tr>

<tr class="r11">

<td class="c1">right arrow</td>

<td class="c2">seek forward</td>

</tr>

<tr class="r12">

<td class="c1">.</td>

<td class="c2">seek to previous position</td>

</tr>

<tr class="r13">

<td class="c1">number</td>

<td class="c2">seek to `number`times 10 percent of duration</td>

</tr>

</tbody>

</table>

Keyboard shortcuts can be turned off by setting the `keyboard` [configuration option](#configuration) to `false`.


# Iframe

For players shown in an IFRAME fullscreen is disabled by default. It would not work in browsers without native fullscreen support, and some browsers forbid fullscreen from IFRAMEs, notably from a remote orgin, without offering a reliable detection mechanism.

If you are in control of the IFRAME's source and the page where the IFRAME is shown you can allow fullscreen by excplicitly setting the `fullscreen` [configuration option](setup.md#player-options) to `true` on the originating page and specifying the `allowfullscreen` attribute for the IFRAME:

```html
<iframe src="//example.com/iframe-src.html"
        width="800" height="500"
        allowfullscreen="true"></iframe>
```

To allow fullscreen playback from within an IFRAME on iOS, additionally the `native_fullscreen` [option](setup.md#player-options) must be set to `true`.

Check out [the iframe demo](http://demos.flowplayer.org/basics/iframe.html).

# Engines

Flowplayer is shipped with two engines: `html5` and `flash`.

Additional engines can be added as plugins for advanced purposes like [MPEG DASH playback](http://demos.flowplayer.org/scripting/dash.html).


## html5 engine

The primary engine is the `html5` engine, unless you configured a different engine for a specific [source](setup.md#source-options) explicitly.


### HTML5 video

Generic HTML5 video support introduced by major desktop browser versions:

<table>

<tbody>

<tr class="r1">

<td class="c1">browser</td>

<td class="c2">ogg</td>

<td class="c3">mp4</td>

<td class="c4">webm</td>

<td class="c5">hls</td>

</tr>

<tr class="r2">

<td class="c1">Internet Explorer</td>

<td class="c2">-</td>

<td class="c3">9.0</td>

<td class="c4">-</td>

<td class="c5">13.0 Edge</td>

</tr>

<tr class="r3">

<td class="c1">Firefox</td>

<td class="c2">3.5</td>

<td class="c3">35.0</td>

<td class="c4">4.0</td>

<td class="c5">-</td>

</tr>

<tr class="r4">

<td class="c1">Chrome</td>

<td class="c2">3.0</td>

<td class="c3">3.0</td>

<td class="c4">6.0</td>

<td class="c5">-</td>

</tr>

<tr class="r5">

<td class="c1">Safari</td>

<td class="c2">-</td>

<td class="c3">3.1</td>

<td class="c4">-</td>

<td class="c5">6.0</td>

</tr>

<tr class="r6">

<td class="c1">Opera</td>

<td class="c2">10.5</td>

<td class="c3">15.0</td>

<td class="c4">10.6</td>

<td class="c5">-</td>

</tr>

</tbody>

</table>

*   <span class="label">Important</span> Native HLS playback support in Internet Explorer Edge is very buggy, using the [hlsjs plugin](plugins.html#hlsjs) is **strongly** recommended.

Safari on Windows is capable to play HTML5 video if QuickTime is installed.

HTML5 video format support on mobiles:

*   MP4: all devices
*   HLS: iOS and most modern other devices

Check out [this dynamic table](http://demos.flowplayer.org/videotest/canplay.html) which shows what formats your current browser can play.


## Flash engine

The Flash engine is chosen to play a source if

1.  the tested video source cannot be played as HTML5 video by the browser and
2.  the tested video type can be played by the Flash engine and
3.  the `engine` [source option](setup.md#source-options) for this source is not set to a value other than "flash" and
4.  the Flash plugin is enabled in the browser

or if

1.  the `engine` [source option](setup.md#source-options) for this source is set to "flash" and
2.  the Flash plugin is enabled in the browser

The Flowplayer Flash component requires Flash version 9.0.0\. Flash supports playback of the [MP4 format](setup.md#video-formats) since version 9.0.115\. Consider it safe to neglect offering a FLV source as fallback for ancient Flash.

The Flash engine supports playback of the following [video formats](setup.md#video-formats):

*   [HLS](#flash-hls)
*   MP4
*   FLV


### Flash HLS

*   <span class="label">Important</span> The [hlsjs plugin](plugins.html#hlsjs) enables HLS playback in modern browsers and devices without requiring Flash. Compared to Flash HLS it features better playback performance and is more resource friendly. - Flash HLS will still be used in legacy browsers.

Flowplayer supports [HLS](setup.md#video-formats) playback with its [Flash engine](#flash-engine). Adaptive Bit Rate (ABR) switching is available not only in browsers which can play HLS in HTML5 video, but also in all other browsers, noteably most desktop browsers.

For live streams this means that the same range of clients can be reached with just one source of type `application/x-mpegurl` as with a combination of HLS for HTML5 video and RTMP for Flash (where RTMP does not offer the benefits of ABR).

Advantages of Flash HLS over RTMP:

*   ABR is available
*   no additonal Flash source required
*   no RTMP server required to offer [random seeking](#random-seeking) via the Flash engine

*   **compatibility** Flash HLS does not support [#EXT-X-BYTERANGE](https://developer.apple.com/library/content/technotes/tn2288/_index.html#//apple_ref/doc/uid/DTS40012238-CH1-BYTE_RANGE_SUPPORT_FOR_SEGMENTS) playlists (#EXT-X-VERSION:4).

Rare scenarios where RTMP delivery for Flash might be preferrable:

*   live streams where synchronicity with the live event is of crucial importance; live stream delivery often is done over RTMP first, which then has to be transformed to HLS causing a slight delay
*   very fine seeking granularity is of crucial importance to the setup - reason: Flash HLS seeks only to keyframe positions [by default](#flashls) and setting [flashls](#flashls) `seekmode: "ACCURATE"` doesn't yield the desired experience. - Even in this scenario RTMP should only be 3rd choice after HLS via the [hlsjs plugin](plugins.html#hlsjs) and native playback.

### Flash video (RTMP)

Flowplayer supports a special `video/flash` source type to target video specifically for Flash. The type is mostly and best used to offer an RTMP stream as Flash source if a [HLS stream](#flash-hls) is not available:

```html
<!-- flowplayer with RTMP configuration option -->
<div class="flowplayer" data-rtmp="rtmp://myrtmpserver.com">
 
  <video>
    <!-- consumed by the html5 engine -->
    <source type="video/webm"  src="//mydomain.com/video.webm">
    <source type="video/mp4"   src="//mydomain.com/video.mp4">
 
    <!-- consumed by the flash engine -->
    <source type="video/flash" src="mp4:path/to/video.mp4">
  </video>
 
</div>
```

RTMP delivery in Flash allows [seeking to unbuffered positions](#random-seeking) in the timeline.

_Important:_

*   The `rtmp` [option](setup.md#player-options) for the server address - also called 'net connection url' - _must_ be set. Please consult the documentation of your server for its exact value.
*   The `src` must be the path on the server, not a full URL. For video on demand it is often prefixed with `mp4:` for MP4 videos. Again the server documentation is your friend.

Specifying a `video/flash` source delivered via HTTP for progressive download is rarely useful:

*   If the video is in [MP4 format](#video-formats), the source of type `video/mp4` will be be [automatically chosen](#picking-order) as Flash fallback format if no HLS or RTMP source is available.
*   The [FLV format](#video-formats) has a lower quality/bitrate ratio compared to MP4 and cannot be played in HTML5 video.

# Server side

## Mime types


Make sure that all the files are available on the server and that the server transmits them with the correct Content-Type. Depending on your server you might have to extend the `.htaccess` or `mime.types` files (Apache), use the IIS manager (Internet Information Server) or set the header via Metadata (Amazon S3). Example `.htaccess` file:

```
AddType video/mp4             .mp4
AddType video/webm            .webm
AddType video/ogg             .ogv
AddType application/x-mpegurl .m3u8
 
# hls transport stream segments:
AddType video/mp2t            .ts
# subtitle text tracks:
AddType text/vtt              .vtt
```

The first 4 mime types above are also the ones most commonly used [source types](#source-options).


## HTTPS

When loading the [Flowplayer assets](#prerequisites) make sure to avoid [mixed content](https://developer.mozilla.org/en-US/docs/Security/MixedContent) if your page is accessed via HTTPS.

The easiest and most flexible way to achieve this is by omitting the protocol:

```html
<!-- omit protocol when loading assets -->
<link rel="stylesheet" src="//example.com/assets/skin/skin.css">
<!-- ... -->
<script src="//example.com/assets/flowplayer.min.js"></script>
```

The same applies to loading the video [sources](setup.md#source-options):

```js
// omit protocol when loading sources
sources: [
    { type: "application/x-mpegurl",
      src:  "//example.com/video.m3u8" },
    { type: "video/mp4",
      src:  "//example.com/video.mp4" }
]
```

or:

```html
<!-- omit protocol when loading sources -->
<source type="application/x-mpegurl" src="//example.com/video.m3u8">
<source type="video/mp4"             src="//example.com/video.mp4">
```

This obviously requires that `example.com` is accessible both via HTTPS and HTTP. Otherwise use the same protocol as the page is served with or a local path - but also read the notes on [sharing](sharing.html#https).


## Cross domain

To make HLS work in Flash Flowplayer's [Flash engine](#flash-engine) must have explicit permission to access the transport streams. The deployment of a a [cross domain policy file](http://www.adobe.com/devnet/articles/crossdomain_policy_file_spec.html) at the _root_ of the domain from which the TS files are served is _obligatory_. It must allow requests from the location of `flowplayerhls.swf` (see the `swfHls` [configuration option](setup.md#player-options)).

Simple example of a `crossdomain.xml` file giving full access to requests from anywhere:

```xml
<?xml version="1.0"?>
<!DOCTYPE cross-domain-policy SYSTEM
"http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">
<cross-domain-policy>
  <allow-access-from domain="*" />
</cross-domain-policy>
```

Refer to the Adobe Flash documentation for a [full specification](http://www.adobe.com/devnet-docs/acrobatetk/tools/AppSec/CrossDomain_PolicyFile_Specification.pdf).

*   <span class="label">Important</span> With Flash HLS it is especially important to load the Flowplayer assets (`flowplayerhls.swf`) and the media via the same [protocol](#https).


## Redirecting

Avoid redirects in the video source URLs. Some browsers may not be able to handle them in HTML5 video.

[Flash HLS](#flash-hls) does not allow for `302` redirecting of relative paths in the master variant HLS playlist.


## Random seeking

Audiences expect to be able to skip back and forth in a video without inconvenience. They expect a "streamed" video. With HTML5 video the server side requirements are now lowered dramatically for offering this feature.

1.  [HLS](#video-formats) is genuinely made to order for this purpose. As Flowplayer's [Flash engine](#flash-engine) plays HLS out of the box, most scenarios are covered, adaptive bitrate streaming included. It is also the most [cost effective](#cost-effective) format.
2.  Almost all modern HTTP servers support [byte-range requests](http://en.wikipedia.org/wiki/Byte_serving). Thus they fulfill the only requirement to "stream" HTML5 video on demand as it can be viewed in partial downloads.
3.  Flash is only capable of progressive download over HTTP. If you cannot offer a HLS stream, consider serving from an RTMP server for Flash delivery. You do not necessarily have to run your own RTMP server for this purpose. Most [content delivery networks](#cdn) (CDNs) offer this alternative and other advantages, see below.
4.  Note on [MP4 metadata](/docs/encoding.html#mp4-and-metadata): make sure the MOOV atom is at the beginning of the file, or some browsers will not start playback before downlaoding the full file.


## CDN

In the interest of your audience, and to lower your worries regarding maintenance, reliability, and delivery speed, consider serving your videos from a [content delivery network](http://en.wikipedia.org/wiki/Content_delivery_network). The videos will be served from edge locations near your viewers, which can result in a noticeable speed gain, resulting in improved playback quality.


# Advanced Flash configuration

The options listed in the following sections should _only_ be applied if needed, and with knowledge regarding their effects.

<section class="level2" id="section_flashls">

## flashls

For finer control of [Flash HLS](#flash-hls) the following options are available as properties of the `flashls` configuration object on the [clip level](setup.md#clip-options):

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">default</td>

<td class="c3">description</td>

</tr>

<tr class="r2">

<td class="c1">capleveltostage</td>

<td class="c2">false</td>

<td class="c3">Whether levels are limited the stage (screen) dimensions.  
`false`: levels will not be limited. All available levels could be used taking only bandwidth into consideration.  
`true`: level width and height (defined in m3u8 playlist) will be compared with the player width and height. Max level will be set depending on the `maxlevelcappingmode` option.</td>

</tr>

<tr class="r3">

<td class="c1">debug</td>

<td class="c2">false</td>

<td class="c3">If `true` Flash HLS debug messages are shown in the JavaScript console.</td>

</tr>

<tr class="r4">

<td class="c1">debug2</td>

<td class="c2">false</td>

<td class="c3">If `true` Flash HLS verbose debug messages are shown in the JavaScript console.</td>

</tr>

<tr class="r5">

<td class="c1">fragmentloadmaxretry</td>

<td class="c2">4</td>

<td class="c3">Maximum number of fragment load retries after I/O error.  
Any I/O error will trigger retries every 1s, 2s, 4s, 8s (exponential, capped at 64s).  
`-1` means infinite retries.  
`0` means no retry, a "Video not found" [error](api.html#error-codes) will be raised instantly.</td>

</tr>

<tr class="r6">

<td class="c1">fragmentloadskipaftermaxretry</td>

<td class="c2">true</td>

<td class="c3">Controls behaviour in case fragment load still fails after max retry timeout.  
`true`: fragment will be skipped and next one will be loaded.  
`false`: "Video file not found" [error](api.html#error-codes) will be raised.</td>

</tr>

<tr class="r7">

<td class="c1">keyloadmaxretry</td>

<td class="c2">-1</td>

<td class="c3">Maximum number of AES encryption key load retries after I/O error.  
Any I/O error will trigger retries every 1s, 2s, 4s, 8s (exponential, capped at 64s).  
`-1` means infinite retries.  
`0` means no retry, an error will be raised instantly.</td>

</tr>

<tr class="r8">

<td class="c1">live_flushurlcache</td>

<td class="c2">false</td>

<td class="c3">If set to `true` a live playlist will be flushed from URL cache before reloading. Use only for testing!</td>

</tr>

<tr class="r9">

<td class="c1">lowbufferlength</td>

<td class="c2">3</td>

<td class="c3">Low buffer threshold in seconds. When crossing down this threshold, the player goes into [loading state](api.html#properties). Playback will still continue.</td>

</tr>

<tr class="r10">

<td class="c1">manifestloadmaxretry</td>

<td class="c2">-1</td>

<td class="c3">Maximum number of manifest (m3u8 playlist) load retries after I/O error.  
If any I/O error is encountered during initial manifest load, a "Video not found" [error](api.html#error-codes) will be raised immediately. After the initial load, any I/O error will trigger retries every 1s, 2s, 4s, 8s (exponential, capped at 64s).  
`-1` means infinite retries.  
`0` means no retry, an error will be raised instantly.</td>

</tr>

<tr class="r11">

<td class="c1">maxbackbufferlength</td>

<td class="c2">30</td>

<td class="c3">Maximum back buffer length in seconds. `0` means infinite back buffering. The back buffer is seekable without redownloading segments.</td>

</tr>

<tr class="r12">

<td class="c1">maxbufferlength</td>

<td class="c2">300</td>

<td class="c3">Maximum buffer length in seconds. `0` means infinite buffering.</td>

</tr>

<tr class="r13">

<td class="c1">maxlevelcappingmode</td>

<td class="c2">"downscale"</td>

<td class="c3">Defines the max level capping mode:  
`"downscale"`: max capped level should be the one with the dimensions equal or greater than the screen dimensions.  
`"upscale"`: max capped level should be the one with the dimensions equal or lower than the screen dimensions.</td>

</tr>

<tr class="r14">

<td class="c1">minbufferlength</td>

<td class="c2">-1</td>

<td class="c3">Minimum buffer length in seconds that needs to be reached before playback can start after seeking, or restart in case of empty buffer.  
By default `-1` some heuristics based on past metrics are used to define an accurate value that should prevent buffer stalling.</td>

</tr>

<tr class="r15">

<td class="c1">seekfromlevel</td>

<td class="c2">-1</td>

<td class="c3">`-1`: automatic seek level selection, keep level before seek.  
From `0` to `1`: indicates the "normalized" preferred bit rate:  
`0`: lowest (non-audio) bit rate is used.  
`1`: highest bit rate is used.  
`0.5`: nearest to middle bitrate will be selected and used first.  
</td>

</tr>

<tr class="r16">

<td class="c1">startfrombitrate</td>

<td class="c2">-1</td>

<td class="c3">If greater than `0`, specifies the preferred bitrate to start with.  
If `-1` (default), and `startfromlevel` is not specified, automatic start level selection will be used.  
Otherwise overrides `startfromlevel`.</td>

</tr>

<tr class="r17">

<td class="c1">startfromlevel</td>

<td class="c2">-1</td>

<td class="c3">`-1`: automatic start level selection, playback will start from level matching download bandwidth (determined from download of first segment).  
`-2`: playback will start from the first level appearing in the variant manifest (regardless of its bit rate) - similar to native HLS starting behaviour.  
From `0` to `1`: indicates the "normalized" preferred bit rate:  
`0`: lowest (non-audio) bit rate is used.  
`1`: highest bit rate is used.  
`0.5`: nearest to middle bitrate will be selected and used first.  
</td>

</tr>

<tr class="r18">

<td class="c1">seekmode</td>

<td class="c2">"KEYFRAME"</td>

<td class="c3">`"KEYFRAME"`: seek to last key frame before requested position.  
`"ACCURATE"`: seek to exact position. Caveat: might cause jumping of video on resume after seek.</td>

</tr>

<tr class="r19">

<td class="c1">usehardwarevideodecoder</td>

<td class="c2">true</td>

<td class="c3">Whether hardware video decoding is enbabled. Only set to `false` to check for potential hardware decoding issues.</td>

</tr>

</tbody>

</table>

*   <span class="label">Important</span> The `flashls` configuration does not influence the behaviour of native HTML5 video HLS playback.


## RTMP options

To fine tune RTMP server settings the `rtmp` option can be specfied in JavaScript object notation. The `rtmp` object accepts the following properties:

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">default</td>

<td class="c3">description</td>

</tr>

<tr class="r2">

<td class="c1">bufferTime</td>

<td class="c2">3</td>

<td class="c3">Specifies how long to buffer messages before starting to display the stream. See [Adobe's docs for NetStream.bufferTime](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetStream.html#bufferTime) for more info.  
In a `live` configuration the default value is `0` as recommended by Adobe; changing the value might cause problems with resuming live streams.</td>

</tr>

<tr class="r3">

<td class="c1">proxy</td>

<td class="c2">best</td>

<td class="c3">Determines which fallback methods are tried if an initial connection attempt to the RTMP server fails. See the [Adobe documentation](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetConnection.html#proxyType) for details.</td>

</tr>

<tr class="r4">

<td class="c1">rtmpt</td>

<td class="c2">true</td>

<td class="c3">Try an RTMP connection through [HTTP tunneling](http://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol#HTTP_tunneling). The one that connects first will be used in playback. Set this to `false` if you want to disable RTMPT.  
</td>

</tr>

<tr class="r5">

<td class="c1">subscribe</td>

<td class="c2">false</td>

<td class="c3">Some live streams require this to be set to `true`. Check with your stream provider or CDN whether their server sends the `FCSubscribe` netConnection event.</td>

</tr>

<tr class="r6">

<td class="c1">url</td>

<td class="c3">Address of the Flash RTMP server.  
Mandatory, corresponds to `rtmp` given as string.</td>

</tr>

</tbody>

</table>

Both forms of the `rtmp` option can be given at [player](setup.md#player-options) and [clip](setup.md#clip-options) level.


# Migration from Version 6

Manual [HLS quality selection](#hls-quality-selection) is now available out of the box via the builtin HD menu.

Discover the revamped [skinning](skinning.html) and [sharing](sharing.html) possibilies.

</section>

<section class="level1" id="section_migration-from-version-5">

# Migration from Version 5

A lot of effort went into keeping the player compatible with existing setups. If you still encounter problems, please check also the migration notes in the [skinning](skinning.html#migration-from-version-5) and [api](api.html#migration-from-version-5) doc sections and turn to our [forum](/forum/) for support.

Installation of a `playlist` of sources into an [empty container element](/v5docs/setup.html#empty-container) has grown up to become a first class citizen in the form of the API friendly [JavaScript installation method](setup.md#javascript-install) in Flowplayer 6 with an extensible [clip object](#clip-object). We recommend to embrace the more flexible full syntax which will give you even more control over each [clip](setup.md#clip-options) and its [sources](setup.md#source-options).

Flowplayer 6 introduces a simpler source [picking order](setup.md#picking-order): Every source will be tried in the given order by all engines available. In the usual recommended setups this will not cause any difference in behaviour.

In the same vein, the `engine` option has moved from the [player level](/v5docs/setup.html#config-options) to the [source level](setup.md#source-options) to allow for complete fine-grained control of video source preferences.

Users of advanced RTMP options like `bufferTime`, `rtmpt`: The options will currently still work when set at player level directly. We recommend to start upgrading to the new [rtmp configuration object](#rtmp-options) which is available both at [player](setup.md#player-options) and [clip](setup.md#clip-options) level and thereby offers increased flexibility.