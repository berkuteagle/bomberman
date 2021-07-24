export default class Ui {
    constructor(selector, game) {
        this._el = document.querySelector(selector);

        this._game = game;

        this._rb = this._el.querySelector('button#ready');
        this._cbt = this._el.querySelector('button#connectTo');

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
}