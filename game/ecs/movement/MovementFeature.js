import SceneFeature from '../SceneFeature.js';
import { createMovementAnimationSystem, createMovementSystem } from './system.js';

export default class MovementFeature extends SceneFeature {

    #movementSystem = null;
    #movementAnimationSystem = null;

    init() {
        this.#movementSystem = createMovementSystem();

        if (this.config.animation) {
            this.#movementAnimationSystem = createMovementAnimationSystem();
        }
    }

    /**
     * @override
     */
    update(time, delta) {
        this.#movementSystem?.(this.ecs.world);
        this.#movementAnimationSystem?.(this.ecs.world);
        super.update(time, delta);
    }

    static defaultConfig() {
        return { animation: true };
    }
}