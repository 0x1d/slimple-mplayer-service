"use strict";

const websocket = require('websocket');

class WebSocketClient {
    constructor(server) {
        this.client = new websocket.client();
        this.client.on('connect', (connection) => {
            this.connection = connection;
        });
        this.client.connect(server);
    }
}

module.exports = WebSocketClient;