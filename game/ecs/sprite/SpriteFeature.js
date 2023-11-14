import SceneFeature from '../SceneFeature.js';

import {
    createExitSpriteSystem,
    createSpriteDepthSystem,
    createSpriteGroupSystem,
    createSpritePositionSystem,
    createSpriteSceneSystem
} from './system.js';

export default class SpriteFeature extends SceneFeature {

    #preUpdateSystems = new Set();
    #updateSystems = new Set();
    #postUpdateSystems = new Set();

    init() {
        this.#updateSystems.add(createSpriteDepthSystem());
        this.#updateSystems.add(createSpriteSceneSystem());
        this.#updateSystems.add(createSpriteGroupSystem());
        this.#updateSystems.add(createSpritePositionSystem());
        this.#postUpdateSystems.add(createExitSpriteSystem());
    }

    /**
     * @override
     */
    preUpdate(time, delta) {
        for (const system of this.#preUpdateSystems) {
            system(this.ecs.world, time, delta);
        }
    }

    /**
     * @override
     */
    update(time, delta) {
        for (const system of this.#updateSystems) {
            system(this.ecs.world, time, delta);
        }
    }

    /**
     * @override
     */
    postUpdate(time, delta) {
        for (const system of this.#postUpdateSystems) {
            system(this.ecs.world, time, delta);
        }
    }
}
