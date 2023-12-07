import { Types, addComponent, defineComponent } from 'bitecs'

export const MovementState = Object.freeze({
  STOP: 0,
  WALK: 1,
  SNEAK: 2,
})

export const MovementDirection = Object.freeze({
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
})

export const Movement = defineComponent({
  state: Types.ui8,
  direction: Types.ui8,
})

export function addMovement({ state = MovementState.STOP, direction = MovementDirection.DOWN } = {}) {
  return (world, eid) => {
    addComponent(world, Movement, eid)
    Movement.state[eid] = state
    Movement.direction[eid] = direction
  }
}
