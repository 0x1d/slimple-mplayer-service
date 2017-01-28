module.exports = {
    name: 'stop',
    invoke: function(ctx, data) {
        ctx.mPlayerInstance.stop();
        if (ctx.ws.client.connection) {
            ctx.ws.connection.send(JSON.stringify({
                topic: 'rpi.music',
                playerState: 'stop'
            }));
        }
    }
};