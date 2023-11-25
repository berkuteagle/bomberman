import { Scene } from '../phaser.js';

export class UIScene extends Scene {
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

        this.scoreText = this.add.text(
            44, 0,
            'Score: ' + this.data.get('score'),
            {
                fontFamily: 'Pixel',
                fontSize: '24px'
            }
        );

        this.livesText = this.add.text(
            384, 0,
            'Lives: ' + this.data.get('lives'),
            {
                fontFamily: 'Pixel',
                fontSize: '24px'
            }
        );
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
