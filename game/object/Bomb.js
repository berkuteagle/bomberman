export default class Bomb extends Phaser.GameObjects.GameObject {
    constructor(scene, time) {
        super(scene, 'sprite');

        this.time = time;
    }
}