const exec = require('child_process').exec;

module.exports = VolumeService = {
    resource: '/volume',
    POST: (ctx, http) => {
        exec('amixer set PCM -- ' + http.data.volumeLevel + '%');
        http.reply({});
    }
};