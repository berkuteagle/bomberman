import { Game, Scale, WEBGL } from './phaser.js';

import PeerjsGamePlugin from './PeerjsGamePlugin.js';
import { ScenePlugin as ECSScenePlugin } from './ecs_phaser.js';

import {
    GameOver,
    GameScene,
    InviteLinkScene,
    MenuScene,
    PreloadScene,
    UIScene
} from './scene.js';

export default class Bomberman extends Game {
    constructor(width = 480, height = 480) {

        const params = new URL(location).searchParams;
        const rival = params.get('r');
        const enabled = params.has('peerjs');

        const config = {
            type: WEBGL,
            width,
            height,
            parent: 'game',
            scale: {
                mode: Scale.FIT,
                autoCenter: Scale.CENTER_BOTH
            },
            plugins: {
                global: [
                    {
                        key: 'peerjsPlugin',
                        plugin: PeerjsGamePlugin,
                        start: true,
                        mapping: 'peerjs',
                        data: { rival, enabled }
                    },
                ],
                scene: [
                    {
                        key: 'ecsPlugin',
                        plugin: ECSScenePlugin,
                        mapping: 'ecs'
                    }
                ]
            },
            scene: [
                PreloadScene,
                GameScene,
                MenuScene,
                UIScene,
                GameOver,
                InviteLinkScene
            ],
            backgroundColor: '#141b1b'
        };

        super(config);
    }
}
