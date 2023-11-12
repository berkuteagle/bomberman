import { Scene } from '../phaser.js';

export class PreloadScene extends Scene {
    constructor() {
        super({
            key: 'Preload'
        });
    }

    preload() {
        this.load.setBaseURL('game/');
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {
        this.scene.start('Game');
    }
}
