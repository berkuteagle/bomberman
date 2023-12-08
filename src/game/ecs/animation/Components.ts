import { Types, addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from '..'

export const AnimationTag = defineComponent()

export const Animation = defineComponent({
  animation: Types.ui8,
  state: Types.ui8,
})

export const AnimationRequest = defineComponent({
  eid: Types.eid,
  animation: Types.ui8,
  type: Types.ui8,
})

export enum AnimationState {
  Stop,
  Play,
  PlayOnce,
  Loop,
}

export enum AnimationRequestType {
  Stop,
  Play,
}

export function withAnimation(animation: number, state: AnimationState): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, Animation, eid)

    Animation.animation[eid] = animation
    Animation.state[eid] = state

    return eid
  }
}

export function withAnimationTag(): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, AnimationTag, eid)

    return eid
  }
}
