import { Types, defineComponent } from 'bitecs'

export const Direction = defineComponent({
  direction: Types.ui8,
})

export const SetDirectionRequest = defineComponent({
  entity: Types.eid,
  direction: Types.eid,
})
