import { Types, addComponent, defineComponent } from '../../bitecs.js';

export const SpriteGroup = defineComponent({
    key: Types.ui16
});

export const addSpriteGroup = (groupName) => (world, eid) => {
    const { scene: { ecs } } = world;

    addComponent(world, SpriteGroup, eid);
    SpriteGroup.key[eid] = ecs.groups.getIndex(groupName);
}
