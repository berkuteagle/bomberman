import { defineQuery, defineSystem } from 'bitecs'
import { Math } from '../phaser'

import System from '../system.js'

import { Acceleration } from './Acceleration.js'
import { Velocity } from './Velocity.js'

export default class AccelerationSystem extends System {
  #update
  #allEntities

  constructor(ecs, config) {
    super(ecs, config)

    this.#allEntities = defineQuery([Acceleration, Velocity])
    this.#update = defineSystem((world, _time, delta) => {
      const velocityVector = new Math.Vector2()

      for (const entity of this.#allEntities(world)) {
        velocityVector.set(
          Velocity.x[entity] + Acceleration.x[entity] * delta / 1000,
          Velocity.y[entity] + Acceleration.y[entity] * delta / 1000,
        )

        velocityVector.limit(Velocity.max[entity])

        Velocity.x[entity] += velocityVector.x
        Velocity.y[entity] += velocityVector.y
      }
    })
  }

  update(time, delta) {
    this.#update(this.ecs.world, time, delta)
  }
}
