import {
  addComponent,
  hasComponent,
} from 'bitecs'

import {
  chain,
  withStore,
} from '../../ecs.js'

import {
  AnimationTag,
  MovementAnimationTag,
  PlayAnimationRequest,
  StopAnimationRequest,
} from './components.js'

export function withAnimationTag() {
  return (world, eid) => {
    addComponent(world, AnimationTag, eid)
  }
}

export const hasAnimationTag = (world, eid) => hasComponent(world, AnimationTag, eid)

export function withAnimation(animation) {
  return chain(
    withAnimationTag(),
    withStore({ animation }),
  )
}

export function withPlayAnimationRequest(sprite) {
  return (world, eid) => {
    addComponent(world, PlayAnimationRequest, eid)

    PlayAnimationRequest.sprite[eid] = sprite
  }
}

export function withStopAnimationRequest(sprite) {
  return (world, eid) => {
    addComponent(world, StopAnimationRequest, eid)

    StopAnimationRequest.sprite[eid] = sprite
  }
}

export function withMovementAnimationTag() {
  return (world, eid) => {
    addComponent(world, MovementAnimationTag, eid)
  }
}

export const hasMovementAnimationTag = (world, eid) => hasComponent(world, MovementAnimationTag, eid)

export function withMovementAnimation({ up, down, left, right }) {
  return chain(
    withMovementAnimationTag(),
    withStore({ 'movement-animation': { up, down, left, right } }),
  )
}
