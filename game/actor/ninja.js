export default class Ninja extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.setDataEnabled();

        this.setData({
            velocity: 80,
            acceleration: 100,
            direction: 'd'
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

    walk(direction) {
        const currentDirection = this.getData('direction');
        const acceleration = this.getData('acceleration');
        switch (direction) {
            case 'l':
                this.setAccelerationX(-acceleration * (currentDirection === 'r' ? 3 : 1));
                break;
            case 'r':
                this.setAccelerationX(acceleration * (currentDirection === 'l' ? 3 : 1));
                break;
            case 'u':
                this.setAccelerationY(-acceleration * (currentDirection === 'd' ? 3 : 1));
                break;
            case 'd':
                this.setAccelerationY(acceleration * (currentDirection === 'u' ? 3 : 1));
                break;
        }
        this.play('walk_' + direction, true);
        this.setData('direction', direction);
    }

    stop(direction) {
        switch (direction) {
            case 'h':
                this.setAccelerationX(0);
                break;
            case 'v':
                this.setAccelerationY(0);
                break;
            default:
                this.setAcceleration(0, 0);
                this.play('stop_' + this.getData('direction'));
        }
    }

    getBody() {
        return this.body;
    }
}
