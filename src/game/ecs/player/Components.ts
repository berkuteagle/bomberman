import { addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from '..'

export const PlayerTag = defineComponent()

export function withPlayerTag(): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, PlayerTag, eid)

    return eid
  }
}
