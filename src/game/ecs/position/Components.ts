import { Types, addComponent, defineComponent } from 'bitecs';
import { WorldEidFunction, mat2, vec2 } from '../index';

export enum PositionRequestType {
    Set = 0,
    Add = 1
};


export const Position = defineComponent({
    vec2: [Types.f32, 2]
});

export function withPosition(x: number, y: number): WorldEidFunction {
    return (world, eid) => {
        addComponent(world, Position, eid);

        vec2.set(Position.vec2[eid], x, y);

        return eid;
    }
}


export const PositionRequest = defineComponent({
    eid: Types.eid,
    vec2: [Types.f32, 2],
    type: Types.ui8
});


export const PositionLimits = defineComponent({
    mat2: [Types.f32, 4]
});

export function withPositionLimits(x1: number, y1: number, x2: number, y2: number): WorldEidFunction {
    return (world, eid) => {
        addComponent(world, PositionLimits, eid);

        mat2.set(PositionLimits.mat2[eid], x1, y1, x2, y2);

        return eid;
    }
}
