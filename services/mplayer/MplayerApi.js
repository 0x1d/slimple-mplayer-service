const playlists = require('../../playlists.js');

module.exports = MplayerApi = {
    resource: '/api',
    GET: (ctx, http) => {
        http.reply({
            status: ctx.music.status,
            playlists: playlists
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