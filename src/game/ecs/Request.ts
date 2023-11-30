import { addComponent, defineComponent } from 'bitecs';

import { WorldEidFunction } from './types';

export const RequestTag = defineComponent();

export function withRequest(): WorldEidFunction {
    return (world, eid) => (addComponent(world, Request, eid), eid);
}
