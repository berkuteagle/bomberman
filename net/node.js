const _network = Symbol('network');
const _buffer = Symbol('buffer');
const _transport = Symbol('transport');
const _uuid = Symbol('uuid');
const _handlers = Symbol('handlers');

export default class Node {
    constructor(transport) {
        this[_transport] = transport;

        this[_network] = new Set();
        this[_buffer] = new Map();

        this[_handlers] = {
            connect: e => this._onConnect(e),
            disconnect: e => this._onDisconnect(e),
            message: e => this._onMessage(e),
            start: e => this._onStart(e)
        };
    }

    start() {
        this[_transport].addEventListener('connect', this[_handlers].connect);
        this[_transport].addEventListener('disconnect', this[_handlers].disconnect);
        this[_transport].addEventListener('message', this[_handlers].message);
        this[_transport].addEventListener('start', this[_handlers].start);
        this[_transport].start();
    }

    stop() {
        this[_transport].removeEventListener('connect', this[_handlers].connect);
        this[_transport].removeEventListener('disconnect', this[_handlers].disconnect);
        this[_transport].removeEventListener('message', this[_handlers].message);
        this[_transport].removeEventListener('start', this[_handlers].start);
        this[_transport].stop();
    }

    _onConnect(event) {
        this[_network].add(event.detail);
    }

    _onDisconnect(event) {
        this[_network].delete(event.detail);
    }

    _onMessage(event) {
        console.log(event.detail);
    }

    _onStart(event) {
        this[_uuid] = event.detail;
    }

    get uuid() {
        return this[_uuid];
    }
}