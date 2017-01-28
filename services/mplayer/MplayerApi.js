var WebSocketClient = require('websocket').client;
var MPlayer = require('mplayer');

module.exports = MplayerApi = {
    resource: '/api',
    POST: (ctx, http) => {
	console.log(http.data);
        let mode = http.data.mode; // todo handle modes
        if(!ctx.mPlayerInstance){
		ctx.mPlayerInstance = new MPlayer();
	}
	ctx.mPlayerInstance.on('status', (data) => {
		var client = new WebSocketClient();
		client.on('connect', (connection) => {
			console.log('wsc send ' + data);
			connection.send(data);
			connection.disconnect();
		});
		client.connect('ws://conductor:1880/wss');
	});
	ctx.mPlayerInstance.openPlaylist('http://ipx.psyradio.org:8010/listen.pls');
	http.reply({});
    },
    DELETE: (ctx, http) => {
        ctx.mPlayerInstance.stop();
	http.reply({});
    }
};
