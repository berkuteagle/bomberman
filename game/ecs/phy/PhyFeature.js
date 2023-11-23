import SceneFeature from '../SceneFeature.js';

import AccelerationSystem from './AccelerationSystem.js';
import CollisionSystem from './CollisionSystem.js';
import ForceSystem from './ForceSystem.js';
import VelocitySystem from './VelocitySystem.js';

export default class PhyFeature extends SceneFeature {

    /**
     * @override
     */
    init() {
        this.addSystem('velocity', new VelocitySystem(this.ecs));
        this.addSystem('acceleration', new AccelerationSystem(this.ecs));
        this.addSystem('force', new ForceSystem(this.ecs));
        this.addSystem('collision', new CollisionSystem(this.ecs));
    }

}
