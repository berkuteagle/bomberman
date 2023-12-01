import { Types, addComponent, defineComponent } from 'bitecs';
import { WorldEidFunction, vec2 } from '../index';

export enum VelocityRequestType {
    Set = 0,
    Add = 1
};


export const Velocity = defineComponent({
    vec2: [Types.f32, 2],
    max: Types.f32
});

export function withVelocity(x: number, y: number, max: number): WorldEidFunction {
    return (world, eid) => {
        addComponent(world, Velocity, eid);

        vec2.set(Velocity.vec2[eid], x, y);
        Velocity.max[eid] = max;

        return eid;
    };
}


export const VelocityRequest = defineComponent({
    eid: Types.eid,
    vec2: [Types.f32, 2],
    type: Types.ui8
});
