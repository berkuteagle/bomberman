import { Types, addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from '..'
import type { IWalkingAnimation } from './types'

export const WalkingAnimation = defineComponent({
  up: Types.ui8,
  down: Types.ui8,
  left: Types.ui8,
  right: Types.ui8,
})

export function withWalkingAnimation(wa: IWalkingAnimation): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, WalkingAnimation, eid)

    WalkingAnimation.up[eid] = wa.up
    WalkingAnimation.down[eid] = wa.down
    WalkingAnimation.left[eid] = wa.left
    WalkingAnimation.right[eid] = wa.right

    return eid
  }
}
