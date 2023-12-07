import { defineQuery, defineSystem } from 'bitecs'

import { Position } from '../position.js'
import System from '../system.js'

import { Velocity } from './Velocity.js'

export default class VelocitySystem extends System {
  #update
  #allEntities

  constructor(ecs, config) {
    super(ecs, config)

    this.#allEntities = defineQuery([Velocity, Position])
    this.#update = defineSystem((world, _time, delta) => {
      for (const entity of this.#allEntities(world)) {
        Position.x[entity] += Velocity.x[entity] * delta / 1000
        Position.y[entity] += Velocity.y[entity] * delta / 1000
      }
    })
  }

  update(time, delta) {
    this.#update(this.ecs.world, time, delta)
  }
}
