export default class Ninja extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this._velocity = 80;
        this._direction = null;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.getBody().setCollideWorldBounds(true);
        this.getBody().setSize(10, 10);

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

    _setVelocity(direction) {
        switch (direction) {
            case 'l':
                this.getBody().setVelocity(-this._velocity, 0);
                break;
            case 'r':
                this.getBody().setVelocity(this._velocity, 0);
                break;
            case 'u':
                this.getBody().setVelocity(0, -this._velocity);
                break;
            case 'd':
                this.getBody().setVelocity(0, this._velocity);
                break;
            default:
                this.getBody().setVelocity(0);
        }
    }

    walk(direction) {
        if (this._direction !== direction) {
            this._setVelocity(direction);
            this._direction = direction;
            this.play('walk_' + direction, 8, true);
        }
    }

    stop(direction) {
        if (this._direction === direction) {
            this.getBody().setVelocity(0);
            this.play('stop_' + this._direction);
            this._direction = null;
        }
    }

    getBody() {
        return this.body;
    }
}
