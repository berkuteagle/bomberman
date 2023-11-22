import { Types, addComponent, defineComponent } from '../../bitecs.js';

export const Position = defineComponent({
    x: Types.f32,
    y: Types.f32
});

export const addPosition = (x, y) => (world, eid) => {
    addComponent(world, Position, eid);

    Position.x[eid] = x;
    Position.y[eid] = y;
}
