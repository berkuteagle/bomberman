import { ECS } from '../ecs.js';
import { ScenePlugin as PhaserScenePlugin } from '../phaser.js';

export default class ScenePlugin extends PhaserScenePlugin {

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

    boot() {
        this.#ecs = new ECS({ scene: this.scene });
        this.#ecs.store.registerField('sprite');
        this.#ecs.store.registerField('animation');
    }

    destroy() { }

}
