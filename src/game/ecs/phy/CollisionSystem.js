import { defineQuery, enterQuery, exitQuery, removeEntity } from 'bitecs'
import { Math } from '../phaser'

import { Position } from '../position.js'
import System from '../system.js'

import { CollisionEntities } from './CollisionEntities.js'
import { CollisionState } from './CollisionState.js'
import { CollisionTag, hasCollisionTag } from './CollisionTag.js'

export default class CollisionSystem extends System {
  #allEntities
  #allCollisionTags
  #exitCollisionTags

  #allCollisionEntities
  #enterCollisionEntities

  constructor(ecs, config) {
    super(ecs, config)

    this.#allCollisionEntities = defineQuery([CollisionEntities])
    this.#enterCollisionEntities = enterQuery(this.#allCollisionEntities)
    this.#allEntities = defineQuery([CollisionState, CollisionEntities])
    this.#allCollisionTags = defineQuery([CollisionTag])
    this.#exitCollisionTags = exitQuery(this.#allCollisionTags)
  }

  preUpdate() {
    const world = this.ecs.world

    for (const entity of this.#enterCollisionEntities(world)) {
      const first = CollisionEntities.first[entity]
      const second = CollisionEntities.second[entity]

      if (!hasCollisionTag(world, first, second))
        removeEntity(world, entity)
    }
  }

  update() {
    const world = this.ecs.world

    for (const entity of this.#allEntities(world)) {
      const first = CollisionEntities.first[entity]
      const second = CollisionEntities.second[entity]

      const pos0 = new Math.Vector2(Position.x[first], Position.y[first])
      const pos1 = new Math.Vector2(Position.x[second], Position.y[second])

      if (pos0.distance(pos1) < 10) {
        if (!CollisionState.state[entity]) {
          world.scene.scene.sleep('UI')
          world.scene.scene.switch('GameOver')
          CollisionState.state[entity] = 1
        }
      }
      else {
        CollisionState.state[entity] = 0
      }
    }
  }

  postUpdate() {
    const world = this.ecs.world

    for (const entity of this.#exitCollisionTags(world)) {
      for (const collision of this.#allEntities(world)) {
        if (CollisionEntities.first[collision] === entity || CollisionEntities.second[collision] === entity)
          removeEntity(world, collision)
      }
    }
  }
}
