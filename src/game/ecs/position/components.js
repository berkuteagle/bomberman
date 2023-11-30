import { Types, defineComponent } from 'bitecs';

export const Position = defineComponent({
    x: Types.f32,
    y: Types.f32
});

export const PositionLimits = defineComponent({
    minX: Types.f32,
    maxX: Types.f32,
    minY: Types.f32,
    maxY: Types.f32
});

export const ChangePositionRequest = defineComponent({
    entity: Types.eid,
    dx: Types.f32,
    dy: Types.f32
});

export const SetPositionRequest = defineComponent({
    entity: Types.eid,
    x: Types.f32,
    y: Types.f32
});
