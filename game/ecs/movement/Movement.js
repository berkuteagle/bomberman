import { Types, defineComponent } from '../../bitecs.js';

export const MOVEMENT_STATE = Object.freeze({
    STOP: 0,
    WALK: 1,
    SNEAK: 2
});

export const MOVEMENT_DIRECTION = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

export const Movement = defineComponent({
    state: Types.ui8,
    direction: Types.ui8
});
