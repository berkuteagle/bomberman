import Game from './game.js';

import { vue } from './deps.js';
import { players, connected } from './store.js';

const game = new Game();

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

app.mount('#app');

(async () => {
    for await (let event of game.events) {
        switch (event.event) {
            case 'open':
            case 'ready':
            case 'connection':
            case 'close':
                players.value = game.players.map(pl => ({
                    uuid: pl.uuid,
                    state: pl.state,
                    stateClass: pl.state === 'ready' ? 'bg-primary' : 'bg-secondary'
                }));
                connected.value = game.state === 'connected';
        }
    }
})();

window.game = game;