import { addComponent, hasComponent } from '../../bitecs.js';

import { ChangeVelocityRequest, SetVelocityRequest, Velocity, VelocityLimit } from './components.js';

export const withVelocity = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, Velocity, eid);

    Velocity.x[eid] = x;
    Velocity.y[eid] = y;
}

export const hasVelocity = (world, eid) => hasComponent(world, Velocity, eid);

export const hasVelocityLimit = (world, eid) => hasComponent(world, VelocityLimit, eid);

export const withVelocityLimit = max => (world, eid) => {
    addComponent(world, VelocityLimit, eid);

    VelocityLimit.max[eid] = max;
}

export const withSetVelocityRequest = (entity, x, y) => (world, eid) => {
    addComponent(world, SetVelocityRequest, eid);

    SetVelocityRequest.entity[eid] = entity;
    SetVelocityRequest.x[eid] = x;
    SetVelocityRequest.y[eid] = y;
}

export const withChangeVelocityRequest = (entity, dx, dy) => (world, eid) => {
    addComponent(world, ChangeVelocityRequest, eid);

    ChangeVelocityRequest.entity[eid] = entity;
    ChangeVelocityRequest.dx[eid] = dx;
    ChangeVelocityRequest.dy[eid] = dy;
}
