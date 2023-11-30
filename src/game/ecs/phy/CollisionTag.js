import { addComponent, defineComponent, hasComponent } from 'bitecs';

export const CollisionTag = defineComponent();

export const addCollisionTag = () => (world, eid) => {
    addComponent(world, CollisionTag, eid);
};

export const hasCollisionTag = (world, ...eids) => eids.every(eid => hasComponent(world, CollisionTag, eid));
