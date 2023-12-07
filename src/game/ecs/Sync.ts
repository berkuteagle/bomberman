import { addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from './types'

export const SyncTag = defineComponent()

export function withSync(): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, SyncTag, eid)

    return eid
  }
}
