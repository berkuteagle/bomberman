import { addComponent } from 'bitecs'
import type { WorldEidFunction } from '..'
import { vec2 } from '..'
import { PositionRequest, PositionRequestType } from './Components'

export function setRequest(entity: number, x: number, y: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, PositionRequest, eid)

    PositionRequest.type[eid] = PositionRequestType.Set
    PositionRequest.eid[eid] = entity
    vec2.set(PositionRequest.vec2[eid], x, y)

    return eid
  }
}

export function addRequest(entity: number, dx: number, dy: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, PositionRequest, eid)

    PositionRequest.type[eid] = PositionRequestType.Add
    PositionRequest.eid[eid] = entity
    vec2.set(PositionRequest.vec2[eid], dx, dy)

    return eid
  }
}
