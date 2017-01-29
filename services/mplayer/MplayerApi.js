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
        if (!!http.data)
            ctx.mPlayer.openPlaylist(http.data);
        http.reply({});
    },
    DELETE: (ctx, http) => {
        ctx.mPlayer.stop();
        http.reply({});
    }
};