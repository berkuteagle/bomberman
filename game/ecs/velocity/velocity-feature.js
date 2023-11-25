import Feature from '../feature.js';

// import PositionLimitsSystem from './PositionLimitsSystem.js';
import {
    addVelocity,
    createChangeVelocityRequest,
    createSetVelocityRequest
} from './utils.js';
import VelocityLimitSystem from './velocity-limit-system.js';
import VelocityRequestsSystem from './velocity-requests-system.js';

export default class VelocityFeature extends Feature {

    /** @override */
    init() {
        this.addSystem('velocity-requests', new VelocityRequestsSystem(this.ecs));
        this.addSystem('velocity-limit', new VelocityLimitSystem(this.ecs));
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
