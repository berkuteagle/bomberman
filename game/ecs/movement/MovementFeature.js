import SceneFeature from '../SceneFeature.js';
import { createMovementAnimationSystem } from './system.js';

export default class MovementFeature extends SceneFeature {

    #movementAnimationSystem = null;

    init() {
        if (this.config.animation) {
            this.#movementAnimationSystem = createMovementAnimationSystem();
        }
    }

    /**
     * @override
     */
    update() {
        this.#movementAnimationSystem?.(this.ecs.world);
    }

    static defaultConfig() {
        return { animation: true };
    }
}
