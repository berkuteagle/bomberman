import { defineComponent, Types } from '../../bitecs.js';

export const PositionBoundaries = defineComponent({
    x: [Types.f32, 2],
    y: [Types.f32, 2]
});
