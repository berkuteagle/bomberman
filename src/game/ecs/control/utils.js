import {
  addComponent,
  hasComponent,
} from 'bitecs'

import {
  ControlKeyDownEvent,
  ControlKeyUpEvent,
  ControlKeysState,
  ControlLeftStickState,
  ControlRightStickState,
  ControlTag,
} from './components.js'

export function withControlTag() {
  return (world, eid) => {
    addComponent(world, ControlTag, eid)
  }
}

export const hasControlTag = (world, eid) => hasComponent(world, ControlTag, eid)

export function withControlKeyDownEvent(code) {
  return (world, eid) => {
    addComponent(world, ControlKeyDownEvent, eid)

    ControlKeyDownEvent.code[eid] = code
  }
}

export function withControlKeyUpEvent(code) {
  return (world, eid) => {
    addComponent(world, ControlKeyUpEvent, eid)

    ControlKeyUpEvent.code[eid] = code
  }
}

export function withControlKeysState(state = 0) {
  return (world, eid) => {
    addComponent(world, ControlKeysState, eid)

    ControlKeysState.state[eid] = state
  }
}

export function withControlLeftStickState(x = 0, y = 0) {
  return (world, eid) => {
    addComponent(world, ControlLeftStickState, eid)

    ControlLeftStickState.x[eid] = x
    ControlLeftStickState.y[eid] = y
  }
}

export function withControlRightStickState(x = 0, y = 0) {
  return (world, eid) => {
    addComponent(world, ControlRightStickState, eid)

    ControlRightStickState.x[eid] = x
    ControlRightStickState.y[eid] = y
  }
}
