import { addComponent, hasComponent } from '../../bitecs.js';

import { BombTag, PlaceBombRequest } from './components.js';

export const withBombTag = () => (world, eid) => {
    addComponent(world, BombTag, eid);
};

export const hasBombTag = (world, eid) => hasComponent(world, BombTag, eid);

export const withPlaceBombRequest = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, PlaceBombRequest, eid);

    PlaceBombRequest.x[eid] = x;
    PlaceBombRequest.y[eid] = y;
};
