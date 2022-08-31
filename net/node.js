import Transport from './transport.js';

export default class Node {

    #transport = null;
    #network = null;
    #buffer = null;
    #uuid = null;
    #handlers = null;

    constructor() {
        this.#transport = new Transport();
        this.#network = new Set();
        this.#buffer = new Map();
        this.#handlers = {
            connect: e => this._onConnect(e),
            disconnect: e => this._onDisconnect(e),
            message: e => this._onMessage(e),
            start: e => this._onStart(e)
        };
    }

    start() {
        this.#transport.addEventListener('connect', this.#handlers.connect);
        this.#transport.addEventListener('disconnect', this.#handlers.disconnect);
        this.#transport.addEventListener('message', this.#handlers.message);
        this.#transport.addEventListener('start', this.#handlers.start);
        this.#transport.start();
    }

    stop() {
        this.#transport.removeEventListener('connect', this.#handlers.connect);
        this.#transport.removeEventListener('disconnect', this.#handlers.disconnect);
        this.#transport.removeEventListener('message', this.#handlers.message);
        this.#transport.removeEventListener('start', this.#handlers.start);
        this.#transport.stop();
    }

    connect(uuid) {
        this.#transport.connect(uuid);
    }

    disconnect(uuid) {
        this.#transport.disconnect(uuid);
    }

    _onConnect(event) {
        this.#network.add(event.detail);
    }

    _onDisconnect(event) {
        this.#network.delete(event.detail);
    }

    _onMessage(event) {
        console.log(event.detail);
    }

    _onStart(event) {
        this.#uuid = event.detail;
    }

    get uuid() {
        return this.#uuid;
    }
}
