import {
  addComponent,
  hasComponent,
} from 'bitecs'

import {
  SpriteDepth,
  SpriteTag,
} from './components.js'

export function withSpriteTag() {
  return (world, eid) => {
    addComponent(world, SpriteTag, eid)
  }
}

export const hasSpriteTag = (world, eid) => hasComponent(world, SpriteTag, eid)

export function withSpriteDepth(depth) {
  return (world, eid) => {
    addComponent(world, SpriteDepth, eid)

    SpriteDepth.depth[eid] = depth
  }
}

export const hasSpriteDepth = (world, eid) => hasComponent(world, SpriteDepth, eid)
