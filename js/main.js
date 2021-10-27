import Game from './game.js';

import { vue } from './deps.js';
import { players, connected } from './store.js';

import Booombers from '../game/booombers.js';
import Transport from '../net/transport.js';
import Node from '../net/node.js';

const game = new Game();
const booombers = new Booombers();

const net_transport = new Transport();
const net_node = new Node('123321', net_transport);

const app = vue.createApp({
    template: '#app-template',
    setup() {
        const connect = () => game.connect();
        const ready = () => game.setReady();
        const connectToPeer = () => {
            if (connectTo.value) {
                game.connectTo(connectTo.value);
            }
        };

        const connectTo = vue.ref('');

        return {
            connectTo,
            connectToPeer,
            connected,
            players,
            connect,
            ready
        };
    }
});

//app.mount('#app');

window.game = game;
window.booombers = booombers;

window.net_transport = net_transport;
window.net_node = net_node;