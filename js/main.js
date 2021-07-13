import Game from './game.js';
import Ui from './ui.js';

const game = new Game();
const ui = new Ui('.game', game);

(async () => {
    for await (let event of game.events) {
        switch (event.event) {
            case 'open':
            case 'ready':
            case 'connection':
            case 'close':
                ui.drawPlayers(game.players);
                ui.updateButtons();
        }
    }
})();

console.log(game);
console.log(ui);

window.game = game;
window.ui = ui;