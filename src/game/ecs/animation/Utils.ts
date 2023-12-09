import { addComponent } from 'bitecs'
import type { WorldEidFunction } from '..'
import { AnimationRequest, AnimationRequestType } from './Components'

export function playRequest(entity: number, animation: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, AnimationRequest, eid)

    AnimationRequest.type[eid] = AnimationRequestType.Play
    AnimationRequest.animation[eid] = animation
    AnimationRequest.eid[eid] = entity

    return eid
  }
}

export function stopRequest(entity: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, AnimationRequest, eid)

    AnimationRequest.type[eid] = AnimationRequestType.Stop
    AnimationRequest.eid[eid] = entity

    return eid
  }
}
