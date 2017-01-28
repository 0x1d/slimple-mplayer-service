module.exports = {
    name: 'musicStateChange',
    invoke: function(ctx, data) {
        console.log('asdw');
        ctx.ws.connection.send(JSON.stringify({
            topic: 'rpi.music',
            playerState: 'change',
            status: data
        }));
    }
};