import SceneFeature from '../SceneFeature.js';

import AccelerationSystem from './AccelerationSystem.js';
import CollisionSystem from './CollisionSystem.js';
import ForceSystem from './ForceSystem.js';
import VelocitySystem from './VelocitySystem.js';

export default class PhyFeature extends SceneFeature {

    #velocitySystem = null;
    #accelerationSystem = null;
    #forceSystem = null;
    #collisionSystem = null;

    /**
     * @override
     */
    init() {
        this.#velocitySystem = new VelocitySystem(this.ecs);
        this.#accelerationSystem = new AccelerationSystem(this.ecs);
        this.#forceSystem = new ForceSystem(this.ecs);
        this.#collisionSystem = new CollisionSystem(this.ecs);
    }

    /**
     * @override
     */
    update(time, delta) {
        this.#forceSystem.update(time, delta);
        this.#accelerationSystem.update(time, delta);
        this.#velocitySystem.update(time, delta);
        this.#collisionSystem.update(time, delta);
    }

    /**
     * @override
     */
    postUpdate(time, delta) {
        this.#collisionSystem.postUpdate(time, delta);
    }

}
