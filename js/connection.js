import EventsQueue from './eventsQueue.js';

const _peer = Symbol('peer');
const _events = Symbol('events');
const _allowed = Symbol('allowed');

const _data = Symbol('data');

export default class Connection {
    constructor() {
        this[_events] = new EventsQueue();
        this[_data] = {};
        const peer = new Peer(null, {});

        this[_peer] = peer;

        peer.on('open', id => {
            this[_events].emmit({ event: 'open', id });
        });
        peer.on('connection', connection => {
            if (this[_allowed] && !this[_allowed].includes(connection.peer)) {
                connection.close();
            } else {
                connection.on('close', () => {
                    this[_events].emmit({ event: 'close', id: connection.peer });
                });
                connection.on('data', (data) => {
                    if (!this[_data][data.hash]) {
                        this.send(data.data);
                    }
                    if (this[_data][data.hash].includes(connection.peer)) {
                        this[_data][data.hash].splice(this[_data][data.hash].indexOf(connection.peer), 1);
                    }
                    if (!this[_data][data.hash].length) {
                        delete this[_data][data.hash];
                        this[_events].emmit({ event: 'data', id: connection.peer, data });
                    }
                });
                this[_events].emmit({ event: 'connection', id: connection.peer });
            }
        });

    }

    connect(uuid) {
        if (!this[_peer].connections[uuid]) {
            const connection = this[_peer].connect(uuid);
            connection.on('open', () => {
                this[_events].emmit({ event: 'connection', id: uuid });
            });
            connection.on('close', () => {
                this[_events].emmit({ event: 'close', id: connection.peer });
            });
            connection.on('data', (data) => {
                if (!this[_data][data.hash]) {
                    this.send(data.data);
                }
                if (this[_data][data.hash].includes(connection.peer)) {
                    this[_data][data.hash].splice(this[_data][data.hash].indexOf(connection.peer), 1);
                }
                if (!this[_data][data.hash].length) {
                    delete this[_data][data.hash];
                    this[_events].emmit({ event: 'data', id: connection.peer, data });
                }
            });
        }
    }

    send(data) {
        const keys = Object.keys(this[_peer].connections);
        const hash = md5(data);

        this[_data][hash] = keys;
        keys.forEach(uuid => {
            this[_peer].connections[uuid][0].send({ data, hash });
        });
    }

    get events() {
        return this[_events];
    }

    get peer() {
        return this[_peer];
    }

    get id() {
        return this[_peer] && this[_peer].id || null;
    }

    freeze(uuids) {
        if (!this[_allowed]) {
            this[_allowed] = [...uuids];
        }
    }
}
