import { Changed, defineQuery, enterQuery, hasComponent } from 'bitecs'
import type { Mat2, SceneSystem } from '..'
import { vec2 } from '..'
import { Position, PositionLimits, PositionRequest, PositionRequestType } from './Components'

export function requestsSystem(limits?: Mat2): SceneSystem {
  const requestsQ = enterQuery(defineQuery([PositionRequest]))

  return (world) => {
    for (const request of requestsQ(world)) {
      const entity = PositionRequest.eid[request]

      if (!hasComponent(world, Position, entity))
        continue

      switch (PositionRequest.type[request] as PositionRequestType) {
        case PositionRequestType.Set:
          vec2.copy(
            Position.vec2[entity],
            PositionRequest.vec2[request],
          )
          break
        case PositionRequestType.Add:
          vec2.add(
            Position.vec2[entity],
            PositionRequest.vec2[request],
          )
          break
      }

      if (limits) {
        vec2.clamp(
          Position.vec2[entity],
          limits,
        )
      }
    }

    return world
  }
}

export function limitsPreSystem(): SceneSystem {
  const enterQ = enterQuery(defineQuery([Position, PositionLimits]))

  return (world) => {
    for (const entity of enterQ(world)) {
      vec2.clamp(
        Position.vec2[entity],
        PositionLimits.mat2[entity],
      )
    }

    return world
  }
}

export function limitsPostSystem(): SceneSystem {
  const changedQ = defineQuery([Changed(Position), PositionLimits])

  return (world) => {
    for (const entity of changedQ(world)) {
      vec2.clamp(
        Position.vec2[entity],
        PositionLimits.mat2[entity],
      )
    }

    return world
  }
}
