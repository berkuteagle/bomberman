import { BaseSceneFeature } from '../common.js';
import { createAnimationSystem } from './system.js';

export default class AnimationSceneFeature extends BaseSceneFeature {

    create() {

        const { animations = [] } = this.config;

        animations.forEach(({ key, texture, frames, frameRate, repeat = -1 }) => {
            this.scene.anims.create({
                key,
                frames: this.scene.anims.generateFrameNumbers(texture || key, { frames }),
                frameRate,
                repeat
            });
        });

        this.scene.ecs.addSystem('animation', createAnimationSystem());

        super.create();
    }

}
