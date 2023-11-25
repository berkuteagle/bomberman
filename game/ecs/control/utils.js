import {
    addComponent,
    hasComponent
} from '../../bitecs.js';

import {
    ControlAnalogState,
    ControlKeyDownEvent,
    ControlKeysState,
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

export const withControlKeysState = (state = 0) => (world, eid) => {
    addComponent(world, ControlKeysState, eid);

    ControlKeysState.state[eid] = state;
}

export const withControlAnalogState = (x = 0, y = 0) => (world, eid) => {
    addComponent(world, ControlAnalogState, eid);

    ControlAnalogState.x[eid] = x;
    ControlAnalogState.y[eid] = y;
}
