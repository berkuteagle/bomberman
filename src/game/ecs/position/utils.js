import { addComponent, hasComponent } from 'bitecs';

import { ChangePositionRequest, Position, PositionLimits, SetPositionRequest } from './components.js';

export const withPosition = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, Position, eid);

    Position.x[eid] = x;
    Position.y[eid] = y;
}

export const hasPosition = (world, eid) => hasComponent(world, Position, eid);

export const hasPositionLimits = (world, eid) => hasComponent(world, PositionLimits, eid);

export const withPositionLimits = (minX, maxX, minY, maxY) => (world, eid) => {
    addComponent(world, PositionLimits, eid);

    PositionLimits.minX[eid] = minX;
    PositionLimits.maxX[eid] = maxX;
    PositionLimits.minY[eid] = minY;
    PositionLimits.maxY[eid] = maxY;
}

export const withSetPositionRequest = (entity, x, y) => (world, eid) => {
    addComponent(world, SetPositionRequest, eid);

    SetPositionRequest.entity[eid] = entity;
    SetPositionRequest.x[eid] = x;
    SetPositionRequest.y[eid] = y;
}

export const withChangePositionRequest = (entity, dx, dy) => (world, eid) => {
    addComponent(world, ChangePositionRequest, eid);

    ChangePositionRequest.entity[eid] = entity;
    ChangePositionRequest.dx[eid] = dx;
    ChangePositionRequest.dy[eid] = dy;
}
