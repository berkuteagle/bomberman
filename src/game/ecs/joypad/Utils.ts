import type { Vec2 } from '..'

export interface IJoyPadState {
  leftStick: Vec2
  rightStick: Vec2
  dPad: number
  buttons: number
  extraButtons: number
}

export enum DPadButton {
  Up = 0,
  Down,
  Left,
  Right,
}

export enum Button {
  A = 0,
  B,
  X,
  Y,
  Menu,
}

export enum ExtraButton {
  LTShift = 0,
  LBShift,
  LStick,
  RTShift,
  RBShift,
  RStick,
}

export const DPAD_MASKS = [
  1 << DPadButton.Up,
  1 << DPadButton.Down,
  1 << DPadButton.Left,
  1 << DPadButton.Right,
]

export const BUTTONS_MASKS = [
  1 << Button.A,
  1 << Button.B,
  1 << Button.X,
  1 << Button.Y,
  1 << Button.Menu,
]

export const EXTRA_BUTTONS_MASKS = [
  1 << ExtraButton.LTShift,
  1 << ExtraButton.LBShift,
  1 << ExtraButton.LStick,
  1 << ExtraButton.RTShift,
  1 << ExtraButton.RBShift,
  1 << ExtraButton.RStick,
]
