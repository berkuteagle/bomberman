import SceneFeature from '../SceneFeature.js';

import { createAnimationSystem } from './system.js';

export default class AnimationFeature extends SceneFeature {

    #animationSystem = null;

    /**
     * @override
     */
    init() {
        const { animations = [] } = this.config;

        animations.forEach(({ key, texture, frames, frameRate, repeat = -1 }) => {
            this.ecs.scene.anims.create({
                key,
                frames: this.ecs.scene.anims.generateFrameNumbers(texture || key, { frames }),
                frameRate,
                repeat
            });
        });

        this.#animationSystem = createAnimationSystem();
    }

    /**
     * @override
     */
    update(time, delta) {
        this.#animationSystem?.(this.ecs.world, time, delta);
    }
}