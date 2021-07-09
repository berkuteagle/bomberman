import Connection from './connection.js';
import Level from './level.js';
import Player from './player.js';
import { toBinaryString } from './utils.js';

const _level = Symbol('level');
const _players = Symbol('players');
const _state = Symbol('state');
const _connection = Symbol('connection');
const _id = Symbol('id');

export default class Game {
    constructor() {
        this[_level] = new Level();
        this[_players] = {};
        this[_state] = 'new';
    }

    get level() {
        return this[_level];
    }

    get players() {
        return Object.values(this[_players]);
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
                    break;
                case 'connection':
                    this.addPlayer(event.id);
                    break;
            }
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
