"use strict";

const websocket = require('websocket');

class WebSocketClient extends websocket.client {
    constructor(server) {
        super();
        this.server = server;
        this.bindEvents();
        this.connect(server);
    }
    bindEvents() {
        this.on('connect', (connection) => {
            this.connection = connection;
        });
    }
    reconnect() {
        this.connect(this.server);
    }
}

module.exports = WebSocketClient;