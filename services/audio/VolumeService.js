const exec = require('child_process').exec;

module.exports = VolumeService = {
    resource: '/volume',
    POST: (ctx, http) => {
        exec('amixer set Master -- ' + http.data + '%');
        http.reply({});
    }
};
