import EventsQueue from './eventsQueue.js';

import Node from './net/node.js';

const _node = Symbol('node');
const _allowed = Symbol('allowed');

export default class Connection {
    constructor() {
        this[_node] = new Node();
    }

    connect(uuid) {
        this[_node].connect(uuid);
    }

    send(data) {
        const keys = Object.keys(this[_node].connections);
        const hash = md5(data);

        keys.forEach(uuid => {
            this[_node].connections[uuid][0].send({ data, hash });
        });
    }

    get events() {
        return this[_node].events;
    }

    get peer() {
        return this[_node].peer;
    }

    get id() {
        return this[_node].peer && this[_node].peer.id || null;
    }

    freeze(uuids) {
        if (!this[_allowed]) {
            this[_allowed] = [...uuids];
        }
    }
}
