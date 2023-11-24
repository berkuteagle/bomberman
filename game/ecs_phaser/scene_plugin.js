import { ECS } from '../ecs.js';
import { ScenePlugin as PhaserScenePlugin } from '../phaser.js';

import { AnimationFeature } from './animation.js';
import { SpriteFeature } from './sprite.js';

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

    get sprite() {
        return this.#ecs.getFeature('sprite');
    }

    get animation() {
        return this.#ecs.getFeature('animation');
    }

    boot() {
        this.#ecs = new ECS({ scene: this.scene });
        this.#ecs.addFeature('sprite', SpriteFeature);
        this.#ecs.addFeature('animation', AnimationFeature);
    }

    destroy() { }

}
