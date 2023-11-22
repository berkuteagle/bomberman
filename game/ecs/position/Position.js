import { Types, addComponent, defineComponent } from '../../bitecs.js';

export const Position = defineComponent({
    x: Types.f32,
    y: Types.f32
});

export const setPosition = (x = 0, y = 0, eid) => {
    Position.x[eid] = x;
    Position.y[eid] = y;
}

export const addPosition = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, Position, eid);
    setPosition(x, y, eid);
}
