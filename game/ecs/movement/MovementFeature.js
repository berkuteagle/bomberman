import SceneFeature from '../SceneFeature.js';

import MovementAnimationSystem from './MovementAnimationSystem.js';

export default class MovementFeature extends SceneFeature {

    #movementAnimationSystem = null;

    init() {
        if (this.config.animation) {
            this.#movementAnimationSystem = new MovementAnimationSystem(this.ecs);
        }
    }

    /**
     * @override
     */
    update() {
        this.#movementAnimationSystem?.update();
    }

    static defaultConfig() {
        return { animation: true };
    }
}
