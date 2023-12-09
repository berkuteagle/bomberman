import { addComponent, addEntity, defineComponent } from 'bitecs'
import type { ISceneWorld, WorldEidFunction } from './types'
import { chain } from './chain'

export const EventTag = defineComponent()

export function withEvent(): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, EventTag, eid)

    return eid
  }
}

export function emitEvent(world: ISceneWorld, ...ext: (WorldEidFunction | null)[]): number {
  return chain(withEvent(), ...ext)(world, addEntity(world))
}
