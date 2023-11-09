import { Game, Scale, WEBGL } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

import {
    BootScene,
    GameOver,
    GameScene,
    MenuScene,
    UIScene
} from './scene.js';

export default class Booombers extends Game {
    constructor(width = 480, height = 480) {

        const config = {
            type: WEBGL,
            width,
            height,
            parent: 'booombers',
            scale: {
                mode: Scale.FIT,
                autoCenter: Scale.CENTER_BOTH
            },
            scene: [BootScene, GameScene, MenuScene, UIScene, GameOver],
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
