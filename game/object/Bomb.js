import { Physics } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

export default class Bomb extends Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Bomb');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.anims.create({
            key: 'active',
            frames: this.anims.generateFrameNumbers('Bomb'),
            frameRate: 8,
            repeat: -1
        });

        this.play('active');
    }
}
