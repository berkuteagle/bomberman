import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

export default class BootScene extends Scene {
    constructor() {
        super({
            key: 'Boot'
        });
    }

    preload() { }

    create() {
        this.scene.start('Game');
    }
}
