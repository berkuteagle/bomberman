import {
    addEntity,
    createWorld,
    defineQuery,
    exitQuery,
    removeEntity
} from '../bitecs.js';

import {
    Event,
    Request,
    createEntity,
    withEvent,
    withRequest
} from './common.js';

import Store from './store.js';

/**
 * Main ECS instance
 * @template TWorldData extends Object = {}
 */
export default class ECS {

    #world;
    #store;
    #events;
    #requests;

    #requestsQuery;
    #eventsQuery;
    #storeQuery;

    /** @type {Map<String, import('./feature.js').default>} */
    #features = new Map();
    #enabledFeatures = new Set();

    /**
     * @param {TWorldData} worldData 
     */
    constructor(worldData = {}) {
        this.#store = new Store();
        this.#events = new Set();
        this.#requests = new Set();

        this.#world = createWorld({
            [Symbol.for('ecs-store')]: this.#store,
            ...worldData
        });

        this.#requestsQuery = defineQuery([Request]);
        this.#eventsQuery = defineQuery([Event]);
        this.#storeQuery = exitQuery(defineQuery([Store]));
    }

    get world() {
        return this.#world;
    }

    get store() {
        return this.#store;
    }

    process(time, delta) {
        if (this.#requests.size) {
            for (const requestFn of this.#requests) {
                requestFn(this.#world);
            }
            this.#requests.clear();
        }

        if (this.#events.size) {
            for (const eventFn of this.#events) {
                eventFn(this.#world);
            }
            this.#events.clear();
        }

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

        for (const entity of this.#storeQuery(this.#world)) {
            this.#store.delete(entity);
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

    emit(...ext) {
        if (ext.length) {
            this.#events.add(createEntity(withEvent(), ...ext));
        }
    }

    request(ttl, ...ext) {
        if (ttl && ext.length) {
            this.#requests.add(createEntity(withRequest(ttl), ...ext));
        }
    }

    destroy() {
        this.#events.clear();
        this.#requests.clear();
        this.#enabledFeatures.clear();

        this.#store.destroy();

        for (const feature of this.#features) {
            feature.destroy();
        }

        this.#features.clear();
    }
}
