import { createWorld, defineQuery, removeEntity, addEntity } from '../bitecs.js';

import Store from './store.js';
import { Event, Request } from './common.js';

/**
 * Main ECS instance
 * @template TWorldData extends Object = {}
 */
export default class ECS {

    #world;
    #store;

    #requestsQueue = new Set();
    #eventsQueue = new Set();

    #requestsQuery;
    #eventsQuery;

    #features = new Map();
    #enabledFeatures = new Set();

    /**
     * @param {TWorldData} worldData 
     */
    constructor(worldData = {}) {
        this.#world = createWorld(worldData);
        this.#requestsQuery = defineQuery([Request]);
        this.#eventsQuery = defineQuery([Event]);
        this.#store = new Store();
    }

    get world() {
        return this.#world;
    }

    get store() {
        return this.#store;
    }

    process(time, delta) {
        for (const eventFn of this.#eventsQueue) {
            eventFn(this.#world);
        }
        this.#eventsQueue.clear();

        for (const requestFn of this.#requestsQueue) {
            requestFn(this.#world);
        }
        this.#requestsQueue.clear();

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).preUpdate(time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).update(time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).postUpdate(time, delta);
        }

        for (const entity of this.#eventsQuery(this.#world)) {
            removeEntity(this.#world, entity);
        }

        for (const entity of this.#requestsQuery(this.#world)) {
            if (!--Request.ttl[entity]) {
                removeEntity(this.#world, entity);
            }
        }
    }

    addFeature(featureKey, FeatureClass, config = {}, enabled = true) {
        if (!this.#features.has(featureKey)) {

            const feature = new FeatureClass(this, config);

            feature.init();

            this.#features.set(featureKey, feature);
            if (enabled) {
                this.#enabledFeatures.add(featureKey);
            }
        }
    }

    removeFeature(featureKey) {
        this.#enabledFeatures.delete(featureKey);
        this.#features.delete(featureKey);
    }

    enableFeature(featureKey) {
        if (this.#features.has(featureKey)) {
            this.#enabledFeatures.add(featureKey);
        }
    }

    disableFeature(featureKey) {
        this.#enabledFeatures.delete(featureKey);
    }

    getFeature(featureKey) {
        return this.#features.get(featureKey);
    }

    sendRequest(requestFn) {
        this.#requestsQueue.add(requestFn);
    }

    sendEvent(eventFn) {
        this.#eventsQueue.add(eventFn);
    }

    addEntity(...ext) {
        const eid = addEntity(this.#world);

        for (const fn of ext) {
            fn(this.#world, eid);
        }

        return eid;
    }

    removeEntity(eid) {
        removeEntity(this.#world, eid);
    }
}
