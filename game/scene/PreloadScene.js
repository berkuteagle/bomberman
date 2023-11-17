import { Scene } from '../phaser.js';

export class PreloadScene extends Scene {
    constructor() {
        super({
            key: 'Preload'
        });
    }

    preload() {
        this.load.setBaseURL('game/');
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {

        if (this.peerjs.rival) {
            console.log(this.peerjs.rival);
            this.scene.start('Game');
        } else if (this.peerjs.ready) {
            this.peerjs.ready.then(() => {
                const url = `${location.origin}${location.pathname}?r=${this.peerjs.id}`;

                this.qrcode.makeImage(url).then(code => {

                    this.textures.once('onload', () => {
                        this.scene.start('InviteLink');
                    });

                    this.textures.addBase64('invite', code);
                });
            });
        } else {

            console.log('no peerjs');
            this.scene.start('Game');
        }
    }
}
