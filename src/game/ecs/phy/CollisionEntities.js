import { Types, addComponent, defineComponent } from 'bitecs'

export const CollisionEntities = defineComponent({
  first: Types.eid,
  second: Types.eid,
})

export function addCollisionEntities(first, second) {
  return (world, eid) => {
    addComponent(world, CollisionEntities, eid)

    CollisionEntities.first[eid] = first
    CollisionEntities.second[eid] = second
  }
}
