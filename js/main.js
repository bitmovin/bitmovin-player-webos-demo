window.onload = function() {
	setupPlayer();
	setupControllerEvents();
}


function setupPlayer() {
	var conf = {
		key : "YOUR PLAYER KEY",
		playback : {
			autoplay : true
		},
//		style: {
//			ux: false
//		},
		tweaks : {
			file_protocol : true,
			app_id : "com.bitmovin.demo.webapp",
			max_buffer_level: 30,
			max_backward_buffer_level: 10,
			BACKWARD_BUFFER_PURGE_INTERVAL: 10
		}
	};

	var source = {
		// AVC Stream
		//dash : "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
		// HEVC Stream
		//dash : "https://bitmovin-a.akamaihd.net/content/multi-codec/hevc/stream.mpd"
	
		//Widevine Stream
		dash: "http://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd",
		drm: {
			widevine: {
				LA_URL: "https://widevine-proxy.appspot.com/proxy",
			}			
		}
	}
	
	var container = document.getElementById('player');
	var player = new bitmovin.player.Player(container, conf);
	
	player.load(source).then(function(value) {
		// Success
		console.log("Successfully created bitmovin player instance");
	}, function(reason) {
		// Error!
		console.log("Error while creating bitmovin player instance");
	});
	
	player.on(bitmovin.player.PlayerEvent.Warning, function(data){
        console.log("On Warning: "+JSON.stringify(data))
    });
	player.on(bitmovin.player.PlayerEvent.Error, function(data){
        console.log("On Error: "+JSON.stringify(data))
    });
}

function setupControllerEvents() {
	document.addEventListener("keydown", function(inEvent){
		var keycode;
		 
		if(window.event) { 
		    keycode = inEvent.keyCode;
		} else if(e.which) { 
		    keycode = inEvent.which;
		} 
		switch(keycode) {
		    case 415: 
		    	//Play Button Pressed
		    	player.play();
		    	break;
		    case 19: 
		    	//Pause BUtton Pressed
		    	player.pause(); 
		    	break; 
		    case 412:
		    	//Jump Back 30 Seconds
		    	player.seek(player.getCurrentTime()-30)
		    	break;
		    case 417:
		    	//Jump Forward 30 Seconds
		    	player.seek(player.getCurrentTime()+30)
		    	break;
		    case 413:
		    	//Unload Player
		    	player.unload();
		    	break;
		    default:
		    	console.log("Key Pressed: "+keycode);
		}
		
		
	});
}