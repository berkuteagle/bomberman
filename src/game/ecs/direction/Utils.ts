import { addComponent } from 'bitecs'
import type { WorldEidFunction } from '..'
import { SetDirectionRequest } from './Components'
import type { DirectionValue } from '.'

export function setDirection(entity: number, direction: DirectionValue): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, SetDirectionRequest, eid)

    SetDirectionRequest.entity[eid] = entity
    SetDirectionRequest.direction[eid] = direction

    return eid
  }
}
