import { addComponent, defineComponent, hasComponent } from '../../bitecs.js';

export const AnimationTag = defineComponent();

export const addAnimationTag = () => (world, eid) => {
    addComponent(world, AnimationTag, eid);
}

export const hasAnimationTag = (world, ...eids) => eids.every(eid => hasComponent(world, AnimationTag, eid));
