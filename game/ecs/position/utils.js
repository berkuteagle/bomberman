import { addComponent, hasComponent } from '../../bitecs.js';

import { createRequest } from '../common.js';

import { ChangePositionRequest, Position, PositionLimits, SetPositionRequest } from './components.js';

export const addPosition = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, Position, eid);

    Position.x[eid] = x;
    Position.y[eid] = y;
}

export const hasPosition = (world, eid) => hasComponent(world, Position, eid);

export const hasPositionLimits = (world, eid) => hasComponent(world, PositionLimits, eid);

export const addPositionLimits = (minX, maxX, minY, maxY) => (world, eid) => {
    addComponent(world, PositionLimits, eid);

    PositionLimits.minX[eid] = minX;
    PositionLimits.maxX[eid] = maxX;
    PositionLimits.minY[eid] = minY;
    PositionLimits.maxY[eid] = maxY;
}

export const addSetPositionRequest = (entity, x, y) => (world, eid) => {
    addComponent(world, SetPositionRequest, eid);

    SetPositionRequest.entity[eid] = entity;
    SetPositionRequest.x[eid] = x;
    SetPositionRequest.y[eid] = y;
}

export const createSetPositionRequest = (entity, x, y) => createRequest(1, addSetPositionRequest(entity, x, y));

export const addChangePositionRequest = (entity, dx, dy) => (world, eid) => {
    addComponent(world, ChangePositionRequest, eid);

    ChangePositionRequest.entity[eid] = entity;
    ChangePositionRequest.dx[eid] = dx;
    ChangePositionRequest.dy[eid] = dy;
}

export const createChangePositionRequest = (entity, dx, dy) => createRequest(1, addChangePositionRequest(entity, dx, dy));
