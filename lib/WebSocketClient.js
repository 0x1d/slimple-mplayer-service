"use strict";

const websocket = require('websocket');

class WebSocketClient extends websocket.client {
    constructor(server) {
        super();
        this.bindEvents();
        this.connect(server);
    }
    bindEvents() {
        this.on('connect', (connection) => {
            this.connection = connection;
        });
    }
}

module.exports = WebSocketClient;