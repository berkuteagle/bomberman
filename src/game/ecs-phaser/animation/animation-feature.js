import {
    Feature,
    withStore
} from '../../ecs.js';

import AnimationRequestsSystem from './animation-requests-system.js';
import AnimationSystem from './animation-system.js';
import MovementAnimationSystem from './movement-animation-system.js';

import {
    withPlayAnimationRequest,
    withStopAnimationRequest
} from './utils.js';

export default class AnimationFeature extends Feature {

    /** @override */
    init() {
        this.addSystem('animation-requests', new AnimationRequestsSystem(this.ecs));
        this.addSystem('animation', new AnimationSystem(this.ecs));
        this.addSystem('movement-animation', new MovementAnimationSystem(this.ecs));
    }

    playAnimation(eid, animation) {
        this.ecs.request(
            withPlayAnimationRequest(eid),
            withStore({ animation })
        );
    }

    stopAnimation(eid) {
        this.ecs.request(
            withStopAnimationRequest(eid)
        )
    }
}
