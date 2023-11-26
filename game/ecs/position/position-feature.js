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

    withPosition(x, y) {
        return withPosition(x, y);
    }

    create(x, y, ...ext) {
        return this.ecs.addEntity(
            withPosition(x, y),
            ...ext
        );
    }

    changePosition(eid, dx, dy) {
        this.ecs.request(
            1,
            withChangePositionRequest(eid, dx, dy)
        );
    }

    setPosition(eid, x, y) {
        this.ecs.request(
            1,
            withSetPositionRequest(eid, x, y)
        );
    }
}
