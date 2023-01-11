export default class UIScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'UI'
        });
    }

    preload() { }

    create() {
        this.data.set({
            score: 0,
            lives: 3
        });

        this.scoreText = this.add.text(0, 0, 'Score: ' + this.data.get('score'));
        this.livesText = this.add.text(240, 0, 'Lives: ' + this.data.get('lives'));
    }

    setScore(score) {
        this.data.set('score', score);
        this.scoreText.setText('Score: ' + score);
    }

    setLives(lives) {
        this.data.set('lives', lives);
        this.livesText.setText('Lives: ' + lives);
    }
}
