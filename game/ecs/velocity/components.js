import { Types, defineComponent } from '../../bitecs.js';

export const Velocity = defineComponent({
    x: Types.f32,
    y: Types.f32
});

export const VelocityLimit = defineComponent({
    max: Types.f32
});

export const ChangeVelocityRequest = defineComponent({
    entity: Types.eid,
    dx: Types.f32,
    dy: Types.f32
});

export const SetVelocityRequest = defineComponent({
    entity: Types.eid,
    x: Types.f32,
    y: Types.f32
});
