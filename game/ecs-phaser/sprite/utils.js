import { addComponent, hasComponent } from '../../bitecs.js';

import { SpriteDepth, SpriteGroup, SpriteTag } from './components.js';

export const withSpriteTag = () => (world, eid) => {
    addComponent(world, SpriteTag, eid);
}

export const hasSpriteTag = (world, eid) => hasComponent(world, SpriteTag, eid);

export const withSpriteGroup = (groupEid) => (world, eid) => {
    addComponent(world, SpriteGroup, eid);

    SpriteGroup.group[eid] = groupEid;
}

export const hasSpriteGroup = (world, eid) => hasComponent(world, SpriteGroup, eid);

export const withSpriteDepth = (depth) => (world, eid) => {
    addComponent(world, SpriteDepth, eid);

    SpriteDepth.depth[eid] = depth;
}

export const hasSpriteDepth = (world, eid) => hasComponent(world, SpriteDepth, eid);
