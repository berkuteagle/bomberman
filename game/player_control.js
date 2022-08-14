export default class PlayerControl {

    #player;

    constructor(player) {
        this.#player = player;
    }

    get player() {
        return this.#player;
    }
}

export class KeyboardPlayerControl extends PlayerControl {

    #keyW;
    #keyA;
    #keyS;
    #keyD;

    constructor(player, scene) {
        super(player);

        this.#keyW = scene.input.keyboard.addKey('W');
        this.#keyA = scene.input.keyboard.addKey('A');
        this.#keyS = scene.input.keyboard.addKey('S');
        this.#keyD = scene.input.keyboard.addKey('D');

        this.#keyW.on('down', () => this.player.walk('u'));
        this.#keyA.on('down', () => this.player.walk('l'));
        this.#keyS.on('down', () => this.player.walk('d'));
        this.#keyD.on('down', () => this.player.walk('r'));

        this.#keyW.on('up', () => {
            if (this.#keyA.isDown) {
                this.player.walk('l');
            } else if (this.#keyD.isDown) {
                this.player.walk('r');
            } else {
                this.player.stop('u');
            }
        });
        this.#keyA.on('up', () => {
            if (this.#keyW.isDown) {
                this.player.walk('u');
            } else if (this.#keyS.isDown) {
                this.player.walk('d');
            } else {
                this.player.stop('l');
            }
        });
        this.#keyS.on('up', () => {
            if (this.#keyA.isDown) {
                this.player.walk('l');
            } else if (this.#keyD.isDown) {
                this.player.walk('r');
            } else {
                this.player.stop('d');
            }
        });
        this.#keyD.on('up', () => {
            if (this.#keyW.isDown) {
                this.player.walk('u');
            } else if (this.#keyS.isDown) {
                this.player.walk('d');
            } else {
                this.player.stop('r');
            }
        });
    }
}

export class RemotePlayerControl extends PlayerControl {

    #uuid;

    constructor(player, uuid) {
        super(player);

        this.#uuid = uuid;
    }

    get uuid() {
        return this.#uuid;
    }
}