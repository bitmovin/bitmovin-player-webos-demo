/* eslint-env browser */
var APP_ID = 'com.bitmovin.demo.webapp';
var PLAYER_KEY = '<YOUR_PLAYER_KEY>';
var ANALYTICS_KEY = '<YOUR_ANALYTICS_KEY>';

var player;
var source = {
  // Clear, unprotected stream
  // dash: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',

  // Widevine Stream
  dash: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
  drm: {
    widevine: {
      LA_URL: 'https://widevine-proxy.appspot.com/proxy',
    },
  },
  title: 'Art of Motion',
};

window.onload = function () {
  setupControllerEvents();
  setupPlayer();

  var keySystem = webOSDev && webOSDev.DRM.Type.WIDEVINE;
  var webosDrmAgent = getDrmAgent(keySystem);

  // In the app is started shortly after webOS is rebooted the DRM system and CMD
  // might not be fully ready to use for DRM playback. Therefore we should await
  // drmAgents onsuccess callback before we try to load DRM source.
  if (webosDrmAgent) {
    isDrmLoaded(webosDrmAgent)
      .then(function () {
        return loadSource(source);
      })
      .catch(function (e) {
        console.log('Error while loading drm Agent', e);
      });
    return;
  }

  // In case we don't have drmAgent available, just load the source normal way.
  loadSource(source);
};

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
  // Analytics
  bitmovin.player.core.Player.addModule(window.bitmovin.analytics.PlayerModule);

  var conf = {
    key: PLAYER_KEY,
    playback: {
      autoplay: true,
      preferredTech: [
        {
          player: 'html5',
          streaming: 'dash',
        },
      ],
    },
    style: {
      ux: false,
    },
    tweaks: {
      file_protocol: true,
      app_id: APP_ID,
      BACKWARD_BUFFER_PURGE_INTERVAL: 10,
    },
    buffer: {
      video: {
        forwardduration: 30,
        backwardduration: 10,
      },
      audio: {
        forwardduration: 30,
        backwardduration: 10,
      },
    },
    analytics: {
      key: ANALYTICS_KEY,
      videoId: "AOM",
      title: "Art Of Motion Analytics Test",
      config: {
        origin: APP_ID
      }
    },
    ui: false,
  };

  var container = document.getElementById('player');
  player = new bitmovin.player.core.Player(container, conf);
  new bitmovin.playerui.UIFactory.buildDefaultTvUI(player);
}

function loadSource(source) {
  player.on(bitmovin.player.core.PlayerEvent.Warning, function (data) {
    console.log('On Warning: ' + JSON.stringify(data));
  });

  player.on(bitmovin.player.core.PlayerEvent.Error, function (data) {
    console.log('On Error: ' + JSON.stringify(data));
  });

  return player
    .load(source)
    .then(function () {
      // Success
      console.log('Successfully created bitmovin player instance');
    })
    .catch(function (err) {
      // Error!
      console.error('Error while creating bitmovin player instance', err);
    });
}

function setupControllerEvents() {
  document.addEventListener('keydown', function (inEvent) {
    var keycode;

    if (window.event) {
      keycode = inEvent.keyCode;
    } else if (inEvent.which) {
      keycode = inEvent.which;
    }
    switch (keycode) {
      case 13:
        tooglePlayPause();
        break;
      case 415:
        // Play Button Pressed
        player.play();
        break;
      case 19:
        // Pause BUtton Pressed
        player.pause();
        break;
      case 412:
        // Jump Back 30 Seconds
        player.seek(player.getCurrentTime() - 30);
        break;
      case 417:
        // Jump Forward 30 Seconds
        player.seek(player.getCurrentTime() + 30);
        break;
      case 413:
        // Unload Player
        player.unload();
        break;
      default:
        console.log('Key Pressed: ' + keycode);
    }
  });
}

function tooglePlayPause() {
  if (player.isPaused()) {
    player.play();
  } else {
    player.pause();
  }
}

function getDrmAgent(keySystem) {
  return webOSDev && keySystem && webOSDev.drmAgent(keySystem);
}

function loadDrm(drmAgent) {
  return new Promise(function (resolve, reject) {
    try {
      drmAgent.load({
        onSuccess: function (res) {
          resolve(res);
        },
        onFailure: function (e) {
          reject(e);
        },
      });
    } catch (e) {
      reject('Error while loading DRM manager', e);
    }
  });
}

function isDrmLoaded(drmAgent) {
  return new Promise(function (resolve, reject) {
    if (!drmAgent) {
      return reject('No drmAgent');
    }

    drmAgent.isLoaded({
      onSuccess: function (response) {
        if (response.loadStatus === true) {
          resolve(response);
        } else {
          loadDrm(drmAgent)
            .then(function (result) {
              resolve(result);
            })
            .catch(function (err) {
              reject(err);
            });
        }
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
}
