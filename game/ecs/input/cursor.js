import { defineComponent, Types } from '../../bitecs.js';

export const CURSOR_STATE = Object.freeze({
    UP: 1,
    DOWN: 1 << 1,
    LEFT: 1 << 2,
    RIGHT: 1 << 3
})

export const Cursor = defineComponent({
    state: Types.ui8
});
