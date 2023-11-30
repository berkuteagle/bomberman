import { IWorld, Query, addEntity, createWorld, defineQuery, exitQuery, removeEntity } from 'bitecs';
import { Plugins, Scene, Scenes } from 'phaser';

import Data from './Data';
import { DataTag, EventTag, RequestTag, WithComponentFn, chain, withEvent, withRequest } from './common';

export interface ISceneWorld extends IWorld {
    data: Data;
    scene: Scene;
}

export type TUpdateCallback<W extends IWorld> = (world: W, time: number, delta: number) => void;

export interface ISceneSystem<W extends IWorld> {
    preUpdate?: TUpdateCallback<W>;
    update?: TUpdateCallback<W>;
    postUpdate?: TUpdateCallback<W>;
}

export default class ScenePlugin extends Plugins.ScenePlugin {

    #world!: ISceneWorld;

    #systems: Map<string, ISceneSystem<ISceneWorld>> = new Map();
    #enabledSystems: Set<string> = new Set();

    #events: Set<WithComponentFn<ISceneWorld>> = new Set();
    #requests: Set<WithComponentFn<ISceneWorld>> = new Set();

    #exitDataQuery: Query<ISceneWorld> | null = null;
    #eventsQuery: Query<ISceneWorld> | null = null;
    #requestsQuery: Query<ISceneWorld> | null = null;

    addSystem(systemKey: string, system: ISceneSystem<ISceneWorld>, enable: boolean = true): void {
        this.#systems.set(systemKey, system);
        if (enable) {
            this.#enabledSystems.add(systemKey);
        }
    }

    removeSystem(systemKey: string): void {
        this.#systems.delete(systemKey);
        this.#enabledSystems.delete(systemKey);
    }

    disableSystem(systemKey: string): void {
        this.#enabledSystems.delete(systemKey);
    }

    enableSystem(systemKey: string): void {
        this.#enabledSystems.add(systemKey);
    }

    preUpdate(time: number, delta: number): void {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey)!.preUpdate?.(this.#world, time, delta);
        }
    }

    update(time: number, delta: number): void {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey)!.update?.(this.#world, time, delta);
        }
    }

    postUpdate(time: number, delta: number): void {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey)!.postUpdate?.(this.#world, time, delta);
        }

        for (const entity of (this.#eventsQuery?.(this.#world)) || []) {
            removeEntity(this.#world, entity);
        }

        for (const entity of (this.#requestsQuery?.(this.#world)) || []) {
            removeEntity(this.#world, entity);
        }

        const { data } = this.#world;

        for (const entity of (this.#exitDataQuery?.(this.#world) || [])) {
            data.unset(entity);
        }
    }

    addEntity(...ext: WithComponentFn<ISceneWorld>[]): number {
        return chain(...ext)(this.#world, addEntity(this.#world));
    }

    removeEntity(eid: number): void {
        removeEntity(this.#world, eid);
    }

    emit(...ext: WithComponentFn<ISceneWorld>[]): void {
        if (ext.length) {
            this.#events.add(chain(withEvent(), ...ext));
        }
    }

    request(...ext: WithComponentFn<ISceneWorld>[]): void {
        if (ext.length) {
            this.#requests.add(chain(withRequest(), ...ext));
        }
    }

    boot() {
        this.#world = createWorld<ISceneWorld>({
            data: new Data(),
            scene: this.scene!
        });

        this.#exitDataQuery = exitQuery(defineQuery([DataTag]));
        this.#eventsQuery = defineQuery([EventTag]);
        this.#requestsQuery = defineQuery([RequestTag]);

        this.scene!.events.on(Scenes.Events.PRE_UPDATE, this.preUpdate, this);
        this.scene!.events.on(Scenes.Events.UPDATE, this.update, this);
        this.scene!.events.on(Scenes.Events.POST_UPDATE, this.postUpdate, this);
    }

    destroy() {
        this.scene!.events.off(Scenes.Events.PRE_UPDATE, this.preUpdate);
        this.scene!.events.off(Scenes.Events.UPDATE, this.update);
        this.scene!.events.off(Scenes.Events.POST_UPDATE, this.postUpdate);
    }

}
