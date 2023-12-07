import { defineQuery, defineSystem, enterQuery, hasComponent } from 'bitecs'
import type { SceneSystem } from '..'
import { position, vec2 } from '..'
import { Velocity, VelocityRequest, VelocityRequestType } from './Components'

export function requestsSystem(): SceneSystem {
  const requestsQ = enterQuery(defineQuery([VelocityRequest]))

  return defineSystem((world) => {
    for (const request of requestsQ(world)) {
      const entity = VelocityRequest.eid[request]

      if (!hasComponent(world, Velocity, entity))
        continue

      switch (VelocityRequest.type[request] as VelocityRequestType) {
        case VelocityRequestType.Set:
          vec2.copy(Velocity.vec2[entity], VelocityRequest.vec2[request])
          break
        case VelocityRequestType.Add:
          vec2.add(Velocity.vec2[entity], VelocityRequest.vec2[request])
          break
      }

      vec2.clampLength(Velocity.vec2[entity], Velocity.max[entity])
    }

    return world
  })
}

export function updateSystem(): SceneSystem {
  const entitiesQ = defineQuery([Velocity, position.Position])

  return defineSystem((world, _time, delta) => {
    for (const entity of entitiesQ(world)) {
      if (!vec2.isZero(Velocity.vec2[entity])) {
        vec2.add(
          position.Position.vec2[entity],
          Velocity.vec2[entity],
          delta! / 1000,
        )
      }
    }

    return world
  })
}
