import { Query, addEntity, createWorld, defineQuery, deleteWorld, exitQuery, removeEntity, removeQuery } from 'bitecs';
import { Plugins, Scenes } from 'phaser';

import Data, { DataTag } from './Data';
import { EventTag, withEvent } from './Event';
import { RequestTag, withRequest } from './Request';
import { chain } from './chain';

import { ISceneSystem, ISceneWorld, WorldEidFunction } from './types';

export default class ScenePlugin extends Plugins.ScenePlugin {

    #world!: ISceneWorld;

    #systems: Map<string, ISceneSystem> = new Map();
    #enabledSystems: Set<string> = new Set();

    #events: Set<WorldEidFunction> = new Set();
    #requests: Set<WorldEidFunction> = new Set();

    #exitDataQuery: Query<ISceneWorld> | null = null;
    #eventsQuery: Query<ISceneWorld> | null = null;
    #requestsQuery: Query<ISceneWorld> | null = null;

    addSystem(systemKey: string, system: ISceneSystem, enable: boolean = true): void {
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
        if (this.#requests.size) {
            for (const requestFn of this.#requests) {
                this.addEntity(requestFn);
            }
            this.#requests.clear();
        }

        if (this.#events.size) {
            for (const eventFn of this.#events) {
                this.addEntity(eventFn);
            }
            this.#events.clear();
        }

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

        for (const entity of (this.#exitDataQuery?.(this.#world) || [])) {
            this.#world.data.unset(entity);
        }
    }

    addEntity(...ext: (WorldEidFunction | null)[]): number {
        return chain(...ext)(this.#world, addEntity(this.#world));
    }

    removeEntity(eid: number): void {
        removeEntity(this.#world, eid);
    }

    emit(...ext: (WorldEidFunction | null)[]): void {
        if (ext.length) {
            this.#events.add(chain(withEvent(), ...ext));
        }
    }

    request(...ext: (WorldEidFunction | null)[]): void {
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
        this.#enabledSystems.clear();
        this.#systems.clear();
        this.#events.clear();
        this.#requests.clear();

        removeQuery(this.#world, this.#eventsQuery!);
        removeQuery(this.#world, this.#requestsQuery!);
        removeQuery(this.#world, this.#exitDataQuery!);

        deleteWorld(this.#world);
    }
}