import {
    addComponent,
    hasComponent
} from 'bitecs';

import { DirectionValue } from './enum.js';

import {
    Direction,
    SetDirectionRequest
} from './component.js';

export const withDirection = (direction = DirectionValue.DOWN) => (world, eid) => {
    addComponent(world, Direction, eid);

    Direction.direction[eid] = direction;
}

export const hasDirection = (world, eid) => hasComponent(world, Direction, eid);

export const withSetDirectionRequest = (entity, direction = DirectionValue.DOWN) => (world, eid) => {
    addComponent(world, SetDirectionRequest, eid);

    SetDirectionRequest.entity[eid] = entity;
    SetDirectionRequest.direction[eid] = direction;
}
