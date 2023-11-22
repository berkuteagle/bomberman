export { Event } from './common/Event.js';
export { Request } from './common/Request.js';
import { Types, addEntity } from '../bitecs.js';

export const Vector = {
    x: Types.f32,
    y: Types.f32
};

export function pickVectorXY(Component, entity) {
    return {
        x: Component.x[entity],
        y: Component.y[entity]
    };
}

export const createEntity = (...subs) => world => {
    const eid = addEntity(world);

    for (const sub of subs) {
        sub(world, eid);
    }

    return eid;
}
