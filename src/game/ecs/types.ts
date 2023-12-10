import type { IWorld } from 'bitecs'
import type { Scene } from 'phaser'
import type { System } from 'detect-collisions'

import type Store from './Store'

export interface ISceneWorld extends IWorld {
  store: Store
  scene: Scene
  collision: System
}

export type WorldUpdateFunction = (world: ISceneWorld, time: number, delta: number) => void
export type WorldEidFunction = (world: ISceneWorld, eid: number) => number

export type SceneSystem = (world: ISceneWorld, time: number, delta: number) => ISceneWorld

export type Vec2 = Float32Array
export type Mat2 = Float32Array
