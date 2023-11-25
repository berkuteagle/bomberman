import Feature from '../feature.js';

import PositionLimitsSystem from './PositionLimitsSystem.js';
import PositionRequestsSystem from './PositionRequestsSystem.js';
import {
    addPosition,
    createChangePositionRequest,
    createSetPositionRequest
} from './utils.js';

export default class PositionFeature extends Feature {

    /** @override */
    init() {
        this.addSystem('position_requests', new PositionRequestsSystem(this.ecs));
        this.addSystem('position_limits', new PositionLimitsSystem(this.ecs));
    }

    addPosition(x, y) {
        return addPosition(x, y);
    }

    create(x, y, ...ext) {
        return this.ecs.addEntity(
            addPosition(x, y),
            ...ext
        );
    }

    changePosition(eid, dx, dy) {
        this.emit(
            createChangePositionRequest(eid, dx, dy)
        );
    }

    setPosition(eid, x, y) {
        this.emit(
            createSetPositionRequest(eid, x, y)
        );
    }
}
