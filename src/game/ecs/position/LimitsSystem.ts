import { Changed, Query, defineQuery, enterQuery } from 'bitecs';
import { ISceneSystem, ISceneWorld, vec2 } from '../index';
import { Position, PositionLimits } from './Components';

export default class RequestSystem implements ISceneSystem {

    #enterQuery: Query<ISceneWorld>;
    #changedQuery: Query<ISceneWorld>;

    constructor() {
        this.#enterQuery = enterQuery(defineQuery([Position, PositionLimits]));
        this.#changedQuery = defineQuery([Changed(Position), PositionLimits]);
    }

    preUpdate(world: ISceneWorld): void {
        this.#enterQuery(world).forEach(entity => {
            vec2.clamp(Position.vec2[entity], PositionLimits.mat2[entity]);
        });
    }

    postUpdate(world: ISceneWorld): void {
        this.#changedQuery(world).forEach(entity => {
            vec2.clamp(Position.vec2[entity], PositionLimits.mat2[entity]);
        });
    }
}
