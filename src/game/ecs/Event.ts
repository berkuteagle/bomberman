import { addComponent, defineComponent } from 'bitecs';
import { WorldEidFunction } from './types';

export const EventTag = defineComponent();

export function withEvent(): WorldEidFunction {
    return (world, eid) => (addComponent(world, EventTag, eid), eid);
}
