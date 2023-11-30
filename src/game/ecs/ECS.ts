import { addEntity, createWorld, defineQuery, exitQuery, removeEntity } from 'bitecs';

import Data from './Data';
import Feature from './Feature';
import { Event, Request, Store, WorldFn, chain, withEvent, withRequest } from './common';

/**
 * Main ECS instance
 * @template TWorldData extends Object = {}
 */
export default class ECS {

    #world;
    #data;
    #events;
    #requests;

    #requestsQuery;
    #eventsQuery;
    #dataQuery;

    #features = new Map<string, Feature<unknown>>();
    #enabledFeatures = new Set<string>();

    /**
     * @param {TWorldData} worldData 
     */
    constructor(worldData = {}) {
        this.#data = new Data();
        this.#events = new Set<WorldFn>();
        this.#requests = new Set<WorldFn>();

        this.#world = createWorld({
            [Symbol.for('ecs-data')]: this.#data,
            ...worldData
        });

        this.#requestsQuery = defineQuery([Request]);
        this.#eventsQuery = defineQuery([Event]);
        this.#dataQuery = exitQuery(defineQuery([Store]));
    }

    get world() {
        return this.#world;
    }

    get store() {
        return this.#data;
    }

    process(time: number, delta: number) {
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

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey)!.preUpdate(time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey)!.update(time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey)!.postUpdate(time, delta);
        }

        for (const entity of this.#eventsQuery(this.#world)) {
            removeEntity(this.#world, entity);
        }

        for (const entity of this.#requestsQuery(this.#world)) {
            removeEntity(this.#world, entity);
        }

        for (const entity of this.#dataQuery(this.#world)) {
            this.#data.unset(entity);
        }
    }

    addFeature<C, F extends typeof Feature<C>>(featureKey: string, FeatureClass: F, config: C, enabled: boolean = true): void {
        if (!this.#features.has(featureKey)) {

            const feature = new FeatureClass(this, config);

            feature.init();

            this.#features.set(featureKey, feature);
            if (enabled) {
                this.#enabledFeatures.add(featureKey);
            }
        }
    }

    removeFeature(featureKey: string): void {
        this.#enabledFeatures.delete(featureKey);
        this.#features.delete(featureKey);
    }

    enableFeature(featureKey: string): void {
        if (this.#features.has(featureKey)) {
            this.#enabledFeatures.add(featureKey);
        }
    }

    disableFeature(featureKey: string): void {
        this.#enabledFeatures.delete(featureKey);
    }

    getFeature(featureKey: string): Feature<unknown> | void {
        return this.#features.get(featureKey);
    }

    addEntity(...ext: WorldFn[]): void {
        return chain(...ext)(this.#world, addEntity(this.#world));
    }

    removeEntity(eid: number): void {
        removeEntity(this.#world, eid);
    }

    emit(...ext: WorldFn[]): void {
        if (ext.length) {
            this.#events.add(chain(withEvent(), ...ext));
        }
    }

    request(...ext: WorldFn[]): void {
        if (ext.length) {
            this.#requests.add(chain(withRequest(), ...ext));
        }
    }

    destroy() {
        this.#events.clear();
        this.#requests.clear();
        this.#enabledFeatures.clear();

        this.#data.destroy();

        for (const feature of this.#features.values()) {
            feature.destroy();
        }

        this.#features.clear();
    }
}
