import { defineComponent, Types } from '../../bitecs.js';

export const DIRECTION = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

export const Direction = defineComponent({
    current: Types.ui8
});
