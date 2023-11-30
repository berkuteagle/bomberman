import {
    addComponent,
    hasComponent
} from 'bitecs';

import {
    chain,
    withStore
} from '../../ecs.js';

import {
    AnimationTag,
    MovementAnimationTag,
    PlayAnimationRequest,
    StopAnimationRequest
} from './components.js';

export const withAnimationTag = () => (world, eid) => {
    addComponent(world, AnimationTag, eid);
};

export const hasAnimationTag = (world, eid) => hasComponent(world, AnimationTag, eid);

export const withAnimation = animation => chain(
    withAnimationTag(),
    withStore({ animation })
);

export const withPlayAnimationRequest = (sprite) => (world, eid) => {
    addComponent(world, PlayAnimationRequest, eid);

    PlayAnimationRequest.sprite[eid] = sprite;
};

export const withStopAnimationRequest = (sprite) => (world, eid) => {
    addComponent(world, StopAnimationRequest, eid);

    StopAnimationRequest.sprite[eid] = sprite;
};

export const withMovementAnimationTag = () => (world, eid) => {
    addComponent(world, MovementAnimationTag, eid);
};

export const hasMovementAnimationTag = (world, eid) => hasComponent(world, MovementAnimationTag, eid);

export const withMovementAnimation = ({ up, down, left, right }) => chain(
    withMovementAnimationTag(),
    withStore({ ['movement-animation']: { up, down, left, right } })
);
