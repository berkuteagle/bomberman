import { Game, Scale, WEBGL } from 'phaser';

import { ScenePlugin as ECSScenePlugin } from './ecs';
import { GamePlugin as PeerjsGamePlugin } from './peerjs';

import {
    GameOver,
    GameScene,
    InviteLinkScene,
    MenuScene,
    PreloadScene,
    UIScene
} from './scene';

export default class Bomberman extends Game {
    constructor(width: number = 480, height: number = 480) {

        const params = new URL(location.href).searchParams;
        const enabled = params.has('peerjs') || !!params.get('r');

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
                        data: { enabled }
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
