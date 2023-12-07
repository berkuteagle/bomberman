import { Types, defineComponent } from 'bitecs'

export const ControlTag = defineComponent()

export const ControlKeyDownEvent = defineComponent({
  code: Types.ui16,
})

export const ControlKeyUpEvent = defineComponent({
  code: Types.ui16,
})

export const ControlKeysState = defineComponent({
  state: Types.ui16,
})

export const ControlLeftStickState = defineComponent({
  x: Types.f32,
  y: Types.f32,
})

export const ControlRightStickState = defineComponent({
  x: Types.f32,
  y: Types.f32,
})
