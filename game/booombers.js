import MainScene from './scene/mainScene.js';
import GameScene from './scene/gameScene.js';

export default class Booombers extends Phaser.Game {
    constructor(width = 480, height = 480) {

        const config = {
            type: Phaser.WEBGL,
            width,
            height,
            parent: 'booombers',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            backgroundColor: '#141b1b',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            }
        }

        super(config);

        this.scene.add('Main', new MainScene());
        this.scene.add('Game', new GameScene())
        
        this.scene.start('Game');
    }

    create() {
        
    }
}
