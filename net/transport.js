const MSG_SEPARATOR = '@@';
const DATA_HEADER = '#D#';
const SERVICE_HEADER = '#S#';
const PING_MSG = '#PING#';
const PONG_MSG = '#PONG#';

function makeMessage(data, type) {
    switch (type) {
        case 'data': return DATA_HEADER + MSG_SEPARATOR + JSON.stringify(data);
        case 'service': return SERVICE_HEADER + MSG_SEPARATOR + data;
        default:
            return PING_HEADER;
    }
}

export default class Transport extends EventTarget {

    #peer = null;

    start() {
        if (this.#peer && !this.#peer.destroyed) {
            if (this.#peer.disconnected) {
                this.#peer.reconnect();
            }
        } else {
            this.#init();
        }
    }

    stop() {
        if (this.#peer && !this.#peer.disconnected && !this.#peer.destroyed) {
            this.#peer.disconnect();
        }
    }

    #init() {
        this.#peer = new Peer();
        this.#peer.on('open', id => {
            this.#notify('start', id);
        });
        this.#peer.on('connection', connection => {
            this.#subscribe(connection);
        });
    }

    #subscribe(connection) {
        connection.on('open', () => {
            this.#notify('connect', connection.peer);

                connection.on('data', data => {
                    this.#on_data(connection.peer, data);
                });
                connection.on('close', () => {
                    this.#notify('disconnect', connection.peer);
                })
        });
    }

    /**
     * 
     * @param {String} uuid 
     * @param {String} data 
     */
    #on_data(uuid, data) {
        if (data === PING_MSG) {
            this.#send(uuid, PONG_MSG);
        } else if (data.startsWith(SERVICE_HEADER)) {
            const cmd = data.split(MSG_SEPARATOR)[1];
            console.log(cmd);
        } else if (data.startsWith(DATA_HEADER)) {
            const msg = data.split(MSG_SEPARATOR)[1] || '';
            let msg_data;
            try {
                msg_data = JSON.parse(msg);
            } catch {
                msg_data = '';
            }
            this.#notify('message', { id: uuid, message: msg_data });
        }

    }

    #notify(name, detail) {
        this.dispatchEvent(new CustomEvent(name, { detail }));
    }

    broadcast(message) {
        const msg = makeMessage(message, 'data');
        for (let peer of this.#peer.connections) {
            peer.send(msg);
        }
    }

    send(uuid, message) {
        this.#send(uuid, makeMessage(message, 'data'));
    }

    #send(uuid, data) {
        const peer = this.#peer.connections[uuid];
        if (peer) {
            peer.send(data);
        }
    }

    connect(uuid) {
        this.#subscribe(this.#peer.connect(uuid));
    }

    disconnect(uuid) {
        const peer = this.#peer.connections[uuid];
        if (peer) {
            peer.close();
        }
    }
}