import { GameObjects } from 'phaser'

import {
  Position,
  withPosition,
  withStore,
} from '../ecs.js'

import {
  SpriteDepth,
  SpriteTag,
} from './sprite/components.js'

import {
  hasSpriteDepth,
  hasSpriteTag,
  withSpriteDepth,
  withSpriteTag,
} from './sprite/utils.js'

export {
  SpriteDepth,
  SpriteTag,
  hasSpriteDepth,
  hasSpriteTag,
  withSpriteDepth,
  withSpriteTag,
}

export default class Sprite extends GameObjects.Sprite {
  #eid

  constructor(scene, x, y, texture, ...ext) {
    super(scene, x, y, texture)

    this.#eid = scene.ecs.ecs.addEntity(
      withPosition(x, y),
      withSpriteTag(),
      withStore({ sprite: this }),
      ...ext,
    )
  }

  get eid() {
    return this.#eid
  }

  preUpdate(time, delta) {
    this.setPosition(
      Position.x[this.#eid],
      Position.y[this.#eid],
    )

    if (hasSpriteDepth(this.scene.ecs.world, this.#eid))
      this.setDepth(SpriteDepth.depth[this.#eid])

    super.preUpdate(time, delta)
  }
}
