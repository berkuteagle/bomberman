import { ECS, PositionFeature } from '../ecs.js';
import { Plugins, Scenes } from '../phaser.js';

import { AnimationFeature } from './animation.js';
import { SpriteFeature } from './sprite.js';

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

    get sprite() {
        return this.#ecs.getFeature('sprite');
    }

    get animation() {
        return this.#ecs.getFeature('animation');
    }

    get position() {
        return this.#ecs.getFeature('position');
    }

    boot() {
        this.#ecs = new ECS({ scene: this.scene });
        this.#ecs.addFeature('position', PositionFeature);
        this.#ecs.addFeature('sprite', SpriteFeature);
        this.#ecs.addFeature('animation', AnimationFeature);

        this.scene.events.on(Scenes.Events.UPDATE, this.#ecs.process, this.#ecs);
    }

    destroy() {
        this.scene.events.off(Scenes.Events.UPDATE, this.#ecs.process);
    }

}
