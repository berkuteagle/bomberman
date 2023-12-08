import { addComponent, defineQuery, defineSystem, enterQuery, hasComponent } from 'bitecs'
import { GameObjects } from 'phaser'
import type { SceneSystem } from '..'
import { Animation, AnimationRequest, AnimationRequestType, AnimationState, AnimationTag } from './Components'

export function requestsSystem(): SceneSystem {
  const requestsQ = enterQuery(defineQuery([AnimationRequest]))

  return defineSystem((world) => {
    for (const request of requestsQ(world)) {
      const entity = AnimationRequest.eid[request]

      if (!hasComponent(world, AnimationTag, entity))
        continue

      if (!hasComponent(world, Animation, entity))
        addComponent(world, Animation, entity)

      switch (AnimationRequest.type[request] as AnimationRequestType) {
        case AnimationRequestType.Play:

          Animation.animation[entity] = AnimationRequest.animation[request]
          Animation.state[entity] = AnimationState.Play
          break
        case AnimationRequestType.Stop:
          Animation.animation[entity] = AnimationRequest.animation[request]
          Animation.state[entity] = AnimationState.Stop
          break
      }
    }

    return world
  })
}

export function preSystem(animations: string[]): SceneSystem {
  const enterQ = enterQuery(defineQuery([Animation]))

  return defineSystem((world) => {
    for (const entity of enterQ(world)) {
      const sprite = world.store.get<GameObjects.Sprite>(entity, 'sprite')

      if (sprite instanceof GameObjects.Sprite) {
        if (Animation.state[entity])
          sprite.play(animations[Animation.animation[entity]])
        else
          sprite.stop()
      }
    }

    return world
  })
}
