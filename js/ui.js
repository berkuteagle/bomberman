export default class Ui {
    constructor(selector, game) {
        this._el = document.querySelector(selector);

        this._game = game;

        this._cb = this._el.querySelector('button#connect');
        this._rb = this._el.querySelector('button#ready');
        this._cbt = this._el.querySelector('button#connectTo');

        this._cb.addEventListener('click', () => {
            this._game.connect();
        })

        this._rb.addEventListener('click', () => {
            this._game.setReady();
        })

        this._cbt.addEventListener('click', () => {
            const uuid = this._el.querySelector('input#connectToInput').value;
            if (uuid) {
                this._game.connectTo(uuid);
            }
        })
    }

    drawPlayers() {
        this._el.querySelector('.items').innerHTML = this._game.players.map(pl => `<li>${pl.uuid} <span class="badge bg-${pl.state === 'ready' ? 'primary' : 'secondary'}">${pl.state}</span></li>`).join('');
    }

    updateButtons() {
        if (this._game.state === 'connected') {
            this._cb.setAttribute('disabled', 'disabled');
        } else {
            this._cb.removeAttribute('disabled')
        }
    }
}