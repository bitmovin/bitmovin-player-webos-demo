  var player;

window.onload = function() {
	console.log("setup player");
	setupPlayer();
	setupControllerEvents();
}

function setupPlayer() {
	var config = {
			  key: '<YOUR_PLAYER_KEY>',
			  analytics: {
			    key: '<YOUR_ANALYTICS_KEY>',
			    videoId: 'YOUR VIDEO ID',
			    title: 'A descriptive video title'
			  },
			  playback : {
				autoplay : true
			  },
			  tweaks : {
				file_protocol : true,
				app_id : "com.bitmovin.demo.webapp"
			  }
			};

			var container = document.getElementById('player');
			player = new bitmovin.player.Player(container, config);

			var source = {
				// AVC Stream
				//dash : "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
				//hls: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',

				// HEVC Stream
				//dash : "https://bitmovin-a.akamaihd.net/content/multi-codec/hevc/stream.mpd",

				//progressive: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4',

				// DRM Stream
				dash: 'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd',
				drm: {
				    widevine: {
				      LA_URL: 'https://widevine-proxy.appspot.com/proxy'
				    }
				  },
			    poster: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
			};

			player.load(source).then(
			  function(player) {
			    console.log('Successfully created Bitmovin Player instance');
			  },
			  function(reason) {
			    console.log('Error while creating Bitmovin Player instance');
			  }
			);

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
