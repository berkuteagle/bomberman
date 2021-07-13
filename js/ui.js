export default class Ui {
    constructor(selector, game) {
        this._el = $(selector);
        this._game = game;

        this._rb = this._el.find('button.ready').button();
        this._cb = this._el.find('button.connect').button();
        this._cbt = this._el.find('button.connectTo').button();

        this._rb.click(() => {
            this._game.setReady();
        });

        this._cb.click(() => {
            this._game.connect();
        });

        this._cbt.click(() => {
            const uuid = this._el.find('input.connectToInput')[0].value;
            if (uuid) {
                this._game.connectTo(uuid);
            }
        });
    }

    drawPlayers() {
        this._el.find('.items').html(this._game.players.map(pl => `<div>${pl.uuid} - ${pl.state}</div>`).join(''));
    }

    updateButtons() {
        if (this._game.state === 'connected') {
            this._cb.button('disable');
        } else {
            this._cb.button('enable');
        }
    }
}