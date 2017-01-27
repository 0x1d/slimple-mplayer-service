var spawn = require('child_process').spawn;

module.exports = MplayerApi = {
    resource: '/api',
    POST: (ctx, http) => {
        let mode = http.data.mode; // todo handle modes
        ctx.mPlayerInstance = spawn('mplayer', [
            '-playlist', http.data.playlist
        ]);
        /*
        child.stdout.on('data', function(chunk) {
          // output will be here in chunks
        });
        */
    },
    DELETE: (ctx, http) => {
        ctx.mPlayerInstance.kill('SIGHUP');
    }
};
