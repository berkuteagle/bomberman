import { Types, addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from '..'
import type { DirectionValue } from '.'

export const Direction = defineComponent({
  direction: Types.ui8,
})

export const SetDirectionRequest = defineComponent({
  entity: Types.eid,
  direction: Types.eid,
})

export function withDirection(direction: DirectionValue): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, Direction, eid)

    Direction.direction[eid] = direction

    return eid
  }
}

