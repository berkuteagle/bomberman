import { addComponent, hasComponent } from 'bitecs'

import { BombTag, PlaceBombRequest } from './components.js'

export function withBombTag() {
  return (world, eid) => {
    addComponent(world, BombTag, eid)
  }
}

export const hasBombTag = (world, eid) => hasComponent(world, BombTag, eid)

export function withPlaceBombRequest(x = 0, y = 0) {
  return (world, eid) => {
    addComponent(world, PlaceBombRequest, eid)

    PlaceBombRequest.x[eid] = x
    PlaceBombRequest.y[eid] = y
  }
}
