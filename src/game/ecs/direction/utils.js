import {
  addComponent,
  hasComponent,
} from 'bitecs'

import { DirectionValue } from './enum.js'

import {
  Direction,
  SetDirectionRequest,
} from './component.js'

export function withDirection(direction = DirectionValue.DOWN) {
  return (world, eid) => {
    addComponent(world, Direction, eid)

    Direction.direction[eid] = direction
  }
}

export const hasDirection = (world, eid) => hasComponent(world, Direction, eid)

export function withSetDirectionRequest(entity, direction = DirectionValue.DOWN) {
  return (world, eid) => {
    addComponent(world, SetDirectionRequest, eid)

    SetDirectionRequest.entity[eid] = entity
    SetDirectionRequest.direction[eid] = direction
  }
}
