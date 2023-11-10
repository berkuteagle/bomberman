import { Types, defineComponent } from '../../bitecs.js';

export const MOVEMENT_STATE = Object.freeze({
    STOP: 0,
    WALK: 1,
    SNEAK: 2
});

export const Movement = defineComponent({
    state: Types.ui8
});
