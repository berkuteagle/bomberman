import { Game, Scale, WEBGL } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

import BootScene from './scene/BootScene.js';
import GameScene from './scene/GameScene.js';
import MenuScene from './scene/MenuScene.js';
import UIScene from './scene/UIScene.js';

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
