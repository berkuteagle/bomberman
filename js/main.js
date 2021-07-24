import Game from './game.js';
import Ui from './ui.js';
import { vue } from './deps.js';
import { players, connected } from './store.js';

const game = new Game();
const ui = new Ui('.game', game);

const app = vue.createApp({
    template: '#app-template',
    setup() {

        const counter = vue.ref(0);
        const connect = () => game.connect();

        return {
            connected,
            connect,
            counter,
            players
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

console.log(game);
console.log(ui);

window.game = game;
window.ui = ui;