import { defineComponent, Types } from '../../bitecs.js';

export const SHAPE_TYPE = Object.freeze({
    CIRCLE: 0,
    SQUARE: 1
});

export const Shape = defineComponent({
    type: Types.ui8,
    size: Types.f32
});
