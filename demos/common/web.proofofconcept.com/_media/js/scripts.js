/*
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
MISC
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
*/

var ismobile=(Browser.Platform.android==true || Browser.Platform.ios==true ? true : false);
var flashEnabled=(Browser.Plugins.Flash==false || Browser.Plugins.Flash.version<9 ? false : true);

window.addEvent('domready', function() {
		
	// MOBILE
	if (ismobile==true){
	}
	
	// IE6
	if (Browser.name=='ie' && Browser.version=='6'){
		alert("We have detected that you are using IE6. Please upgrade your browser before using our site.");	
	}
	
});


/*
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
AJAX
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
*/

var myRequest;
var myRequestFade='';
function ajax_execute(div,func,data,fade,erase){
	if(myRequest) myRequest.cancel();
	if(myRequestFade!='') myRequestFade.stop();
	myRequest = new Request({
								
		method: 'post', evalScripts: true, url: uriDir+'_php/ajax_display.php',
		
		onRequest: function(){
			
			// IF LOADING ICON EXISTS, SHOW IT
			if (document.id(div+'_loading'))
				loadingSet=setTimeout("document.id('"+div+"_loading').setStyle('display','')",10);
			if (fade=='true'){
				var myElement=document.id(div);
				myElement.setStyle('opacity','0');
			}
		},
		
		onSuccess: function(responseText, responseXML) { 
			// IF LOADING ICON EXISTS, HIDE IT
			if (document.id(div+'_loading')){
				clearTimeout(loadingSet);
				document.id(div+'_loading').setStyle('display','none');
			}
			// IF FADE
			if (fade=='true'){
				myRequestFade=new Fx.Tween(document.id(div),{property:'opacity',duration:200});
				myRequestFade.start(0,1);
			}
			
			if (document.id(div) && div!='') { document.id(div).empty();}
			if (document.id(div) && div!='') { document.id(div).set('html',responseText);}

		},
		onFailure: function(){
			alert('Error: Please check your network connections and try again');
		}
		
	});
	
	myRequest.send('func='+func+'&'+data);
	
}

/*
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
OVERLAY
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
*/

var Overlay = new Class({
  
  Implements: [Options,Events],
  
  options:  {
    id: 'overlay',
    color: '#000',
    duration: 300,
    opacity: 1,
	identity:0,
    zIndex: 5000,
    name: null/*
    onClick: $empty,
    onClose: $empty,
    onHide: $empty,
    onOpen: $empty,
    onShow: $empty
    */
  },
  
  initialize: function(container,options) {
    this.setOptions(options);
    this.container = document.id(container);
    this.overlay = new Element('div',{
      id: this.options.id,
      opacity: 0,
      styles: {
        position: 'absolute',
        left: 0,
        top: 0,
		'vertical-align':'middle',
        'z-index': 11
      },
      events: {
        click: function() {
          this.fireEvent('click');
        }.bind(this)
      }
    }).inject(this.container);
    this.dimmer = new Element('div',{
      opacity: 0,
      id: 'dimmer_'+this.options.id,
      'class':'dimmer',
      events: {
        click: function() {
          this.fireEvent('click');
        }.bind(this)
      }
    }).inject(this.container);
    this.tweenContainer = new Fx.Tween(this.overlay,{ 
      duration: this.options.duration,
      link: 'cancel',
      property: 'opacity',
      onStart: function() {
        var size = this.container.getScrollSize();
        this.overlay.setStyles({
          width: size.x,
          height: size.y
        });
		if (this.overlay.getStyle('opacity')=='0'){
			var scroll = $(window).getScroll();
			this.overlay.getElement('div').setStyle('top',scroll.y+150);
		}
      }.bind(this),
      onComplete: function() {
        this.fireEvent(this.overlay.get('opacity') == this.options.opacity ? 'show' : 'hide');
		if (this.overlay.get('opacity') != this.options.opacity) { this.overlay.destroy();this.dimmer.destroy();}
      }.bind(this)
    });
    this.tweenDimmer = new Fx.Tween(this.dimmer,{ 
      duration: this.options.duration,
      link: 'cancel',
      property: 'opacity',
      onStart: function() {
        var size = this.container.getScrollSize();
        this.dimmer.setStyles({
          width: size.x,
          height: size.y
        });
      }.bind(this)
    });

  },
  open: function() {
    this.fireEvent('open');
	this.overlay.setStyle('visibility','visible');
	this.dimmer.setStyle('visibility','visible');
	if (Browser.name=='ie' && (Browser.version=='7' || Browser.version=='8')){
        var size = this.container.getScrollSize();
        this.overlay.setStyles({
          width: size.x,
          height: size.y
        });
		this.overlay.setStyle('opacity','1');
		 this.dimmer.setStyles({
          width: size.x,
          height: size.y
        });
		this.dimmer.setStyle('opacity','1');
		var scroll = $(window).getScroll();
		this.overlay.getElement('div').setStyle('top',scroll.y+150);
		
	}
	else {
   	 this.tweenContainer.start(this.options.opacity);
   	 this.tweenDimmer.start(this.options.opacity/1.3);
   	}
  },
  close: function() {
	$$("div.fc-tbx").destroy();
    if (Browser.name=='ie' && (Browser.version=='7' || Browser.version=='8'))
  	cacheDivs[this.options.identity]=this.overlay.getElement('div').getElement('div').clone(true,true);
  	else
  	cacheDivs[this.options.identity]=this.overlay.getElementById(this.options.identity);
    this.fireEvent('close');
	if (Browser.name=='ie' && (Browser.version=='7' || Browser.version=='8')){
		this.overlay.destroy();
		this.dimmer.destroy();
	}
	else {
   	 this.tweenContainer.start(0);
   	 this.tweenDimmer.start(0);
   	}
  }
});

