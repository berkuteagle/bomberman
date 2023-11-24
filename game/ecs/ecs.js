import { createWorld } from '../bitecs.js';

import Store from './store.js';

/**
 * Main ECS instance
 * @template TWorldData extends Object = {}
 */
export default class ECS {

    #world;
    #store;

    #features = new Map();
    #enabledFeatures = new Set();

    /**
     * @param {TWorldData} worldData 
     */
    constructor(worldData = {}) {
        this.#world = createWorld(worldData);
        this.#store = new Store();
    }

    get world() {
        return this.#world;
    }

    get store() {
        return this.#store;
    }

    process(time, delta) {
        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).preUpdate(time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).update(time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).postUpdate(time, delta);
        }
    }

    addFeature(featureKey, FeatureClass, config = {}, enabled = true) {
        if (!this.#features.has(featureKey)) {

            const feature = new FeatureClass(this, config);

            this.#features.add(featureKey, feature);
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
}
