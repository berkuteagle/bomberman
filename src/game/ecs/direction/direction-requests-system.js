import { defineQuery } from 'bitecs'

import System from '../system.js'

import {
  Direction,
  SetDirectionRequest,
} from './component.js'

import { hasDirection } from './utils.js'

export default class DirectionRequestsSystem extends System {
  #setDirectionQuery

  constructor(ecs) {
    super(ecs)

    this.#setDirectionQuery = defineQuery([SetDirectionRequest])
  }

  preUpdate() {
    for (const request of this.#setDirectionQuery(this.ecs.world)) {
      const entity = SetDirectionRequest.entity[request]

      if (hasDirection(this.ecs.world, entity))
        Direction.direction[entity] = SetDirectionRequest.direction[request]
    }
  }
}
