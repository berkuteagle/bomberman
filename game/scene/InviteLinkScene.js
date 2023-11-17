import { Scene } from '../phaser.js';

export class InviteLinkScene extends Scene {
    constructor() {
        super({
            key: 'InviteLink'
        });
    }

    preload() { }

    create() {

        console.info('invite link scene');

        this.add.image(100, 100, 'invite');
    }

    startGame() {
        this.scene.switch('Game');
    }
}
