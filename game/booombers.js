import MainScene from './scene/mainScene.js';
import GameScene from './scene/gameScene.js';

export default class Booombers extends Phaser.Game {
    constructor(width = 800, height = 600) {

        const config = {
            type: Phaser.AUTO,
            width,
            height,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        }

        super(config);

        this.scene.add('Main', new MainScene());
        this.scene.add('Game', new GameScene())
        this.scene.start('Game');
    }
}
