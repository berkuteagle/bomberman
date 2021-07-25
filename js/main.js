import Game from './game.js';

import { vue } from './deps.js';
import { players, connected } from './store.js';

import Booombers from '../game/booombers.js';

const game = new Game();
const booombers = new Booombers();

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