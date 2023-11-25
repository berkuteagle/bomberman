import { defineComponent, Types } from '../../bitecs.js';

export const ControlTag = defineComponent();

export const ControlKeyDownEvent = defineComponent({
    code: Types.ui16
});

export const ControlKeysState = defineComponent({
    state: Types.ui16
});

export const ControlAnalogState = defineComponent({
    x: Types.f32,
    y: Types.f32
});