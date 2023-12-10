import { Changed, defineQuery, enterQuery, exitQuery, hasComponent } from 'bitecs'
import { Box } from 'detect-collisions'
import type { SceneSystem } from '..'
import { position } from '..'
import { CollisionBox, CollisionTag } from './Components'

export function preUpdate(): SceneSystem {
  const enterQ = enterQuery(defineQuery([CollisionTag, position.Position]))

  return (world) => {
    for (const entity of enterQ(world)) {
      if (hasComponent(world, CollisionBox, entity)) {
        const collisionBody = world.collision.createBox({
          x: position.Position.vec2[entity][0],
          y: position.Position.vec2[entity][1],
        }, CollisionBox.width[entity], CollisionBox.height[entity])

        world.store.set(entity, 'collisionBody', collisionBody)
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

    return world
  }
}
