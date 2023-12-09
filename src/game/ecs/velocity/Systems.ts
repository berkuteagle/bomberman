import { defineQuery, enterQuery, hasComponent } from 'bitecs'
import type { SceneSystem } from '..'
import { position, sendRequest, vec2 } from '..'
import { Velocity, VelocityRequest, VelocityRequestType } from './Components'

export function preUpdate(): SceneSystem {
  const requestsQ = enterQuery(defineQuery([VelocityRequest]))

  return (world) => {
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
  }
}

export function postUpdate(): SceneSystem {
  const entitiesQ = defineQuery([Velocity])

  return (world, _time, delta) => {
    for (const entity of entitiesQ(world)) {
      if (!vec2.isZero(Velocity.vec2[entity])) {
        const scale = delta! / 1000

        sendRequest(world, position.addRequest(
          entity,
          Velocity.vec2[entity][0] * scale,
          Velocity.vec2[entity][1] * scale,
        ))
      }
    }

    return world
  }
}
