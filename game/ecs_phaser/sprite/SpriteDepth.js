import { Types, addComponent, defineComponent } from '../../bitecs.js';

export const SpriteDepth = defineComponent({
    depth: Types.ui16
});

export const addSpriteDepth = (depth) => (world, eid) => {
    addComponent(world, SpriteDepth, eid);

    SpriteDepth.depth[eid] = depth;
}
