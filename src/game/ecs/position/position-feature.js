import Feature from '../feature.js';

import PositionLimitsSystem from './position-limits-system.js';
import PositionRequestsSystem from './position-requests-system.js';

import {
    withChangePositionRequest,
    withPosition,
    withSetPositionRequest
} from './utils.js';

export default class PositionFeature extends Feature {

    /** @override */
    init() {
        this.addSystem('position-requests', new PositionRequestsSystem(this.ecs));
        this.addSystem('position-limits', new PositionLimitsSystem(this.ecs));
    }

    changePosition(eid, dx, dy) {
        this.ecs.request(
            withChangePositionRequest(eid, dx, dy)
        );
    }

    setPosition(eid, x, y) {
        this.ecs.request(
            withSetPositionRequest(eid, x, y)
        );
    }
}
