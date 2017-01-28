const slimple = require('slimple');
const WebSocketClient = require('websocket').client;
const MPlayer = require('mplayer');

slimple.run({
    port: 8081,
    servicePath: '/services'
}, {
    music: {
        status: {}
    }
});