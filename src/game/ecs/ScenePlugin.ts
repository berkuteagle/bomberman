import {
    DESERIALIZE_MODE,
    Deserializer,
    Query,
    Serializer,
    addEntity,
    createWorld,
    defineDeserializer,
    defineQuery,
    defineSerializer,
    deleteWorld,
    exitQuery,
    removeEntity,
    removeQuery
} from 'bitecs';
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

    #serializer: Serializer<ISceneWorld> | null = null;
    #deserializer: Deserializer<ISceneWorld> | null = null;

    #out_sync_resolver: Function | null = null;
    #in_sync_packets: Set<ArrayBuffer> = new Set();
    #destroyed: boolean = false;

    async *outSync(): AsyncGenerator<ArrayBuffer> {
        while (!this.#destroyed) {
            yield new Promise<ArrayBuffer>(resolve => {
                this.#out_sync_resolver = resolve;
            });
        }
    }

    inSync(packet: ArrayBuffer): void {
        this.#in_sync_packets.add(packet);
    }

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

        this.#out_sync_resolver?.(this.#serializer!(this.#requestsQuery!(this.#world)));

        if (this.#in_sync_packets.size) {

            const in_sync_packets = Array.from(this.#in_sync_packets);
            this.#in_sync_packets.clear();

            for (const packet of in_sync_packets) {
                this.#deserializer!(this.#world, packet, DESERIALIZE_MODE.MAP);
            }
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

    get serializer(): Serializer<ISceneWorld> | null {
        return this.#serializer;
    }

    get deserializer(): Deserializer<ISceneWorld> | null {
        return this.#deserializer;
    }

    boot() {
        this.#world = createWorld<ISceneWorld>({
            data: new Data(),
            scene: this.scene!
        });

        this.#serializer = defineSerializer(this.#world);
        this.#deserializer = defineDeserializer(this.#world);

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
