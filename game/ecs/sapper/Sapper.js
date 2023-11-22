import { defineComponent, Types, addComponent } from '../../bitecs.js';

import { ExplosionType } from '../component.js';

export const Sapper = defineComponent({
    count: Types.ui8,
    power: Types.ui8,
    type: Types.ui8
});

export const addSapper = ({ count = 3, power = 1, type = ExplosionType.DEFAULT } = {}) => (world, eid) => {
    addComponent(world, Sapper, eid);
    Sapper.count[eid] = count;
    Sapper.power[eid] = power;
    Sapper.type[eid] = type;
}
