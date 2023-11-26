import Feature from '../feature.js';

import DirectionRequestsSystem from './direction-requests-system.js';

export default class DirectionFeature extends Feature {

    init() {
        this.addSystem('direction-requests', new DirectionRequestsSystem(this.ecs));
    }

}
