import SceneFeature from '../SceneFeature.js';

import { createAnimationPreSystem } from './system.js';

export default class AnimationFeature extends SceneFeature {

    #animationPreSystem = null;

    /**
     * @override
     */
    init() {
        this.#animationPreSystem = createAnimationPreSystem();
    }

    /**
     * @override
     */
    preUpdate(time, delta) {
        this.#animationPreSystem?.(this.ecs.world, time, delta);
    }

}
