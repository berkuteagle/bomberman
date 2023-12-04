import { IWorld } from 'bitecs';
import { Scene } from 'phaser';

import Store from './Store';

export interface ISceneWorld extends IWorld {
    store: Store;
    scene: Scene;
}

export type WorldUpdateFunction = (world: ISceneWorld, time: number, delta: number) => void;
export type WorldEidFunction = (world: ISceneWorld, eid: number) => number;

export interface ISceneSystem {
    preUpdate?: WorldUpdateFunction;
    update?: WorldUpdateFunction;
    postUpdate?: WorldUpdateFunction;
}

export type Vec2 = Float32Array;
export type Mat2 = Float32Array;
