import { Types, addComponent, defineComponent } from 'bitecs';

export const CollisionState = defineComponent({
    state: Types.ui8
});

export const addCollisionState = (state) => (world, eid) => {
    addComponent(world, CollisionState, eid);

    CollisionState.state[eid] = state;
}
