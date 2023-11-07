import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

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
