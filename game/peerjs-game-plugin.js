import { Peer } from './peer.js';
import { Plugins } from './phaser.js';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default class PeerjsGamePlugin extends Plugins.BasePlugin {

    #peer = null;
    #ready = false;
    #rival = null;
    #enabled = false;

    constructor(pluginManager) {
        super(pluginManager);
    }

    init({ rival = null, enabled = false }) {
        this.#enabled = enabled;

        if (this.#enabled = enabled) {

            this.#ready = new Promise((resolve) => {
                this.#peer = new Peer();
                this.#peer.on('open', () => {
                    resolve();
                });
            });
        }

        if (this.checkRival(rival)) {
            this.#rival = rival;
        }
    }

    start() {
        if (this.#enabled) {
            if (this.#peer.disconnected && !this.#peer.destroyed) {
                this.#peer.reconnect();
            }

            if (this.#rival && !this.#peer.connections[this.#rival]) {
                this.#peer.connect(this.#rival);
            }
        }
    }

    stop() {
        this.#peer?.disconnect();
    }

    destroy() {
        this.#peer?.destroy();
    }

    get ready() {
        return this.#ready;
    }

    get rival() {
        return this.#rival;
    }

    get id() {
        return this.#peer?.id;
    }

    checkRival(uuid) {
        if (typeof uuid !== 'string') {
            return false;
        }

        const u = uuid.toLowerCase();

        if (!UUID_PATTERN.test(u)) {
            return false;
        };

        switch (u.charAt(14) | 0) {
            case 1:
            case 2:
                return true;
            case 3:
            case 4:
            case 5:
                return ['8', '9', 'a', 'b'].indexOf(u.charAt(19)) !== -1;
            default:
                return false;
        }
    }
}
