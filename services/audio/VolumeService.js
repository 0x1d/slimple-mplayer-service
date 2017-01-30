const exec = require('child_process').exec;

module.exports = VolumeService = {
    resource: '/volume',
    POST: (ctx, http) => {
        console.log(http.data);
        exec('amixer set PCM -- ' + http.data + '%');
        http.reply({});
    }
};