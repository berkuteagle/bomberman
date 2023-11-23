import SceneFeature from '../SceneFeature.js';

import MovementAnimationSystem from './MovementAnimationSystem.js';

export default class MovementFeature extends SceneFeature {

    /**
     * @override
     */
    init() {
        if (this.config.animation) {
            this.addSystem('movement_animation', new MovementAnimationSystem(this.ecs));
        }
    }

    static defaultConfig() {
        return { animation: true };
    }
}
