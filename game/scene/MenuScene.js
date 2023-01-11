export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    preload() {}

    create() {}

    closeMenu() {
        this.scene.switch('Game');
    }
}
