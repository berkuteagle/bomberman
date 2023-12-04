import { Changed, Query, defineQuery, enterQuery, exitQuery, } from 'bitecs';
import { GameObjects } from 'phaser';
import { ISceneSystem, ISceneWorld, position } from '../index';
import { Sprite } from './Components';

export interface ISystemOptions {
    textures: string[];
}

export default class System implements ISceneSystem {

    #textures: ISystemOptions['textures'];

    #entriesQuery: Query<ISceneWorld>;
    #enterQuery: Query<ISceneWorld>;
    #exitQuery: Query<ISceneWorld>;
    #changedPositionQuery: Query<ISceneWorld>;
    #changedDepthQuery: Query<ISceneWorld>;

    constructor({ textures }: ISystemOptions) {

        this.#textures = textures;

        this.#entriesQuery = defineQuery([Sprite]);
        this.#enterQuery = enterQuery(this.#entriesQuery);
        this.#exitQuery = exitQuery(this.#entriesQuery);

        this.#changedPositionQuery = defineQuery([Changed(position.Position), Sprite]);
        this.#changedDepthQuery = defineQuery([Changed(Sprite)]);
    }

    preUpdate(world: ISceneWorld): void {
        this.#enterQuery(world).forEach(entity => {

            const { scene, store } = world;

            const sprite = scene.add.sprite(
                position.Position.vec2[entity][0],
                position.Position.vec2[entity][1],
                this.#textures[Sprite.texture[entity]]
            );

            sprite.setPosition(...position.Position.vec2[entity]);
            sprite.setDepth(Sprite.depth[entity]);
            sprite.setData({ eid: entity });

            store.set(entity, 'sprite', sprite);
        });
    }

    update(world: ISceneWorld): void {
        this.#changedPositionQuery(world).forEach(entity => {

            const sprite = world.store.get<GameObjects.Sprite>(entity, 'sprite');

            if (sprite instanceof GameObjects.Sprite) {
                sprite.setPosition(...position.Position.vec2[entity]);
            }
        });

        this.#changedDepthQuery(world).forEach(entity => {

            const sprite = world.store.get<GameObjects.Sprite>(entity, 'sprite');

            if (sprite instanceof GameObjects.Sprite) {
                sprite.setDepth(Sprite.depth[entity]);
            }
        });
    }

    postUpdate(world: ISceneWorld): void {
        this.#exitQuery(world).forEach(entity => {

            const sprite = world.store.get<GameObjects.Sprite>(entity, 'sprite');

            if (sprite instanceof GameObjects.Sprite) {
                sprite.destroy();
            }

            world.store.unset(entity, 'sprite');
        });
    }
}
