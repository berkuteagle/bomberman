import { Scene } from 'phaser'

export default class GameOver extends Scene {
  constructor() {
    super({
      key: 'GameOver',
    })
  }

  preload() { }

  create() {
    this.data.set({
      score: 0,
      lives: 3,
    })

    this.add.text(200, 200, 'GAME OVER')
  }
}
