import { Types, addComponent, addEntity, defineComponent } from '../../bitecs.js';
import { Request } from '../common.js';

export const AnimationRequest = defineComponent({
    animation: Types.eid,
    state: Types.ui8,
    sprite: Types.eid
});

export function sendAnimationRequest(world, animationEid, state, spriteEid) {
    const request = addEntity(world);

    addComponent(world, AnimationRequest, request);
    addComponent(world, Request, request);

    AnimationRequest.animation[request] = animationEid;
    AnimationRequest.state[request] = state;
    AnimationRequest.sprite[request] = spriteEid;
    Request.ttl[request] = 1;
}
