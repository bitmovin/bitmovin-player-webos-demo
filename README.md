# bitmovin-player-webos-demo
This repository contains a sample app that used the Bitmovin HTML5 Player (version 8) on LG webOS

### Using the Sample App with webOS IDE

1. Download [webOS IDE](http://webostv.developer.lge.com/sdk/download/download-sdk/)
2. Open the sample app with webOS IDE
3. Connect your TV Device. This [tutorial](http://webostv.developer.lge.com/develop/app-test/) is a good reference
4. Input your player key into `src/main.js`
5. Run/debug the sample app. If you debug, you will see Chrome developer tools launch. This will enable you to debug, monitor network requests, and execute commands through the javascript console.

### Using the Sample App with webOS CLI

1. Install dependencies with `npm install`
2. Activate developer mode on your TV device and use passphrase to run `npm run connect <ip|host> <passphrase>`
4. Input your player key into `src/main.js`
5. Build the `ipk` package running `npm run build`
6. Install the app to your device `DEVICE=<ip|host> npm run push`
7. You can debug the app with remote debugger with `DEVICE=<ip|host> npm run debug`

* note: If you are having problem with permissions for ares CLI try `chmod +x node_modules/ares-webos-sdk/bin/*`
* tip: If continuous running of `DEVICE=<ip|host> npm run debug` does not work you first need to kill the app by running `DEVICE=<ip|host> npm run stop` and then run debug again.

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
