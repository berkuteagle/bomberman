import { toBinaryUUID } from './utils.js';

const p = Symbol('private');

export default class Connection {
    constructor(peer = null) {
        if (!peer) {
            throw Error('peerjs instance required')
        }

        this[p] = {peer, peers: {}};

        this[p].peer.on('open', id => this[p].id = id);
        this[p].peer.on('connection', connection => {
            if (!this[p].peers[connection.peer]) {
                this[p].peers[connection.peer] = connection;
            }
        });
    }

    get peer() {
        return this[p].peer;
    }

    get id() {
        return this[p].id;
    }

    get peers() {
        return Object.keys(this[p].peers);
    }

    get binary() {
        return this.peers.map(toBinaryUUID);
    }

    get binStr() {
        return toBinaryUUID(this.id).map((i)=>i.toString(2).padStart(8, '0'));
    }
}
