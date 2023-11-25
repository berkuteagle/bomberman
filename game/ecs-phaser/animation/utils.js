import { addComponent, hasComponent } from '../../bitecs.js';

import { AnimationTag, PlayAnimationRequest, StopAnimationRequest } from './components.js';

export const addAnimationTag = () => (world, eid) => {
    addComponent(world, AnimationTag, eid);
}

export const hasAnimationTag = (world, ...eids) => eids.every(eid => hasComponent(world, AnimationTag, eid));

export const addPlayAnimationRequest = (sprite) => (world, eid) => {
    addComponent(world, PlayAnimationRequest, eid);

    PlayAnimationRequest.sprite[eid] = sprite;
}

export const addStopAnimationRequest = (sprite) => (world, eid) => {
    addComponent(world, StopAnimationRequest, eid);

    StopAnimationRequest.sprite[eid] = sprite;
}
