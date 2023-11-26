import {
    Feature,
    withStore
} from '../../ecs.js';

import AnimationRequestsSystem from './animation-requests-system.js';
import {
    withPlayAnimationRequest,
    withStopAnimationRequest
} from './utils.js';

export default class AnimationFeature extends Feature {

    /** @override */
    init() {
        this.ecs.store.register('animation');

        this.addSystem('animation-requests', new AnimationRequestsSystem(this.ecs));
    }

    playAnimation(eid, animation) {
        this.ecs.request(
            1,
            withPlayAnimationRequest(eid),
            withStore({ animation })
        );
    }

    stopAnimation(eid) {
        this.ecs.request(
            1,
            withStopAnimationRequest(eid)
        )
    }
}
