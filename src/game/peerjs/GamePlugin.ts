import {
    BaseConnectionErrorType,
    DataConnection,
    DataConnectionErrorType,
    Peer,
    PeerError,
    PeerErrorType
} from 'peerjs';
import { Plugins } from 'phaser';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface IPeerjsGamePluginData {
    remote: string | null;
    enabled: boolean;
}

export interface IMessageText {
    text: string;
}

export interface IMessageSync {
    sync: ArrayBuffer;
}

function checkId(uuid: string | null): string | null {
    if (typeof uuid !== 'string' || !uuid) {
        return null;
    }

    const u = uuid.toLowerCase();

    if (!UUID_PATTERN.test(u)) {
        return null;
    };

    return ['8', '9', 'a', 'b'].indexOf(u.charAt(19)) !== -1 ? u : null;
}

export default class PeerjsGamePlugin extends Plugins.BasePlugin {

    #peer: Peer | null = null;
    #id: string | null = null;
    #remote: string | null = null;
    #connection: DataConnection | null = null;

    #enabled: boolean = false;

    #open: Promise<string>;
    #open_resolver!: (id: string) => void;

    #connect: Promise<string>;
    #connect_resolver!: (remote: string) => void;

    constructor(pluginManager: Plugins.PluginManager) {
        super(pluginManager);

        this.#open = new Promise<string>(resolve => {
            this.#open_resolver = resolve;
        });

        this.#connect = new Promise<string>(resolve => {
            this.#connect_resolver = resolve;
        });
    }

    #onConnectionOpen(): void {
        console.log('open');

        this.#connection!
            .on('close', () => this.#onConnectionClose())
            .on('data', data => this.#onConnectionData(data))
            .on('error', err => this.#onConnectionError(err))
    }

    #onConnectionClose(): void {
        console.log('close');
    }

    #onConnectionData(data: unknown): void {
        console.log(data);
    }

    #onConnectionError(err: PeerError<`${DataConnectionErrorType | BaseConnectionErrorType}`>): void {
        console.error(err);
    }

    #onConnection(connection: DataConnection): void {
        this.#connection = connection;

        if (!this.#remote) {
            this.#remote = connection.peer;
        }

        this.#connect_resolver(this.#remote);

        this.#connection.on('open', () => this.#onConnectionOpen());
    }

    #onOpen(id: string): void {
        this.#id = id;

        this.#open_resolver(this.#id);
    }

    #onError(err: PeerError<`${PeerErrorType}`>): void {
        console.error(err);
    }

    init({ enabled = false }: IPeerjsGamePluginData): void {
        if (this.#enabled = enabled) {
            this.#peer = new Peer();
            this.#peer
                .on('connection', c => this.#onConnection(c))
                .on('open', id => this.#onOpen(id))
                .on('error', err => this.#onError(err));
        }
    }

    start(): void {
        if (this.#enabled) {
            if (this.#peer!.disconnected && !this.#peer!.destroyed) {
                this.#peer!.reconnect();
            }

            if (this.#remote) {
                this.#peer!.connect(this.#remote);
            }
        }
    }

    stop(): void {
        if (this.#enabled) {
            this.#peer!.disconnect();
        }
    }

    connectRemote(remote: string): void {
        if (this.#enabled) {
            const uuid = checkId(remote);

            if (uuid) {
                this.#onConnection(this.#peer!.connect(uuid));
            }
        }
    }

    sendText(message: IMessageText): void {
        if (this.#enabled && this.#connection) {
            this.#connection.send(message);
        }
    }

    sendSync(message: IMessageSync): void {
        if (this.#enabled && this.#connection) {
            this.#connection.send(message);
        }
    }

    destroy(): void {
        if (this.#enabled) {
            this.#peer!.destroy();
        }
    }

    get id(): string | null {
        return this.#id;
    }

    get remote(): string | null {
        return this.#remote;
    }

    get open(): Promise<string> {
        return this.#open;
    }

    get connect(): Promise<string> {
        return this.#connect;
    }

    get enabled(): boolean {
        return this.#enabled;
    }
}
