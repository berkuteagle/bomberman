export { Request } from './common/Request.js';
import { Types } from '../bitecs.js';

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
