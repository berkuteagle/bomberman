import EventsQueue from './eventsQueue.js';

const _peer = Symbol('peer');
const _events = Symbol('events');
const _allowed = Symbol('allowed');

export default class Connection {
    constructor() {
        this[_events] = new EventsQueue();
        const peer = new Peer(null, {});

        this[_peer] = peer;

        peer.on('open', id => {
            this[_events].emmit({ event: 'open', id });
        });
        peer.on('connection', connection => {
            if (this[_allowed] && !this[_allowed].includes(connection.peer)) {
                connection.close();
            } else {
                this[_events].emmit({ event: 'connection', id: connection.peer });
            }
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
