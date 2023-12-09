import { Changed, defineQuery } from 'bitecs'
import type { SceneSystem } from '..'
import { animation, direction, joypad, sendRequest, velocity, walking } from '..'
import { PlayerTag } from './Components'

export function joypadControlSystem(): SceneSystem {
  const joypadsQ = defineQuery([Changed(joypad.JoyPadState)])
  const playersQ = defineQuery([PlayerTag, velocity.Velocity])

  return (world) => {
    for (const joy of joypadsQ(world)) {
      const dBad = joypad.JoyPadState.dPad[joy]

      for (const player of playersQ(world)) {
        let dir = null
        let vX = 0
        let vY = 0
        const vMax = velocity.Velocity.max[player]

        if (dBad & joypad.DPAD_MASKS[joypad.DPadButton.Up] && !(dBad & joypad.DPAD_MASKS[joypad.DPadButton.Down])) {
          vY = -vMax
          dir = direction.DirectionValue.Up
        }
        else if (dBad & joypad.DPAD_MASKS[joypad.DPadButton.Down] && !(dBad & joypad.DPAD_MASKS[joypad.DPadButton.Up])) {
          vY = vMax
          dir = direction.DirectionValue.Down
        }

        if (dBad & joypad.DPAD_MASKS[joypad.DPadButton.Left] && !(dBad & joypad.DPAD_MASKS[joypad.DPadButton.Right])) {
          vX = -vMax
          dir = direction.DirectionValue.Left
        }
        else if (dBad & joypad.DPAD_MASKS[joypad.DPadButton.Right] && !(dBad & joypad.DPAD_MASKS[joypad.DPadButton.Left])) {
          vX = vMax
          dir = direction.DirectionValue.Right
        }

        sendRequest(world, velocity.setRequest(player, vX, vY))
        if (direction.Direction.direction[player] !== dir && dir !== null)
          sendRequest(world, direction.setDirection(player, dir))

        if (vX || vY) {
          let anim = null

          switch (dir) {
            case direction.DirectionValue.Up:
              anim = walking.WalkingAnimation.up[player]
              break
            case direction.DirectionValue.Down:
              anim = walking.WalkingAnimation.down[player]
              break
            case direction.DirectionValue.Left:
              anim = walking.WalkingAnimation.left[player]
              break
            case direction.DirectionValue.Right:
              anim = walking.WalkingAnimation.right[player]
              break
          }

          if (animation.Animation.animation[player] !== anim && anim !== null)
            sendRequest(world, animation.playRequest(player, anim))
        }
        else {
          sendRequest(world, animation.stopRequest(player))
        }
      }
    }

    return world
  }
}
