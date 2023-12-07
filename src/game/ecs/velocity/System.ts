import type { Query } from 'bitecs'
import { defineQuery } from 'bitecs'
import type { ISceneSystem, ISceneWorld } from '../index'
import { position, vec2 } from '../index'
import { Velocity } from './Components'

export default class System implements ISceneSystem {
  #query: Query<ISceneWorld>

  constructor() {
    this.#query = defineQuery([Velocity, position.Position])
  }

  update(world: ISceneWorld, _time: number, delta: number): void {
    this.#query(world).forEach((entity) => {
      if (!vec2.isZero(Velocity.vec2[entity]))
        vec2.add(position.Position.vec2[entity], Velocity.vec2[entity], delta / 1000)
    })
  }
}
