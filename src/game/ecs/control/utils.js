import {
    addComponent,
    hasComponent
} from 'bitecs';

import {
    ControlKeyDownEvent,
    ControlKeyUpEvent,
    ControlKeysState,
    ControlLeftStickState,
    ControlRightStickState,
    ControlTag
} from './components.js';

export const withControlTag = () => (world, eid) => {
    addComponent(world, ControlTag, eid);
}

export const hasControlTag = (world, eid) => hasComponent(world, ControlTag, eid);

export const withControlKeyDownEvent = (code) => (world, eid) => {
    addComponent(world, ControlKeyDownEvent, eid);

    ControlKeyDownEvent.code[eid] = code;
}

export const withControlKeyUpEvent = (code) => (world, eid) => {
    addComponent(world, ControlKeyUpEvent, eid);

    ControlKeyUpEvent.code[eid] = code;
}

export const withControlKeysState = (state = 0) => (world, eid) => {
    addComponent(world, ControlKeysState, eid);

    ControlKeysState.state[eid] = state;
}

export const withControlLeftStickState = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, ControlLeftStickState, eid);

    ControlLeftStickState.x[eid] = x;
    ControlLeftStickState.y[eid] = y;
}

export const withControlRightStickState = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, ControlRightStickState, eid);

    ControlRightStickState.x[eid] = x;
    ControlRightStickState.y[eid] = y;
}
