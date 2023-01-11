import GameScene from './scene/GameScene.js';
import UIScene from './scene/UIScene.js';
import BootScene from './scene/BootScene.js';
import MenuScene from './scene/MenuScene.js';

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
            scene: [BootScene, GameScene, MenuScene, UIScene],
            backgroundColor: '#141b1b',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            }
        }

        super(config);
    }
}
