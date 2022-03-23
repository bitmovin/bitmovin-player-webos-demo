# bitmovin-player-webos-demo
This repository contains a sample app that uses the Bitmovin HTML5 Player (version 8) on LG webOS. Project structure:

| File/Folder      | Description                                                                                                                                |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| index.html       | HTML laying out the structure of the demo and definition of the used player resources                                                      |
| js/main.js       | main JavaScript file our demo application will use                                                                                         |
| images/          | place for the application logo                                                                                                             |
| css/             | stylesheets used for making the demo application pretty                                                                                    |
| webOSTVjs-1.2.4/ | LG-provided library offering TV-specific features ([details](https://webostv.developer.lge.com/develop/code-samples/webostvjs-library/))   |
| appinfo.json     | contains app-metadata like app-id, title and icon ([details](https://webostv.developer.lge.com/develop/app-developer-guide/app-metadata/)) |

Need some guidance? Check out our tutorial on [how to use the Bitmovin web player on LG webOS TVs](https://bitmovin.com/docs/player/tutorials/getting-started-with-the-web-player-on-lg-webos).
### Using the Sample App with `webOS TV` Visual Studio Code extension

1. Install the `webOS TV CLI` as explained in [this tutorial](https://webostv.developer.lge.com/sdk/command-line-interface/installation/)
2. Install [Visual Studio Code](https://code.visualstudio.com/) and the `webOS TV extension` according to [this tutorial](https://webostv.developer.lge.com/sdk/vs-code-extension/installation/)
3. Open the sample app in VS Code
4. Connect to your TV. This [tutorial](http://webostv.developer.lge.com/develop/app-test/) is a good reference
5. Input your player key into `src/main.js`
6. Run/debug the sample app. If you debug, you will see Chrome developer tools launch. This will enable you to debug, monitor network requests, and execute commands through the JavaScript console.

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

## Support
If you have any questions or issues with this SDK or its examples, or you require other technical support for our services, please log in to your Bitmovin Dashboard at https://bitmovin.com/dashboard and [create a new support case](https://bitmovin.com/dashboard/support/cases/create). Our team will get back to you as soon as possible :+1:
