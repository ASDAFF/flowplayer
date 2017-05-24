$(document).ready(function() {
	$(".player").flowplayer({
		swf:"/flowplayer.swf",
		
		adaptiveRatio: true,
		
		playlist: [
		
			[
				{
					mp4:"/video/video1.mp4"
				}
			],
			
			
			
			[
				{
					mp4:"/video/video2.mp4"
				}
			],
			
			
			[
				{
					mp4:"/video/video3.mp4"
				}
			],
			
			
			[
				{
					mp4:"/video/video4.mp4"
				}
			]
			
		]
		
	});
	
	
});