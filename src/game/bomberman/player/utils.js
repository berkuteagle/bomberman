import { addComponent, hasComponent } from 'bitecs';

import { PlayerTag } from './components.js';

export const withPlayerTag = () => (world, eid) => {
    addComponent(world, PlayerTag, eid);
}

export const hasPlayerTag = (world, eid) => hasComponent(world, PlayerTag, eid);