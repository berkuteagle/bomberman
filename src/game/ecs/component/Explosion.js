import { defineComponent, Types } from 'bitecs';

export const ExplosionType = Object.freeze({
    DEFAULT: 0,
    CIRCLE: 1,
    FIREBALS: 2
});

export const Explosion = defineComponent({
    power: Types.ui8,
    type: Types.ui8
});
