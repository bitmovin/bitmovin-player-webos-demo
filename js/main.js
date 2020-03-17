var player;

window.onload = function() {
	setupControllerEvents();
	setupPlayer();
}


function setupPlayer() {
	
	// add all necessary (and loaded) modules to the player core
	bitmovin.player.core.Player.addModule(window.bitmovin.player.polyfill.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player['engine-bitmovin'].default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player['container-mp4'].default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player['container-ts'].default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.mserenderer.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.abr.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.drm.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.xml.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.dash.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.hls.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.style.default);
	bitmovin.player.core.Player.addModule(window.bitmovin.player.webos.default);
	
	var conf = {
		key : "YOUR_PLAYER_KEY",
		playback : {
			autoplay : true,
			preferredTech: [{
				player: 'html5',
			    streaming: 'dash'
			  }]
		},
		style: {
			ux: false
		},
		tweaks : {
			file_protocol : true,
			app_id : "com.bitmovin.demo.webapp",
			BACKWARD_BUFFER_PURGE_INTERVAL: 10
		},
		buffer :{
			video: {
				forwardduration: 30,
				backwardduration: 10,
			},
			audio: {
				forwardduration: 30,
				backwardduration: 10
			}
		}
	}

	var source = {
		// AVC Stream
        // dash : "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
		// HEVC Stream
		// dash : "https://bitmovin-a.akamaihd.net/content/multi-codec/hevc/stream.mpd"
	
		//Widevine Stream
		dash: 'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd',
		drm: {
			widevine: {
		        LA_URL: 'https://widevine-proxy.appspot.com/proxy'
		    }
		}
	}
	
	var container = document.getElementById('player');
	player = new bitmovin.player.core.Player(container, conf);
	
	player.load(source).then(function(value) {
		// Success
		console.log("Successfully created bitmovin player instance");
	}, function(reason) {
		// Error!
		console.log("Error while creating bitmovin player instance");
	});
	
	player.on(bitmovin.player.core.PlayerEvent.Warning, function(data){
        console.log("On Warning: "+JSON.stringify(data))
    });
	player.on(bitmovin.player.core.PlayerEvent.Error, function(data){
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
	      	case 13:
	          tooglePlayPause();
	          break;
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

function tooglePlayPause() {
	if(player.isPaused()) {
		player.play();
	} else {
	   player.pause();
	}
}