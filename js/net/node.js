import EventsEmitter from '../eventsEmitter.js';
import { argGuard } from '../utils.js';

const _peer = Symbol('peer');
const _subscribe = Symbol('subscribe');

export default class Node extends EventsEmitter {
    constructor(options = {}) {
        super();
        this[_peer] = new Peer(null, options);
        this[_peer].on('open', (id) => {
            this.emmit({ name: 'open', id });
        });
        this[_peer].on('connection', connection => this[_subscribe](connection));
    }

    [_subscribe](connection) {
        connection.on('data', (data) => {
            this.emmit({ name: 'data', data });
        })
        connection.on('close', () => {
            this.emmit({ name: 'close', id: connection.peer });
        });
    }

    connect(uuid = argGuard('UUID must be defined!')) {
        if (!this[_peer].connections[uuid] && uuid !== this[_peer].id) {
            const connection = this[_peer].connect(uuid);
            connection.on('open', () => {
                this.emmit({ name: 'connection', id: uuid });
            });
            this[_subscribe](connection);
        }
    }

    get peer() {
        return this[_peer];
    }

    get connections() {
        return this[_peer].connections || [];
    }
}