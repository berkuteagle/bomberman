import { Scene } from 'phaser';

export default class PreloadScene extends Scene {
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
        if (this.peerjs.rival) {
            this.scene.start('Game');
        } else if (this.peerjs.ready) {
            this.peerjs.ready.then(() => {
                this.scene.start('InviteLink');
            });
        } else {
            this.scene.start('Game');
        }
    }
}
