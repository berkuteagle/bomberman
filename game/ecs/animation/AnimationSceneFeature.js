import { BaseSceneFeature } from '../common.js';
import { createAnimationSystem } from './system.js';

export default class AnimationSceneFeature extends BaseSceneFeature {

    #animationsMap = new Map();
    #system = null;

    get animationsMap() {
        return this.#animationsMap;
    }

    create() {

        const { animations = [], spritesMap } = this.config;

        animations.forEach(({ key, texture, frames, frameRate, repeat = -1 }, idx) => {
            this.#animationsMap.set(idx, key);
            this.scene.anims.create({
                key,
                frames: this.scene.anims.generateFrameNumbers(texture || key, { frames }),
                frameRate,
                repeat
            });
        });

        this.#system = createAnimationSystem(this.#animationsMap, spritesMap);

        super.create();
    }

    update() {
        this.#system?.(this.world);

        super.update();
    }
}
