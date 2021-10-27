import Ninja from './actor/ninja.js';

export default class Player extends Ninja {
    constructor(scene, x, y) {
        super(scene, x, y, 'GreenNinja');

        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.keyW.on('down', () => this.walk('u'));
        this.keyA.on('down', () => this.walk('l'));
        this.keyS.on('down', () => this.walk('d'));
        this.keyD.on('down', () => this.walk('r'));

        this.keyW.on('up', () => {
            if (this.keyA.isDown) {
                this.walk('l');
            } else if (this.keyD.isDown) {
                this.walk('r');
            } else {
                this.stop('u');
            }
        });
        this.keyA.on('up', () => {
            if (this.keyW.isDown) {
                this.walk('u');
            } else if (this.keyS.isDown) {
                this.walk('d');
            } else {
                this.stop('l');
            }
        });
        this.keyS.on('up', () => {
            if (this.keyA.isDown) {
                this.walk('l');
            } else if (this.keyD.isDown) {
                this.walk('r');
            } else {
                this.stop('d');
            }
        });
        this.keyD.on('up', () => {
            if (this.keyW.isDown) {
                this.walk('u');
            } else if (this.keyS.isDown) {
                this.walk('d');
            } else {
                this.stop('r');
            }
        });
    }

    update() {

    }
}