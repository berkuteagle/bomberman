import { ECS } from '../ecs.js';
import { Plugins, Scenes } from '../phaser.js';

export default class ScenePlugin extends Plugins.ScenePlugin {

    /** @type {import('../ecs.js').ECS<{scene: (import '../phaser.js').Scene}>} */
    #ecs;

    get ecs() {
        return this.#ecs;
    }

    get world() {
        return this.#ecs.world;
    }

    get store() {
        return this.#ecs.store;
    }

    addFeature(featureKey, FeatureClass, config = {}, enabled = true) {
        this.#ecs.addFeature(featureKey, FeatureClass, config, enabled);
    }

    getFeature(featureKey) {
        return this.#ecs.getFeature(featureKey);
    }

    boot() {
        this.#ecs = new ECS({ scene: this.scene });
        this.scene.events.on(Scenes.Events.UPDATE, this.#ecs.process, this.#ecs);
    }

    destroy() {
        this.scene.events.off(Scenes.Events.UPDATE, this.#ecs.process);
    }

}
