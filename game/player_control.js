import Player from './player.js';

export default class PlayerControl {

    #player;

    /**
     * @param {Player} player 
     */
    constructor(player) {
        this.#player = player;
    }

    get player() {
        return this.#player;
    }

    update() {
        throw new Error('method "update" must be implemented');
    }
}

export class KeyboardPlayerControl extends PlayerControl {

    #cursors;

    constructor(player, scene) {
        super(player);

        this.#cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        if (this.#cursors.left.isDown && !this.#cursors.right.isDown) {
            this.player.walk('l');
        } else if (this.#cursors.right.isDown && !this.#cursors.left.isDown) {
            this.player.walk('r');
        } else {
            this.player.stop('h');
        }
        if (this.#cursors.up.isDown && !this.#cursors.down.isDown) {
            this.player.walk('u');
        } else if (this.#cursors.down.isDown && !this.#cursors.up.isDown) {
            this.player.walk('d');
        } else {
            this.player.stop('v');
        }
        if (!this.#cursors.left.isDown &&
            !this.#cursors.right.isDown &&
            !this.#cursors.up.isDown &&
            !this.#cursors.down.isDown) {
            this.player.stop();
        }
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