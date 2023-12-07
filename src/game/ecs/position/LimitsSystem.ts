import type { Query } from 'bitecs'
import { Changed, defineQuery, enterQuery } from 'bitecs'
import type { ISceneSystem, ISceneWorld } from '../index'
import { vec2 } from '../index'
import { Position, PositionLimits } from './Components'

export default class RequestSystem implements ISceneSystem {
  #enterQuery: Query<ISceneWorld>
  #changedQuery: Query<ISceneWorld>

  constructor() {
    this.#enterQuery = enterQuery(defineQuery([Position, PositionLimits]))
    this.#changedQuery = defineQuery([Changed(Position), PositionLimits])
  }

  preUpdate(world: ISceneWorld): void {
    this.#enterQuery(world).forEach((entity) => {
      vec2.clamp(Position.vec2[entity], PositionLimits.mat2[entity])
    })
  }

  postUpdate(world: ISceneWorld): void {
    this.#changedQuery(world).forEach((entity) => {
      vec2.clamp(Position.vec2[entity], PositionLimits.mat2[entity])
    })
  }
}
