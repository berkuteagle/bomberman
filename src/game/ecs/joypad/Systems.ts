import { defineQuery } from 'bitecs'
import type { SceneSystem } from '..'
import { JoyPadState } from './Components'
import type { IKeyboardSystemOptions } from './types'
import { DPAD_MASKS, DPadButton } from './types'

export function keyboardSystem(options: IKeyboardSystemOptions): SceneSystem {
  const entitiesQ = defineQuery([JoyPadState])

  return (world) => {
    for (const entity of entitiesQ(world)) {
      let dPad = 0

      if (options.up.isDown)
        dPad |= DPAD_MASKS[DPadButton.Up]
      if (options.down.isDown)
        dPad |= DPAD_MASKS[DPadButton.Down]
      if (options.left.isDown)
        dPad |= DPAD_MASKS[DPadButton.Left]
      if (options.right.isDown)
        dPad |= DPAD_MASKS[DPadButton.Right]

      JoyPadState.dPad[entity] = dPad
    }

    return world
  }
}
