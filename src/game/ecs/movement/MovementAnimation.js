import { Types, addComponent, defineComponent } from 'bitecs'

export const MovementAnimation = defineComponent({
  up: Types.ui8,
  down: Types.ui8,
  left: Types.ui8,
  right: Types.ui8,
})

export function addMovementAnimation(up, down, left, right) {
  return (world, eid) => {
    addComponent(world, MovementAnimation, eid)
    MovementAnimation.up[eid] = up
    MovementAnimation.down[eid] = down
    MovementAnimation.left[eid] = left
    MovementAnimation.right[eid] = right
  }
}
