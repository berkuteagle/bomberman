import { addComponent, defineComponent } from 'bitecs'

import type { WorldEidFunction } from './types'

export const RequestTag = defineComponent()

export function withRequest(): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, RequestTag, eid)

    return eid
  }
}
