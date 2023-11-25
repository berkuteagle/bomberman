import { Feature, createRequest } from '../../ecs.js';

import AnimationRequestsSystem from './AnimationRequestsSystem.js';
import { addAnimationTag, addPlayAnimationRequest, addStopAnimationRequest } from './utils.js';

export default class AnimationFeature extends Feature {

    /** @override */
    init() {
        this.ecs.store.register('animation');

        this.addSystem('animation_requests', new AnimationRequestsSystem(this.ecs));
    }

    addAnimationTag() {
        return addAnimationTag();
    }

    playAnimation(eid, animation) {
        this.ecs.sendRequest(
            createRequest(
                1,
                addPlayAnimationRequest(eid),
                (_, request) => this.ecs.store.setValue(request, 'animation', animation)
            )
        );
    }

    stopAnimation(eid) {
        this.ecs.sendRequest(
            createRequest(
                1,
                addStopAnimationRequest(eid)
            )
        )
    }
}
