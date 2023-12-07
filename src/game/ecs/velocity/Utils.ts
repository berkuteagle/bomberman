import { addComponent } from 'bitecs'
import type { WorldEidFunction } from '../index'
import { vec2 } from '../index'
import { VelocityRequest, VelocityRequestType } from './Components'

export function setRequest(entity: number, x: number, y: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, VelocityRequest, eid)

    VelocityRequest.type[eid] = VelocityRequestType.Set
    VelocityRequest.eid[eid] = entity
    vec2.set(VelocityRequest.vec2[eid], x, y)

    return eid
  }
}

export function addRequest(entity: number, dx: number, dy: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, VelocityRequest, eid)

    VelocityRequest.type[eid] = VelocityRequestType.Add
    VelocityRequest.eid[eid] = entity
    vec2.set(VelocityRequest.vec2[eid], dx, dy)

    return eid
  }
}
