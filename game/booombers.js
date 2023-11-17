import PeerjsGamePlugin from './PeerjsGamePlugin.js';
import QRCodeGamePlugin from './QRCodeGamePlugin.js';
import { Game, Scale, WEBGL } from './phaser.js';

import ECSScenePlugin from './ecs/ScenePlugin.js';

import {
    GameOver,
    GameScene,
    InviteLinkScene,
    MenuScene,
    PreloadScene,
    UIScene
} from './scene.js';

export default class Booombers extends Game {
    constructor(width = 480, height = 480) {

        const params = new URLSearchParams(location.search);

        const debug = params.has('debug');
        const rival = params.get('r');
        const enabled = params.has('peerjs');

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
                global: [
                    { key: 'peerjsPlugin', plugin: PeerjsGamePlugin, start: true, mapping: 'peerjs', data: { rival, enabled } },
                    { key: 'qrcodePlugin', plugin: QRCodeGamePlugin, start: true, mapping: 'qrcode' }
                ],
                scene: [
                    { key: 'ecsPlugin', plugin: ECSScenePlugin, mapping: 'ecs' }
                ]
            },
            scene: [PreloadScene, GameScene, MenuScene, UIScene, GameOver, InviteLinkScene],
            backgroundColor: '#141b1b',
            physics: {
                default: 'arcade',
                arcade: { debug }
            }
        };

        super(config);
    }
}
