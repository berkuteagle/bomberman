import type { IWorld, System } from 'bitecs'
import type { Scene } from 'phaser'

import type Store from './Store'

export interface ISceneWorld extends IWorld {
  store: Store
  scene: Scene
}

export type WorldUpdateFunction = (world: ISceneWorld, time: number, delta: number) => void
export type WorldEidFunction = (world: ISceneWorld, eid: number) => number

export type SceneSystemArgs = [number?, number?]
export type SceneSystem = System<SceneSystemArgs, ISceneWorld>

export type Vec2 = Float32Array
export type Mat2 = Float32Array