var olay=new Array();
var lock=0;
var cacheDivs=new Array();
function createOverlay(id,width,ajax){ // ID=ID of window; TITLE=header title; AJAX=ajax command

	// GRAB CONTENT IF NOT AJAX
	if (ajax==null) {
		var element=$(id);
		if (element==null)
		var element=cacheDivs[id];
	}
	
	// ONLY CREATE OVERLAY IF DOES NOT ALREADY EXIST
		
	olay[id] = new Overlay(document.body, { 
		duration: 200,
		identity:id,
		id:'overlay'+id,
		name:ajax,
		onClick: function(){
			if (lock==0) {
				if (Browser.name=='ie' && ajax=='plan'){}
				else
				olay[id].close();
			}
		}
	});	
	
	// ADD CONTAINER
	var overlayContainer=new Element('div',{'class':'overlayContent'}).addEvent('mouseenter',function(){lock=1}).addEvent('mouseleave',function(){lock=0}).inject($('overlay'+id),'top').setStyles({'width':width+'px'});
	var overlayInner=new Element('div',{'class':'overlayInner'}).inject(overlayContainer,'top').setStyles({'width':width+'px'});
	// ADD CONTENT TO CONTAINER
	if (ajax==null) // insert existing div
	element.inject(overlayInner,'bottom').setStyle('display','block');
	else // load ajax info
	var element=loadDialogAjax(ajax,overlayInner,id);
	
	// ACTIVATE CHECKBOX
	//checkBoxOn(olay[id].overlay);
	
	// ACTIVATE BUTTONS
	if (element && element.getElementById("accept"))
	element.getElementById("accept").addEvent("click",accept);
	
	// OPEN DIALOG
	olay[id].open();
	//popupPost(id);
	
}
// LOAD AJAX IN DIALOG
function loadDialogAjax(ajax,divID,itemID){
	var dialogContainer=new Element('div').inject($(divID),'top').setStyles({'text-align':'center','padding':'10px'});
	var dialogLoading=new Element('img',{'src':uriDir+'_media/images/loader.gif','class':'overlayLoader'}).inject(dialogContainer,'top');
	ajax_execute(divID,"dialogContent","type="+ajax+'&id='+itemID);
}

/*
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
MEMBERS
 -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-
*/
/*
window.addEvent('domready', function() {
	if (client){
		var list = $$('#members .preLoad');
		list.each(function(element) {
		 
			var fx = new Fx.Styles(element, {duration:200, wait:false});
		 
			element.addEvent('mouseenter', function(){
				fx.start({
					'margin-left': 5,
					'background-color': '#666',
					color: '#ff8'
				});
			});
		 
			element.addEvent('mouseleave', function(){
				fx.start({
					'margin-left': 0,
					'background-color': '#333',
					'color': '#888'
				});
			});
		 
		});
	}
});

*/
var myPlayer;

function setFlow(){
	dir='./';
	myPlayer=flowplayer("videoPlay", {src:dir+"_media/js/flowplayer/flowplayer.commercial-3.2.15.swf",wmode:"transparent"}, {
		key:'#$c4f07e85360f59f357e',
		plugins: {
				controls: {
					url: dir+"_media/js/flowplayer/flowplayer.controls-3.2.14.swf",
					
				      backgroundGradient: 'none',
				      sliderColor: '#000000',
				      timeSeparator: ' ',
				      tooltipColor: '#000000',
				      volumeSliderColor: '#ffffff',
				      progressColor: '#112233',
				      durationColor: '#a3a3a3',
				      buttonColor: '#ffffff',
				      disabledWidgetColor: '#555555',
				      volumeBorder: '1px solid rgba(128, 128, 128, 0.7)',
				      sliderGradient: 'none',
				      sliderBorder: '1px solid rgba(128, 128, 128, 0.7)',
				      buttonOffColor: 'rgba(130,130,130,1)',
				      volumeSliderGradient: 'none',
				      backgroundColor: '#000000',
				      timeColor: '#ffffff',
				      borderRadius: '0',
				      bufferColor: '#000000',
				      tooltipTextColor: '#ffffff',
				      buttonOverColor: '#ffffff',
				      callType: 'default',
				      progressGradient: 'none',
				      timeBorder: '0px solid rgba(0, 0, 0, 0.3)',
				      timeBgColor: 'rgb(0, 0, 0, 0)',
				      bufferGradient: 'none',
				      volumeColor: '#ffffff',
				      height: 24,
				 time:false
				 }
	   

		},
 		
		canvas: {
		   backgroundColor: "#000",
		   backgroundGradient: "none",
		   border:"2px solid #000"
		},
		screen: {
			wmode: "transparent",
		   backgroundColor: "#000",
		   backgroundGradient: "none"
		},
		accelerated: true,
		clip: {
			autoPlay: true,
			eventCategory: "Product Videos",
			scaling: "fit",
			bufferLength: 8
		}
		
	}).ipad({ simulateiDevice: false});
	
}





