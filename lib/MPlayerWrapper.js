const mplayer = require('mplayer');

class MPlayerWrapper extends mplayer {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.bindEvents();
    }
    bindEvents() {
        this.on('status', this.statusChanged);
    }
    statusChanged(data) {
        this.ctx.music.status = data;
        if (!this.ctx.ws.connection && !this.ctx.ws.connection.connected) {
            this.ctx.ws.reconnect();
        }
        this.ctx.ws.connection.send(JSON.stringify({
            topic: 'rpi.music',
            playerState: 'change',
            status: data
        }));
    }
}

module.exports = MPlayerWrapper;