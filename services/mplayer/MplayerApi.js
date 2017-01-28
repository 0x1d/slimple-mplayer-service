var WebSocketClient = require('websocket').client;
var MPlayer = require('mplayer');

module.exports = MplayerApi = {
    resource: '/api',
    GET: (ctx, http) => {
        http.reply({
            status: ctx.music.status,
            playlists: [
                { 'techno fm': 'http://yp.shoutcast.com/sbin/tunein-station.pls?id=1151202' },
                { 'deep fm': 'http://yp.shoutcast.com/sbin/tunein-station.pls?id=291180' },
                { 'psyradio': 'http://ipx.psyradio.org:8010/listen.pls' },
                { 'fristky': 'http://yp.shoutcast.com/sbin/tunein-station.pls?id=47007' }
            ]
        });
    },
    POST: (ctx, http) => {
        // console.log(http.data);
        //let mode = http.data.mode; // todo handle modes
        if (!ctx.mPlayerInstance) {
            ctx.mPlayerInstance = new MPlayer();
            ctx.ws = {
                client: new WebSocketClient()
            };
            ctx.ws.client.on('connect', (connection) => {
                ctx.ws.connection = connection;
            });
            if (!ctx.ws.client.connection || !ctx.ws.client.connection.connected) {
                ctx.ws.client.connect('ws://conductor:1880/wss');
            }
        }
        ctx.mPlayerInstance.on('status', (data) => {
            ctx.music.status = data;
            ctx.ws.connection.send(JSON.stringify({
                topic: 'rpi.music',
                playerState: 'change',
                status: data
            }));
        });

        if (!!http.data)
            ctx.mPlayerInstance.openPlaylist(http.data);
        http.reply({});
    },
    DELETE: (ctx, http) => {
        if (ctx.mPlayerInstance) {
            ctx.mPlayerInstance.stop();
        }
        http.reply({});
    }
};