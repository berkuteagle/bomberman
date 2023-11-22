import { Types, addComponent, defineComponent } from '../../bitecs.js';

export const CollisionEntities = defineComponent({
    first: Types.eid,
    second: Types.eid
});

export const addCollisionEntities = (first, second) => (world, eid) => {
    addComponent(world, CollisionEntities, eid);

    CollisionEntities.first[eid] = first;
    CollisionEntities.second[eid] = second;
}
