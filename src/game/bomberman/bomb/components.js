import { Types, defineComponent } from 'bitecs'

export const BombTag = defineComponent()

export const PlaceBombRequest = defineComponent({
  x: Types.f32,
  y: Types.f32,
})
