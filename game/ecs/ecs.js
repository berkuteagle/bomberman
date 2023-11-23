import { createWorld } from '../bitecs.js';

/**
 * Main ECS instance
 */
export default class ECS {

    #world;
    #features = new Map();
    #enabledFeatures = new Set();

    constructor(worldData = {}) {
        this.#world = createWorld(worldData);
    }

    get world() {
        return this.#world;
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
