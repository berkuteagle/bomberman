import { defineComponent, Types } from '../../bitecs.js';

export const ANIMATION_STATE = Object.freeze({
    STOP: 0,
    PLAY: 1,
    FORCE_PLAY: 1 << 2
});

export const Animation = defineComponent({
    key: Types.ui16,
    state: Types.ui8
});
