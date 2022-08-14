import EventsEmitter from '../eventsEmitter.js';
import { argGuard } from '../utils.js';

export default class Node extends EventsEmitter {

    #peer;

    constructor(options = {}) {
        super();

        this.#peer = new Peer(null, options);
        this.#peer.on('open', id => {
            this.emmit({ name: 'open', id });
        });
        this.#peer.on('connection', connection => this.#subscribe(connection));
    }

    #subscribe(connection) {
        connection.on('data', (data) => {
            this.emmit({ name: 'data', data });
        })
        connection.on('close', () => {
            this.emmit({ name: 'close', id: connection.peer });
        });
    }

    connect(uuid = argGuard('UUID must be defined!')) {
        if (!this.#peer.connections[uuid] && uuid !== this.#peer.id) {
            const connection = this.#peer.connect(uuid);
            connection.on('open', () => {
                this.emmit({ name: 'connection', id: uuid });
            });
            this.#subscribe(connection);
        }
    }

    get peer() {
        return this.#peer;
    }

    get connections() {
        return this.#peer.connections || {};
    }
}