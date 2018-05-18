# bitmovin-player-webos-demo
This repository contains a sample app that used the Bitmovin HTML5 Player on LG webOS

### Using the Sample App

1. Download [webOS IDE](http://webostv.developer.lge.com/sdk/download/download-sdk/)
2. Open the sample app with webOS IDE 
3. Connect your TV Device. This [tutorial](http://webostv.developer.lge.com/develop/app-test/) is a good reference 
4. Input your player key into `main.js` 
5. Run/debug the sample app. If you debug, you will see Chrome developer tools launch. This will enable you to debug, monitor network requests, and execute commands through the javascript console.

### Notes for developing your own app
Make sure to enable `file_protocol` and set your `app_id` in the `tweaks` section of your config 

```
var conf = {
	key : "<YOUR_PLAYER_KEY>",
	source : {
		dash: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd"
	},
	playback : {
		autoplay : true
	},
	tweaks : {
		file_protocol : true,
			app_id : "com.bitmovin.demo.webapp"
	}
};
```

### Additional Documentation

Complete API documentation is available at https://developer.bitmovin.com/hc/en-us

Other demo applications https://bitmovin.com/demo/
