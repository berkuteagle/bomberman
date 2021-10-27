export default class Ninja extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.setDataEnabled();

        this.setData({
            velocity: 80,
            acceleration: 100,
            direction: null
        });

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setCircle(5);
        this.setOffset(3, 6);
        this.setDrag(300, 300);
        this.setMaxVelocity(this.getData('velocity'));

        this.anims.create({
            key: 'walk_d',
            frames: this.anims.generateFrameNumbers(texture, { frames: [0, 4, 8, 12] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_u',
            frames: this.anims.generateFrameNumbers(texture, { frames: [1, 5, 9, 13] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_l',
            frames: this.anims.generateFrameNumbers(texture, { frames: [2, 6, 10, 14] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_r',
            frames: this.anims.generateFrameNumbers(texture, { frames: [3, 7, 11, 15] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_d',
            frames: this.anims.generateFrameNumbers(texture, { frames: [0] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_u',
            frames: this.anims.generateFrameNumbers(texture, { frames: [1] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_l',
            frames: this.anims.generateFrameNumbers(texture, { frames: [2] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_r',
            frames: this.anims.generateFrameNumbers(texture, { frames: [3] }),
            frameRate: 8,
            repeat: -1
        });

        this.play('stop_d');
    }

    _startWalking(direction) {
        switch (direction) {
            case 'l':
                this.setAcceleration(-this.getData('acceleration'), 0);
                break;
            case 'r':
                this.setAcceleration(this.getData('acceleration'), 0);
                break;
            case 'u':
                this.setAcceleration(0, -this.getData('acceleration'));
                break;
            case 'd':
                this.setAcceleration(0, this.getData('acceleration'));
                break;
        }
        this.play('walk_' + direction, true);
        this.setData('direction', direction);
    }

    _stopWalking() {
        this.setAcceleration(0);
        this.play('stop_' + this.getData('direction'));
        this.setData('direction', null);
    }

    walk(direction) {
        if (this.getData('direction') !== direction) {
            this._startWalking(direction);
        }
    }

    stop(direction) {
        if (this.getData('direction') === direction) {
            this._stopWalking();
        }
    }

    getBody() {
        return this.body;
    }
}
