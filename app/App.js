const WebSocketClient = require('../lib/WebSocketClient.js');
const MPlayerWrapper = require('../lib/MPlayerWrapper.js');

class App {
    constructor() {
        this.music = {
            status: {}
        };
        this.ws = new WebSocketClient('ws://conductor:1880/wss');
        this.mPlayer = new MPlayerWrapper(this);
    }
}

module.exports = App;