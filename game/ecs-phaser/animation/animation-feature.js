import { Feature } from '../../ecs.js';

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
        this.request(
            1,
            withPlayAnimationRequest(eid),
            (_, request) => this.ecs.store.setValue(request, 'animation', animation)
        );
    }

    stopAnimation(eid) {
        this.request(
            1,
            withStopAnimationRequest(eid)
        )
    }
}
