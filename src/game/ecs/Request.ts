import { addComponent, addEntity, defineComponent } from 'bitecs'
import type { ISceneWorld, WorldEidFunction } from './types'
import { chain } from './chain'

export const RequestTag = defineComponent()

export function withRequest(): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, RequestTag, eid)

    return eid
  }
}

export function sendRequest(world: ISceneWorld, ...ext: (WorldEidFunction | null)[]): number {
  return chain(withRequest(), ...ext)(world, addEntity(world))
}
