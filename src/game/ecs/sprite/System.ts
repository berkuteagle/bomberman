import { Changed, Query, defineQuery, enterQuery } from 'bitecs';
import { GameObjects } from 'phaser';
import { ISceneSystem, ISceneWorld, position } from '../index';
import { Sprite } from './Components';

export default class System implements ISceneSystem {

    #enterQuery: Query<ISceneWorld>;
    #changedPositionQuery: Query<ISceneWorld>;
    #changedDepthQuery: Query<ISceneWorld>;

    constructor() {
        this.#enterQuery = enterQuery(defineQuery([position.Position, Sprite]));
        this.#changedPositionQuery = defineQuery([Changed(position.Position), Sprite]);
        this.#changedDepthQuery = defineQuery([Changed(Sprite)]);
    }

    preUpdate(world: ISceneWorld): void {
        this.#enterQuery(world).forEach(entity => {

            const sprite = world.data.get<GameObjects.Sprite>(entity, 'sprite');

            if (sprite instanceof GameObjects.Sprite) {
                sprite.setPosition(...position.Position.vec2[entity]);
                sprite.setDepth(Sprite.depth[entity]);
                sprite.setData({ eid: entity });
            }
        });
    }

    postUpdate(world: ISceneWorld): void {
        this.#changedPositionQuery(world).forEach(entity => {

            const sprite = world.data.get<GameObjects.Sprite>(entity, 'sprite');

            if (sprite instanceof GameObjects.Sprite) {
                sprite.setPosition(...position.Position.vec2[entity]);
            }
        });

        this.#changedDepthQuery(world).forEach(entity => {
            const sprite = world.data.get<GameObjects.Sprite>(entity, 'sprite');

            if (sprite instanceof GameObjects.Sprite) {
                sprite.setDepth(Sprite.depth[entity]);
            }
        });
    }
}
