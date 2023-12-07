import { Feature } from '../../ecs.js'

import InputEventsSystem from './input-events-system.js'

import PlayerSprite from './player-sprite.js'

export default class PlayerFeature extends Feature {
  #player

  /** @override */
  init() {
    this.#player = new PlayerSprite(this.ecs.world.scene, 64, 64)

    this.ecs.world.scene.add.existing(this.#player)

    this.addSystem('input-events', new InputEventsSystem(this.ecs, this.#player))
  }
}
