var WebSocketClient = require('websocket').client;
var MPlayer = require('mplayer');

module.exports = MplayerApi = {
    resource: '/api',
    POST: (ctx, http) => {
        console.log(http.data);
        let mode = http.data.mode; // todo handle modes
        if (!ctx.mPlayerInstance) {
            ctx.mPlayerInstance = new MPlayer();
            ctx.ws = {
                client: new WebSocketClient()
            };
            ctx.wsc.on('connect', (connection) => {

                ctx.ws.connection = connection;
            });
            ctx.ws.client.connect('ws://conductor:1880/wss');
        }
        ctx.mPlayerInstance.on('status', (data) => {
            let title = data.title;
            if (title) {
                console.log('wsc send ' + title);
                ctx.ws.connection.send({
                    topic: 'rpi.music',
                    status: data,
                    title: title
                });
            }
        });
        ctx.mPlayerInstance.openPlaylist('http://ipx.psyradio.org:8010/listen.pls');
        http.reply({});
    },
    DELETE: (ctx, http) => {
        ctx.mPlayerInstance.stop();
        http.reply({});
    }
};