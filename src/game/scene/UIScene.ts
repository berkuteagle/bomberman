import type { GameObjects } from 'phaser'
import { Scene } from 'phaser'

export default class UIScene extends Scene {
  scoreText: GameObjects.Text | null = null
  livesText: GameObjects.Text | null = null

  constructor() {
    super({
      key: 'UI',
    })
  }

  preload() { }

  create() {
    this.data.set({
      score: 0,
      lives: 3,
    })

    this.scoreText = this.add.text(
      44,
      0,
      `Score: ${this.data.get('score')}`,
      {
        fontFamily: 'Pixel',
        fontSize: '24px',
      },
    )

    this.livesText = this.add.text(
      384,
      0,
      `Lives: ${this.data.get('lives')}`,
      {
        fontFamily: 'Pixel',
        fontSize: '24px',
      },
    )
  }

  setScore(score: number): void {
    this.data.set('score', score)
    this.scoreText?.setText(`Score: ${score}`)
  }

  setLives(lives: number): void {
    this.data.set('lives', lives)
    this.livesText?.setText(`Lives: ${lives}`)
  }
}
