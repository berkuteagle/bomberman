import { defineQuery } from 'bitecs'
import {
  Position,
  System,
} from '../../ecs.js'
import { Math } from '../phaser'
import {
  BombTag,
  PlaceBombRequest,
} from './components.js'

import BombSprite from './bomb-sprite.js'

export default class BombRequestsSystem extends System {
  #placeBombQuery
  #bombsQuery

  constructor(ecs) {
    super(ecs)

    this.#placeBombQuery = defineQuery([PlaceBombRequest])
    this.#bombsQuery = defineQuery([BombTag])
  }

  preUpdate() {
    const { world } = this.ecs

    for (const request of this.#placeBombQuery(world)) {
      const x = Math.Snap.To(PlaceBombRequest.x[request], 16)
      const y = Math.Snap.To(PlaceBombRequest.y[request], 16)

      if (this.#bombsQuery(world).some(
        bombEid => Position.x[bombEid] === x && Position.y[bombEid] === y,
      ))
        continue

      world.scene.add.existing(new BombSprite(world.scene, x, y))
    }
  }
}
