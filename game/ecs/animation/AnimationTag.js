import { addComponent, defineComponent } from '../../bitecs.js';

export const AnimationTag = defineComponent();

export const addAnimationTag = () => (world, eid) => {
    addComponent(world, AnimationTag, eid);
}
