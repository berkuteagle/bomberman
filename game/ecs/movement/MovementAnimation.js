import { Types, defineComponent, addComponent } from '../../bitecs.js';

export const MovementAnimation = defineComponent({
    up: Types.ui8,
    down: Types.ui8,
    left: Types.ui8,
    right: Types.ui8
});

export const addMovementAnimation = (up, down, left, right) => (world, eid) => {
    addComponent(world, MovementAnimation, eid);
    MovementAnimation.up[eid] = up;
    MovementAnimation.down[eid] = down;
    MovementAnimation.left[eid] = left;
    MovementAnimation.right[eid] = right;
}
