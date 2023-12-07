import { Changed, defineQuery, defineSystem, enterQuery, exitQuery } from 'bitecs'
import { GameObjects } from 'phaser'
import type { SceneSystem } from '..'
import { position } from '..'
import { Sprite } from './Components'

export function preSystem(textures: string[]): SceneSystem {
  const enterQ = enterQuery(defineQuery([Sprite]))

  return defineSystem((world) => {
    for (const entity of enterQ(world)) {
      const { scene, store } = world

      const sprite = scene.add.sprite(
        position.Position.vec2[entity][0],
        position.Position.vec2[entity][1],
        textures[Sprite.texture[entity]],
      )

      sprite.setPosition(...position.Position.vec2[entity])
      sprite.setDepth(Sprite.depth[entity])
      sprite.setData({ eid: entity })

      store.set(entity, 'sprite', sprite)
    }

    return world
  })
}

export function updateSystem(): SceneSystem {
  const changePositionQ = defineQuery([Changed(position.Position), Sprite])
  const changeDepthQ = defineQuery([Changed(Sprite)])

  return defineSystem((world) => {
    for (const entity of changePositionQ(world)) {
      const sprite = world.store.get<GameObjects.Sprite>(entity, 'sprite')

      if (sprite instanceof GameObjects.Sprite)
        sprite.setPosition(...position.Position.vec2[entity])
    }

    for (const entity of changeDepthQ(world)) {
      const sprite = world.store.get<GameObjects.Sprite>(entity, 'sprite')

      if (sprite instanceof GameObjects.Sprite)
        sprite.setDepth(Sprite.depth[entity])
    }

    return world
  })
}

export function postSystem(): SceneSystem {
  const exitQ = exitQuery(defineQuery([Sprite]))

  return defineSystem((world) => {
    for (const entity of exitQ(world)) {
      const sprite = world.store.get<GameObjects.Sprite>(entity, 'sprite')

      if (sprite instanceof GameObjects.Sprite)
        sprite.destroy()

      world.store.unset(entity, 'sprite')
    }

    return world
  })
}
