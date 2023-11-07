import { defineComponent, Types } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

export const DirectionType = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

export const Direction = defineComponent({
    dir: Types.ui8
});
