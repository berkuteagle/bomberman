import { Scene } from 'phaser';

import { GamePlugin as PeerjsGamePlugin } from '../peerjs';

export default class PreloadScene extends Scene {

    peerjs!: PeerjsGamePlugin;

    constructor() {
        super({
            key: 'Preload'
        });
    }

    preload() {
        this.load.pack('pack', 'assets/pack.json');
        this.load.atlasXML('ui', 'assets/ui/atlas.png', 'assets/ui/atlas.xml');
    }

    create() {
        if (this.peerjs.enabled) {
            this.peerjs.open.then(() => {
                this.scene.start('InviteLink');
            });
        } else {
            this.scene.start('Game', { mode: 'single' });
        }
    }
}
