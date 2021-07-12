import Connection from './connection.js';
import Level from './level.js';
import Player from './player.js';
import { toBinaryString } from './utils.js';
import EventsQueue from './eventsQueue.js';

const _level = Symbol('level');
const _players = Symbol('players');
const _state = Symbol('state');
const _connection = Symbol('connection');
const _id = Symbol('id');
const _events = Symbol('events');

export default class Game {
    constructor() {
        this[_level] = new Level();
        this[_events] = new EventsQueue();
        this[_players] = {};
        this[_state] = 'new';
    }

    get events() {
        return this[_events];
    }

    get level() {
        return this[_level];
    }

    get players() {
        return Object.values(this[_players]);
    }

    get playersIds() {
        return Object.keys(this[_players]);
    }

    get state() {
        return this[_state];
    }

    addPlayer(uuid) {
        if (!this[_players][uuid]) {
            this[_players][uuid] = new Player(uuid);
        }
    }

    async connect() {
        this[_connection] = new Connection();
        for await (let event of this[_connection].events) {
            switch (event.event) {
                case 'open':
                    this[_id] = event.id;
                    this.addPlayer(event.id);
                    this[_state] = 'connected';
                    break;
                case 'connection':
                    this.addPlayer(event.id);
                    break;
            }
            this[_events].emmit(event);
        }
    }

    setReady() {
        if (this[_players][this[_id]]) {
            this[_players][this[_id]].state = 'ready';
            this[_events].emmit({event: 'ready', id: this[_id]});
        }
    }

    run() {
        const playerIds = Object.keys(this[_players]).sort();
        if (this[_state] !== 'play' && playerIds.length > 1 && playerIds.every(id => this[_players][id].ready)) {
            this[_state] = 'play';
            this[_connection].freeze(playerIds);

            playerIds.forEach((id, idx) => { this[_players][id].number = idx + 1 });

            const fillKey = playerIds.map(toBinaryString).join();
            this[_level].fill(fillKey);
        }
    }
}
