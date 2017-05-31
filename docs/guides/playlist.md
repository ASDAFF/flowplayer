# Playlist

```html
<div id="default-playlist"
     class="flowplayer"
     data-splash="true"
     data-hls-qualities="false"
     data-aspect-ratio="16:9">
 
   <video>
      <source type="application/x-mpegurl"
              src="//edge.flowplayer.org/night1.m3u8">
      <source type="video/mp4"
              src="//edge.flowplayer.org/night1.mp4">
      </video>
 
   <a class="fp-prev"></a>
   <a class="fp-next"></a>
 
   <div class="fp-playlist">
      <a href="//edge.flowplayer.org/night1.mp4"></a>
      <a href="//edge.flowplayer.org/night2.mp4"></a>
      <a href="//edge.flowplayer.org/night3.mp4"></a>
      <a href="//edge.flowplayer.org/night4.mp4"></a>
      <a href="//edge.flowplayer.org/night5.mp4"></a>
      <a href="//edge.flowplayer.org/night6.mp4"></a>
      <a href="//edge.flowplayer.org/night7.mp4"></a>
   </div>
 
</div>
```

[view standalone page](/standalone/playlist/default.html)

Flowplayer playlist features include:

*   A default playlist interface design out of the box - see [demo above](#default-playlist). It can be [disabled](#player-options) in favour of infinite possibilites to create [your own](/demos/playlist/).
*   The playlist element is nested inside the container so you can style it differently depending on the [player state](skinning.html#states).
*   By default the playlist entries are anchor tags inside a tag with CSS class name `.fp-playlist`. A user without JavaScript support can still see the videos by clicking on the link.
*   You can use [autoplay](setup.html#video-tag-attributes) or a [splash setup](setup.html#splash) just like when you are not using a playlist.
*   If [Analytics](analytics.html) is enabled each video is tracked separately.
*   You can have several playlists on one page.
*   When a playlist is configured the `next()`, `prev()` and `play(index)` methods are available from the [API](api.html#methods). Additionally the `index` and `is_last` properties are available from the [video object](api.html#video-object).

## Installation

As with single videos, Flowplayer installations with playlists can be divided into [2 basic categories](setup.html#2-installation-categories):

*   [VIDEO tag based installations](/docs/playlist.html#videotag-install)
*   [pure JavaScript installations](/docs/playlist.html#javascript-install)

*   **Note** Sections exclusively dedicated to [VIDEO tag based installations](/docs/setup.html#videotag-install) are flagged with a pink border, sections exclusively dedicated to [pure JavaScript installations](/docs/setup.html#javascript-install) with a green border.  
    Advanced opions and functions are colored red.

### Video tag based

Here is a typical setup for a playlist for a [VIDEO tag based](setup.html#videotag-install) playlist installation:

```html
<div class="flowplayer is-splash">
 
   <!-- initial clip -->
   <video>
      <source type="application/x-mpegurl"
              src="//mydomain.com/video1.m3u8">
      <source type="video/mp4"
              src="//mydomain.com/video1.mp4">
   </video>
 
   <!-- playlist root -->
   <div class="fp-playlist">
 
      <!-- playlist entries or "trigger" elements -->
      <a href="//mydomain.com/video1.mp4"></a>
      <a href="//mydomain.com/video2.mp4"></a>
      <a href="//mydomain.com/video3.mp4"></a>
      <a href="//mydomain.com/video4.mp4"></a>
   </div>
 
   <!-- optional prev/next buttons -->
   <a class="fp-prev"></a>
   <a class="fp-next"></a>
 
</div>
```

The initial clip is configured with [multiple formats](setup.html#video-formats) (HLS, MP4). The playlist assumes that all playlist entries are delivered via HTTP and have the same formats available and obey the same file naming scheme.

Advantages of VIDEO tag based playlist installations:

*   Optional content and customization of the trigger elements is easier to set up. In a JavaScript installation you would have to generate this dynamically.
*   The same as for VIDEO tag based installations [in general](setup.html#videotag-install).

Restrictions of VIDEO tag based installations:

*   All playlist entries must obey the same file naming scheme as the first entry.
*   `video/flash` type sources delivered via [RTMP](setup.html#random-seeking) are not allowed.
*   The same as for VIDEO tag based installations [in general](setup.html#videotag-install).

### Pure JavaScript

In a JavaScript playlist installation the `playlist` [option](#player-options) is mandatory and replaces the `clip` [option](setup.html#player-options) for players with single videos with an array of [clip objects](setup.html#clip-options).

```javascript
var allVideos = [{
    sources: [{
        type: 'video/webm',
        src:  "//edge.flowplayer.org/night7.webm"
    }, {
        type: 'video/mp4',
        src:  "//edge.flowplayer.org/night7.mp4"
    }, {
        type: 'video/flash',
        src:  "mp4:night7"
    }]
}, {
    sources: [{
        type: 'video/webm',
        src: "//edge.flowplayer.org/night5.webm"
    }, {
        type: 'video/mp4',
        src:  "//edge.flowplayer.org/night5.mp4"
    }, {
        type: 'video/flash',
        src:  "mp4:night5"
    }]
}, {
    sources: [{
        type: 'video/webm',
        src:  "//edge.flowplayer.org/night6.webm"
    }, {
        type: 'video/mp4',
        src:  "//edge.flowplayer.org/night6.mp4"
    }, {
        type: 'video/flash',
        src:  "mp4:night6"
    }]
}, {
    sources: [{
        type: 'video/webm',
        src:  "//edge.flowplayer.org/night4.webm"
    }, {
        type: 'video/mp4',
        src:  "//edge.flowplayer.org/night4.mp4"
    }, {
        type: 'video/flash',
        src:  "mp4:night4"
    }]
}];
```

The collection of clips above is taken from our [JavaScript playlist demo](/demos/playlist/index.html#js-demo). Storing it in a variable like above allows for flexible handling of the entries. The playlist is ready to be used right away for a JavaScript installation into a prepared container:
```html
<div  id="jsplaylist">
   <!-- optional prev/next buttons -->
   <a class="fp-prev"></a>
   <a class="fp-next"></a>
</div>
 
<script>
flowplayer('#jsplaylist', {
   rtmp: "rtmp://s3b78u0kbtx79q.cloudfront.net/cfx/st",
   playlist: allVideos
});
</script>
```

Upon installation a html structure similar to the one [shown above](/docs/playlist.html#videotag-install) will be generated.

In the [referenced demo](/demos/playlist/index.html#js-demo) you can observe how this approach facilitates the interactive creation of different playlists by user choice. An example where this installation method shows its strengths.

Advantages of JavaScript playlist installations:

*   Complete flexibility regarding the locations of the sources.
*   RTMP streams can be configured as sources of type `video/flash`.
*   Not all source types of the first entry must also be available for all other entries. While this is recommended for all playlists regardless of the installation method, there are situations where this can come in handy, like mixing [video on demand and live streams](http://demos.flowplayer.org/playlist/vodpreroll-livefeature.html).

## CSS classes

### Interface

*   `fp-default-playlist` - this [state class](skinning.html#states) is added to the container element when the default playlist design is in use
*   `fp-custom-playlist` - this [state class](skinning.html#states) is added to container element when the `customPlaylist` [option](#player-options) is `true` - the class can also be added to the container as [configurable state](skinning.html#configurable-states).


### States

A "video{clip_index}" CSS class name will be assigned to the root element and a "is-active" CSS class is given to the currently active trigger. For example

```html
<div class="flowplayer video1">
 
   <div class="fp-playlist">
      <a href="//mydomain.com/video1.mp4"></a>
      <a href="//mydomain.com/video2.mp4" class="is-active"></a>
      <a href="//mydomain.com/video3.mp4"></a>
      <a href="//mydomain.com/video4.mp4"></a>
   </div>
 
</div>
```

You can for example show/hide HTML inside the player based on which clip is being played.

```css
.flowplayer.video1 .info1 {
   display: block;
}
```

A convenience class `last-video` represents the last clip. For example:

```css
.last-video.is-finished {
   /* do your marketing magic */
}
```

## Next and prev links

Anchors with "fp-prev" and "fp-next" class names will move forward and backward on the playlist. For example

```html
<div class="flowplayer fp-custom-playlist">
 
   <video>
      <source type="application/x-mpegurl" src="//mydomain.com/my-video.m3u8">
      <source type="video/mp4"             src="//mydomain.com/my-video.mp4">
   </video>
 
   <div class="fp-playlist">
      <a href="//mydomain.com/my-video.mp4"></a>
      ...
   </div>
 
   <a class="fp-prev">prev</a>
   <a class="fp-next">next</a>
</div>
```

## Configuration

### Player options

The playlist behaviour is configured at the top level of the [configuration object](/docs/setup.html#configuration). The following options are available:

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">default value</td>

<td class="c3">description</td>

</tr>

<tr class="r2">

<td class="c1">active</td>

<td class="c2">"is-active"</td>

<td class="c3">The CSS class name assigned to the trigger element referencing the currently loaded clip.</td>

</tr>

<tr class="r3">

<td class="c1">advance</td>

<td class="c2">true</td>

<td class="c3">Play the next clip when the current one is finished and stop when last clip ends.</td>

</tr>

<tr class="r4">

<td class="c1">customPlaylist</td>

<td class="c2">false</td>

<td class="c3">If set to `true` the default playlist UI is disabled in favour of a custom made one. See our [playlist demos](/demos/playlist/) for various examples.  
Same as adding the `fp-custom-playlist` [state class](skinning.html#configurable-states) to the container element.</td>

</tr>

<tr class="r5">

<td class="c1">loop</td>

<td class="c2">false</td>

<td class="c3">Continue from the first clip when last clip ends.</td>

</tr>

<tr class="r6">

<td class="c1">playlist</td>

<td class="c2">array</td>

<td class="c3">An array of [clip objects](setup.html#clip-options).  
Not allowed in a [VIDEO tag based installation](#videotag-install).</td>

</tr>

<tr class="r7">

<td class="c1">query</td>

<td class="c2">".fp-playlist a"</td>

<td class="c3">jQuery selector for trigger elements.  
Not allowed in a [pure JavaScript installation](#javascript-install).  
If the `query` selects a playlist element with a unique `id`, like `"#my-playlist a"`, this element can be located anywhere on the page outside the player container.</td>

</tr>

<tr class="r8">

<td class="c1">startIndex</td>

<td class="c2">0</td>

<td class="c3">Zero-based index of playlist item from which playback starts - [view demo](http://demos.flowplayer.org/playlist/linkable.html#video-2).</td>

</tr>

</tbody>

</table>

Except for `playlist`, all options can also be specified as data-attributes in a [VIDEO tag based installation](/docs/playlist.html#videotag-install).

*   <span class="label">Caveat</span> Do not use the `loop` [VIDEO tag attribute](setup.html#video-tag-attributes) in conjunction with playlists.

### Clip options

[Clip options](setup.html#clip-options) are used to configure each playlist item.

In [video tag based installations](/docs/playlist.html#videotag-install) the data-attribute is added to the trigger element of the playlist item ([demo](/demos/playlist/#dots-demo) showing `data-title`).

<table>

<tbody>

<tr class="r1">

<td class="c1">option</td>

<td class="c2">default</td>

<td class="c3">html syntax </td>

<td class="c4">description</td>

</tr>

<tr class="r2">

<td class="c1"><span class="hilite">flashls</span></td>

<td class="c2">Object</td>

<td class="c4">Flash (HLS) only. The [flashls object](setup.html#flashls-options).  
Cannot be set in HTML syntax.</td>

</tr>

<tr class="r3">

<td class="c1">loop</td>

<td class="c2">false</td>

<td class="c3">data-loop</td>

<td class="c4">Whether this clip should play again automatically on finish.  
For loop playback of the playlist use the `loop` option at [player level](#player-options).</td>

</tr>

<tr class="r4">

<td class="c1">live</td>

<td class="c2">false</td>

<td class="c3">data-live</td>

<td class="c4">Whether this clip is a live stream.</td>

</tr>

<tr class="r5">

<td class="c1"><span class="hilite">rtmp</span></td>

<td class="c2">Object</td>

<td class="c4">Flash (RTMP) only. When specified in JavaScript object notation: the [rtmp object](setup.html#rtmp-options). See [this section](#rtmp) for how this option is handled in playlists.  
Not allowed in HTML syntax.</td>

</tr>

<tr class="r6">

<td class="c1">rtmp</td>

<td class="c4">Flash (RTMP) only. When specified as String: Address of the Flash RTMP server. See [this section](#rtmp) for how this option is handled in playlists.  
Not allowed in HTML syntax.</td>

</tr>

<tr class="r7">

<td class="c1">sources</td>

<td class="c2">Array</td>

<td class="c4">A list of [video formats](#video-formats). Refer to [source options](#source-options) for parameters and detailed descriptions.  
In HTML syntax: the `href` attribute of the [trigger elements](#video-tag-based).</td>

</tr>

<tr class="r8">

<td class="c1">title</td>

<td class="c3">data-title</td>

<td class="c4">Sets a title for this clip. Displayed in a top bar when hovering over the player.  
**Caveat:** Has no visible effect in conjunction with the `aside-time` skin [modifier class](skinning.html#modifier-classes).</td>

</tr>

</tbody>

</table>

</section>

<section class="level3" id="section_rtmp">

### RTMP

[RTMP options](setup.html#rtmp-options) must be set for _each_ clip of a playlist if:

*   the clips of a playlist are served from different RTMP servers or
*   require different RTMP options or
*   the playlist contains sources of [type "video/flash"](setup.html#flash-video) which are not served via RTMP


### Extension and plugin clip options

These options are `undefined` by default but are supported by the referenced extensions or plugins.

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


## JavaScript API

### Video object

</hgroup>

The playlist extension adds the following properties to the [video object](api.html#video-object):

<table>

<tbody>

<tr class="r1">

<td class="c1">property</td>

<td class="c2">default value</td>

<td class="c3">description</td>

</tr>

<tr class="r2">

<td class="c1">index</td>

<td class="c2">integer</td>

<td class="c3">The zero based index of the current clip in the playlist.</td>

</tr>

<tr class="r3">

<td class="c1">is_last</td>

<td class="c2">False</td>

<td class="c3">Whether the current clip is the last one in the playlist.</td>

</tr>

</tbody>

</table>

*   <span class="label">Tip</span> When [skinning](skinning.html) is involved you can often achieve your scripting goals with pure [CSS programming](#css-programming-example) by defining rules for the [playlist classes](#css-classes) instead of querying JavaScript API properties.

### Methods

The playlist extension provides the following [methods](api.html#methods) for the [player API](api.html):

<table>

<tbody>

<tr class="r1">

<td class="c1">method</td>

<td class="c2">description</td>

</tr>

<tr class="r2">

<td class="c1">addPlaylistItem(clip)</td>

<td class="c2">Appends the `clip` [object](setup.html#clip-object) given in the argument to the current playlist.</td>

</tr>

<tr class="r3">

<td class="c1">next()</td>

<td class="c2">Advances to the next clip in the playlist. Same effect as a click on the [next](#next-and-prev-links) link.</td>

</tr>

<tr class="r4">

<td class="c1">play(index)</td>

<td class="c2">Plays the clip at the given zero based `index` in a playlist. For example: `play(0)` plays the first clip.</td>

</tr>

<tr class="r5">

<td class="c1">prev()</td>

<td class="c2">Jumps to the previous clip previous clip in the playlist. Same effect as a click on the [prev](#next-and-prev-links) link.</td>

</tr>

<tr class="r6">

<td class="c1">removePlaylistItem(index)</td>

<td class="c2">Removes the `clip` object at given `index` in the current playlist from the playlist.</td>

</tr>

<tr class="r7">

<td class="c1">setPlaylist(array)</td>

<td class="c2">Similar to the `load` [method](api.html#load), but takes a [JavaScript playlist](#javascript-playlists) as argument and does not have a callback.</td>

</tr>

</tbody>

</table>

## Migration from Version 6

As the player is now shipped with a builtin default playlist design, a custom playlist layout must be announced with the `customPlaylist` [option](#player-options).