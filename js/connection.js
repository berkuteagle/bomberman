import { toBinaryUUID } from './utils.js';

const _peer = Symbol('peer');
const _peers = Symbol('peers');
const _id = Symbol('id');

export default class Connection {
    constructor() {
        const peer = new Peer(null, {});

        this[_peer] = peer;
        this[_peers] = {};

        peer.on('open', id => this[_id] = id);
        peer.on('connection', connection => {
            if (!this[_peers][connection.peer]) {
                this[_peers][connection.peer] = connection;
            }
        });
    }

    get peer() {
        return this[_peer];
    }

    get id() {
        return this[_id];
    }

    get peers() {
        return Object.keys(this[_peers]);
    }

    get binary() {
        return this.peers.map(toBinaryUUID);
    }

    get binStr() {
        return toBinaryUUID(this.id).map((i)=>i.toString(2).padStart(8, '0'));
    }
}
