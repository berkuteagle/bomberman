import { Scene } from 'phaser'

export default class MenuScene extends Scene {
  constructor() {
    super({
      key: 'Menu',
    })
  }

  preload() { }

  create() { }

  closeMenu() {
    this.scene.switch('Game')
  }
}
