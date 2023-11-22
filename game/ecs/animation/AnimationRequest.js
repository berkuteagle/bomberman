import { Types, addComponent, defineComponent } from '../../bitecs.js';
import { createRequest } from '../common.js';

export const AnimationState = Object.freeze({
    STOP: 0,
    PLAY: 1,
    FORCE_PLAY: 1 << 2
});

export const AnimationRequest = defineComponent({
    animation: Types.eid,
    state: Types.ui8,
    sprite: Types.eid
});

export const addAnimationRequest = (animationEid, state = AnimationState.STOP, spriteEid) => (world, eid) => {
    addComponent(world, AnimationRequest, eid);
    AnimationRequest.animation[eid] = animationEid;
    AnimationRequest.state[eid] = state;
    AnimationRequest.sprite[eid] = spriteEid;
}

export const createAnimationRequest = (animationEid, state, spriteEid) => createRequest(1, addAnimationRequest(animationEid, state, spriteEid));
