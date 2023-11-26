import { defineComponent, Types } from '../../bitecs.js';

export const Direction = defineComponent({
    direction: Types.ui8
});

export const SetDirectionRequest = defineComponent({
    entity: Types.eid,
    direction: Types.eid
});
