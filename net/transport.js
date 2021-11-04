const _peer = Symbol('peer');
const _notify = Symbol('notify');
const _init = Symbol('init');

export default class Transport extends EventTarget {

    start() {
        if (this[_peer] && !this[_peer].destroyed) {
            if (this[_peer].disconnected) {
                this[_peer].reconnect();
            }
        } else {
            this[_init]();
        }
    }

    stop() {
        if (this[_peer] && !this[_peer].disconnected && !this[_peer].destroyed) {
            this[_peer].disconnect();
        }
    }

    [_init]() {
        this[_peer] = new Peer();
        this[_peer].on('open', id => {
            this[_notify]('start', id);
        });
        this[_peer].on('connection', connection => {
            connection.on('open', () => {
                this[_notify]('connect', connection.id);

                connection.on('data', data => {
                    this[_notify]('message', { id: connection.id, message: data });
                });
                connection.on('close', () => {
                    this[_notify]('disconnect', connection.id);
                })
            });
        });
    }

    [_notify](name, detail) {
        this.dispatchEvent(new CustomEvent(name, { detail }));
    }

    broadcast(message) {
        for (let peer of this[_peer].connections) {
            peer.send(message);
        }
    }

    send(uuid, message) {
        const peer = this[_peer].connections[uuid];
        if (peer) {
            peer.send(message);
        }
    }

    connect(uuid) {
        this[_peer].connect(uuid);
    }

    disconnect(uuid) {
        const peer = this[_peer].connections[uuid];
        if (peer) {
            peer.close();
        }
    }
}