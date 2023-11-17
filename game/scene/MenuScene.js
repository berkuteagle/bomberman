import { Scene } from '../phaser.js';

export class MenuScene extends Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    preload() { }

    create() { }

    closeMenu() {
        this.scene.switch('Game');
    }
}
