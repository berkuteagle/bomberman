import { Types, addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from '..'

export const CollisionTag = defineComponent()

export const CollisionBox = defineComponent({
  width: Types.f32,
  height: Types.f32,
})

export function withCollisionTag(): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, CollisionTag, eid)

    return eid
  }
}

export function withCollisionBox(width: number, height: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, CollisionBox, eid)

    CollisionBox.width[eid] = width
    CollisionBox.height[eid] = height

    return eid
  }
}
