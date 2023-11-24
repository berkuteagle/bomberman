import { Types, addComponent, defineComponent } from '../../bitecs.js';

export const SpriteGroup = defineComponent({
    key: Types.ui16
});

export const addSpriteGroup = (groupEid) => (world, eid) => {
    addComponent(world, SpriteGroup, eid);

    SpriteGroup.group[eid] = groupEid;
}
