import { Types, addComponent, defineComponent } from '../../bitecs.js';

export const PositionBoundaries = defineComponent({
    x: [Types.f32, 2],
    y: [Types.f32, 2]
});

export const addPositionBoundaries = (minX, maxX, minY, maxY) => (world, eid) => {
    addComponent(world, PositionBoundaries, eid);

    PositionBoundaries.x[eid] = [minX, maxX];
    PositionBoundaries.y[eid] = [minY, maxY];

    return eid;
}
