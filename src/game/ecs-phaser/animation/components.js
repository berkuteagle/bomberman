import { Types, defineComponent } from 'bitecs'

export const AnimationTag = defineComponent()

export const PlayAnimationRequest = defineComponent({
  sprite: Types.eid,
})

export const StopAnimationRequest = defineComponent({
  sprite: Types.eid,
})

export const MovementAnimationTag = defineComponent()
