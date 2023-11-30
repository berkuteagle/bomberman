import Feature from '../feature.js';

import {
    withChangeVelocityRequest,
    withSetVelocityRequest
} from './utils.js';

import VelocityLimitSystem from './velocity-limit-system.js';
import VelocityRequestsSystem from './velocity-requests-system.js';
import VelocitySystem from './velocity-system.js';

export default class VelocityFeature extends Feature {

    /** @override */
    init() {
        this.addSystem('velocity-requests', new VelocityRequestsSystem(this.ecs));
        this.addSystem('velocity-limit', new VelocityLimitSystem(this.ecs));
        this.addSystem('velocity', new VelocitySystem(this.ecs));
    }

    changeVelocity(eid, dx, dy) {
        this.ecs.request(
            withChangeVelocityRequest(eid, dx, dy)
        );
    }

    setVelocity(eid, x, y) {
        this.ecs.request(
            withSetVelocityRequest(eid, x, y)
        );
    }
}
