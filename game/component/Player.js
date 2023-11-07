import { defineComponent, Types } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

export const Player = defineComponent({
    walk_up: Types.ui8,
    walk_down: Types.ui8,
    walk_left: Types.ui8,
    walk_right: Types.ui8,
    velocity: Types.ui32
});
