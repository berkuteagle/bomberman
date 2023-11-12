import ScenePlugin from './ecs/ScenePlugin.js';
import { Game, Scale, WEBGL } from './phaser.js';

import {
    GameOver,
    GameScene,
    MenuScene,
    PreloadScene,
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
            plugins: {
                scene: [
                    { key: 'ecsPlugin', plugin: ScenePlugin, mapping: 'ecs' }
                ]
            },
            scene: [PreloadScene, GameScene, MenuScene, UIScene, GameOver],
            backgroundColor: '#141b1b',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: new URLSearchParams(location.search).has('debug')
                }
            }
        }

        super(config);
    }
}
