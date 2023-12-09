import { Types, addComponent, defineComponent } from 'bitecs'
import type { WorldEidFunction } from '..'
import { vec2 } from '..'
import type { IJoyPadState } from './Utils'

export const JoyPadState = defineComponent({
  leftStick: [Types.f32, 2],
  rightStick: [Types.f32, 2],
  dPad: Types.ui8,
  buttons: Types.ui8,
  extraButtons: Types.ui8,
})

export function withJoyPadState(state: IJoyPadState): WorldEidFunction {
  return (world, eid) => {
    addComponent(world, JoyPadState, eid)

    const {
      buttons,
      dPad,
      extraButtons,
      leftStick,
      rightStick,
    } = state

    JoyPadState.buttons[eid] = buttons
    JoyPadState.dPad[eid] = dPad
    JoyPadState.extraButtons[eid] = extraButtons

    vec2.copy(JoyPadState.leftStick[eid], leftStick)
    vec2.copy(JoyPadState.rightStick[eid], rightStick)

    return eid
  }
}
