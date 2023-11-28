import {
    addEntity,
    createWorld,
    defineQuery,
    defineSerializer,
    exitQuery,
    removeEntity
} from '../bitecs.js';

import {
    Event,
    Request,
    Store,
    chain,
    withEvent,
    withRequest
} from './common.js';

import Data from './data.js';

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

    #serializer;

    /** @type {Map<String, import('./feature.js').default>} */
    #features = new Map();
    #enabledFeatures = new Set();

    /**
     * @param {TWorldData} worldData 
     */
    constructor(worldData = {}) {
        this.#data = new Data();
        this.#events = new Set();
        this.#requests = new Set();

        this.#world = createWorld({
            [Symbol.for('ecs-data')]: this.#data,
            ...worldData
        });

        this.#requestsQuery = defineQuery([Request]);
        this.#eventsQuery = defineQuery([Event]);
        this.#dataQuery = exitQuery(defineQuery([Store]));

        this.#serializer = defineSerializer(this.#world);
    }

    get world() {
        return this.#world;
    }

    get store() {
        return this.#data;
    }

    process(time, delta) {
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
            removeEntity(this.#world, entity);
        }

        for (const entity of this.#dataQuery(this.#world)) {
            this.#data.unset(entity);
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
        return chain(...ext)(this.#world, addEntity(this.#world));
    }

    removeEntity(eid) {
        removeEntity(this.#world, eid);
    }

    emit(...ext) {
        if (ext.length) {
            this.#events.add(chain(withEvent(), ...ext));
        }
    }

    request(...ext) {
        if (ext.length) {
            this.#requests.add(chain(withRequest(), ...ext));
        }
    }

    destroy() {
        this.#events.clear();
        this.#requests.clear();
        this.#enabledFeatures.clear();

        this.#data.destroy();

        for (const feature of this.#features) {
            feature.destroy();
        }

        this.#features.clear();
    }
}
