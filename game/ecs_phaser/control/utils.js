import { addComponent } from '../../bitecs.js';

import { ControlKeyDownEvent, ControlKeysState, ControlTag } from './components.js';

export const addControlTag = () => (world, eid) => {
    addComponent(world, ControlTag, eid);
}

export const addControlKeyDownEvent = (code) => (world, eid) => {
    addComponent(world, ControlKeyDownEvent, eid);

    ControlKeyDownEvent.code[eid] = code;
}

export const addControlKeysState = (state = 0) => (world, eid) => {
    addComponent(world, ControlKeysState, eid);

    ControlKeysState.state[eid] = state;
}
