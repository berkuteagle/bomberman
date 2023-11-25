import Feature from '../feature.js';

import PositionLimitsSystem from './position-limits-system.js';
import PositionRequestsSystem from './position-requests-system.js';
import {
    addPosition,
    createChangePositionRequest,
    createSetPositionRequest
} from './utils.js';

export default class PositionFeature extends Feature {

    /** @override */
    init() {
        this.addSystem('position-requests', new PositionRequestsSystem(this.ecs));
        this.addSystem('position-limits', new PositionLimitsSystem(this.ecs));
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
