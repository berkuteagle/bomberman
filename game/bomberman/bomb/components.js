import { defineComponent, Types } from '../../bitecs.js';

export const BombTag = defineComponent();

export const PlaceBombRequest = defineComponent({
    x: Types.f32,
    y: Types.f32
});
