import Feature from '../feature.js';

// import PositionLimitsSystem from './PositionLimitsSystem.js';
// import PositionRequestsSystem from './PositionRequestsSystem.js';
import {
    addVelocity,
    createChangeVelocityRequest,
    createSetVelocityRequest
} from './utils.js';

export default class VelocityFeature extends Feature {

    /** @override */
    init() {
        // this.addSystem('position_requests', new PositionRequestsSystem(this.ecs));
        // this.addSystem('position_limits', new PositionLimitsSystem(this.ecs));
    }

    addVelocity(x, y) {
        return addVelocity(x, y);
    }

    create(x, y, ...ext) {
        return this.ecs.addEntity(
            addVelocity(x, y),
            ...ext
        );
    }

    changeVelocity(eid, dx, dy) {
        this.emit(
            createChangeVelocityRequest(eid, dx, dy)
        );
    }

    setVelocity(eid, x, y) {
        this.emit(
            createSetVelocityRequest(eid, x, y)
        );
    }
}
