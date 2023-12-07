import { Types, addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from '../index'

export const Sprite = defineComponent({
  texture: Types.ui8,
  depth: Types.ui8,
})

export function withSprite(depth: number, texture: number): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, Sprite, eid)

    Sprite.depth[eid] = depth
    Sprite.texture[eid] = texture

    return eid
  }
}
