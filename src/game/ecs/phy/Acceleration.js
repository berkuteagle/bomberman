import { defineComponent, Types } from 'bitecs';

export const Acceleration = defineComponent({
    x: Types.f32,
    y: Types.f32,
    max: Types.f32
});
