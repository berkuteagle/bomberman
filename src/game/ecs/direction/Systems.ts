import { defineQuery, enterQuery, hasComponent } from 'bitecs'
import type { SceneSystem } from '..'
import { Direction, SetDirectionRequest } from './Components'

export function preUpdate(): SceneSystem {
  const requestsQ = enterQuery(defineQuery([SetDirectionRequest]))

  return (world) => {
    for (const request of requestsQ(world)) {
      const entity = SetDirectionRequest.entity[request]

      if (!hasComponent(world, Direction, entity))
        continue

      Direction.direction[entity] = SetDirectionRequest.direction[request]
    }

    return world
  }
}
