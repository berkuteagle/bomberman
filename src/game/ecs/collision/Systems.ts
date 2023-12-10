import { Changed, defineQuery, enterQuery, exitQuery, hasComponent } from 'bitecs'
import { Box } from 'detect-collisions'
import type { SceneSystem } from '..'
import { emitEvent, position, velocity } from '..'
import { CollisionBox, CollisionTag, withCollision } from './Components'

export function preUpdate(): SceneSystem {
  const enterQ = enterQuery(defineQuery([CollisionTag, position.Position]))

  return (world) => {
    for (const entity of enterQ(world)) {
      if (hasComponent(world, CollisionBox, entity)) {
        const isStatic = !hasComponent(world, velocity.Velocity, entity)
        const collisionBody = world.collision.createBox(
          {
            x: position.Position.vec2[entity][0],
            y: position.Position.vec2[entity][1],
          },
          CollisionBox.width[entity],
          CollisionBox.height[entity],
          { isStatic },
        )

        world.store.set(entity, 'collisionBody', collisionBody)
        world.store.setEid(collisionBody, entity)
      }
    }

    return world
  }
}

export function update(): SceneSystem {
  const changedQ = defineQuery([CollisionBox, Changed(position.Position)])

  return (world) => {
    for (const entity of changedQ(world)) {
      const collisionBody = world.store.get(entity, 'collisionBody')

      if (collisionBody instanceof Box) {
        collisionBody.setPosition(
          position.Position.vec2[entity][0],
          position.Position.vec2[entity][1],
          false,
        )
      }
    }

    return world
  }
}

export function postUpdate(): SceneSystem {
  const exitQ = exitQuery(defineQuery([CollisionTag]))

  return (world) => {
    for (const entity of exitQ(world)) {
      const collisionBody = world.store.get(entity, 'collisionBody')

      if (collisionBody instanceof Box) {
        world.collision.remove(collisionBody)
        world.store.unset(entity, 'collisionBody')
      }
    }

    world.collision.checkAll((res) => {
      const entityA = world.store.getEid(res.a)
      const entityB = world.store.getEid(res.b)

      if (entityA !== undefined && entityB !== undefined)
        emitEvent(world, withCollision([entityA, entityB]))
    })

    return world
  }
}
