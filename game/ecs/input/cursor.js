import { defineComponent, Types } from '../../bitecs.js';

export const CURSOR = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

export const CURSOR_MASK = Object.freeze({
    UP: 1 << CURSOR.UP,
    DOWN: 1 << CURSOR.DOWN,
    LEFT: 1 << CURSOR.LEFT,
    RIGHT: 1 << CURSOR.RIGHT
})

export const Cursor = defineComponent({
    state: Types.ui8
});
