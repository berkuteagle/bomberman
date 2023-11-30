import { IWorld, createWorld } from 'bitecs';
import { Plugins, Scenes } from 'phaser';

import { default as ECS } from './ECS';
import Feature from './Feature';

export interface ISceneWorld extends IWorld {
    [key: symbol]: Map<string, any>;
}

export default class ScenePlugin extends Plugins.ScenePlugin {

    #world!: ISceneWorld;

    #ecs: ECS | null = null;

    get ecs() {
        return this.#ecs;
    }

    get world() {
        return this.#ecs?.world;
    }

    get store() {
        return this.#ecs?.store;
    }

    addFeature<C, F extends typeof Feature<C>>(featureKey: string, FeatureClass: F, config: C, enabled: boolean = true): void {
        this.#ecs?.addFeature(featureKey, FeatureClass, config, enabled);
    }

    getFeature(featureKey: string): void | Feature<unknown> {
        return this.#ecs?.getFeature(featureKey);
    }

    boot() {
        this.#world = createWorld<ISceneWorld>({});

        this.#ecs = new ECS({ scene: this.scene });
        this.scene!.events.on(Scenes.Events.UPDATE, this.#ecs.process, this.#ecs);
    }

    destroy() {
        this.scene!.events.off(Scenes.Events.UPDATE, this.#ecs!.process);
    }

}
