import { Types, addComponent, defineComponent } from 'bitecs';
import { WorldEidFunction } from '../index';

export const Sprite = defineComponent({
    depth: Types.ui8
});

export function withSprite(depth: number): WorldEidFunction {
    return (world, eid) => {
        addComponent(world, Sprite, eid);

        Sprite.depth[eid] = depth;

        return eid;
    }
}
