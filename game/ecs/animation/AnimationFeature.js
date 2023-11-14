import SceneFeature from '../SceneFeature.js';

import { createAnimationPostSystem, createAnimationPreSystem } from './system.js';

export default class AnimationFeature extends SceneFeature {

    #animationPreSystem = null;
    #animationPostSystem = null;

    /**
     * @override
     */
    init() {
        this.#animationPreSystem = createAnimationPreSystem();
        this.#animationPostSystem = createAnimationPostSystem();
    }

    /**
     * @override
     */
    preUpdate(time, delta) {
        this.#animationPreSystem?.(this.ecs.world, time, delta);
    }

    /**
     * @override
     */
    postUpdate(time, delta) {
        this.#animationPostSystem?.(this.ecs.world, time, delta);
    }
}
