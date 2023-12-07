import { defineQuery } from 'bitecs'
import { Input } from '../phaser'

import {
  ControlKeyCode,
  ControlKeysState,
  System,
  withControlKeyDownEvent,
  withControlKeyUpEvent,
} from '../../ecs.js'

export default class KeyboardSystem extends System {
  #keys
  #controlKeysState

  constructor(ecs, config = {}) {
    super(ecs)

    const {
      upKeyCode: up = Input.Keyboard.KeyCodes.UP,
      downKeyCode: down = Input.Keyboard.KeyCodes.DOWN,
      leftKeyCode: left = Input.Keyboard.KeyCodes.LEFT,
      rightKeyCode: right = Input.Keyboard.KeyCodes.RIGHT,
      aKeyCode: action = Input.Keyboard.KeyCodes.SPACE,
    } = config

    this.#keys = this.ecs.world.scene.input.keyboard.addKeys({ up, down, left, right, action })

    this.#keys.up.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this)
    this.#keys.down.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this)
    this.#keys.left.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this)
    this.#keys.right.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this)
    this.#keys.action.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this)

    this.#keys.up.on(Input.Keyboard.Events.UP, this.onKeyUp, this)
    this.#keys.down.on(Input.Keyboard.Events.UP, this.onKeyUp, this)
    this.#keys.left.on(Input.Keyboard.Events.UP, this.onKeyUp, this)
    this.#keys.right.on(Input.Keyboard.Events.UP, this.onKeyUp, this)
    this.#keys.action.on(Input.Keyboard.Events.UP, this.onKeyUp, this)

    this.#controlKeysState = defineQuery([ControlKeysState])
  }

  onKeyDown(key) {
    if (key === this.#keys.up) {
      this.ecs.emit(
        withControlKeyDownEvent(ControlKeyCode.BUTTON_UP),
      )
    }
    else if (key === this.#keys.down) {
      this.ecs.emit(
        withControlKeyDownEvent(ControlKeyCode.BUTTON_DOWN),
      )
    }
    else if (key === this.#keys.left) {
      this.ecs.emit(
        withControlKeyDownEvent(ControlKeyCode.BUTTON_LEFT),
      )
    }
    else if (key === this.#keys.right) {
      this.ecs.emit(
        withControlKeyDownEvent(ControlKeyCode.BUTTON_RIGHT),
      )
    }
    else if (key === this.#keys.action) {
      this.ecs.emit(
        withControlKeyDownEvent(ControlKeyCode.BUTTON_A),
      )
    }
  }

  onKeyUp(key) {
    if (key === this.#keys.up) {
      this.ecs.emit(
        withControlKeyUpEvent(ControlKeyCode.BUTTON_UP),
      )
    }
    else if (key === this.#keys.down) {
      this.ecs.emit(
        withControlKeyUpEvent(ControlKeyCode.BUTTON_DOWN),
      )
    }
    else if (key === this.#keys.left) {
      this.ecs.emit(
        withControlKeyUpEvent(ControlKeyCode.BUTTON_LEFT),
      )
    }
    else if (key === this.#keys.right) {
      this.ecs.emit(
        withControlKeyUpEvent(ControlKeyCode.BUTTON_RIGHT),
      )
    }
    else if (key === this.#keys.action) {
      this.ecs.emit(
        withControlKeyUpEvent(ControlKeyCode.BUTTON_A),
      )
    }
  }

  getKeysState() {
    let state = 0

    if (this.#keys.up.isDown)
      state |= ControlKeyCode.BUTTON_UP

    if (this.#keys.down.isDown)
      state |= ControlKeyCode.BUTTON_DOWN

    if (this.#keys.left.isDown)
      state |= ControlKeyCode.BUTTON_LEFT

    if (this.#keys.right.isDown)
      state |= ControlKeyCode.BUTTON_RIGHT

    if (this.#keys.action.isDown)
      state |= ControlKeyCode.BUTTON_A

    return state
  }

  update() {
    const entities = this.#controlKeysState(this.ecs.world)

    if (entities.length) {
      const state = this.getKeysState()

      for (const entity of entities)
        ControlKeysState.state[entity] = state
    }
  }

  destroy() {
    this.#keys.up.off(Input.Keyboard.Events.DOWN, this.onKeyDown)
    this.#keys.down.off(Input.Keyboard.Events.DOWN, this.onKeyDown)
    this.#keys.left.off(Input.Keyboard.Events.DOWN, this.onKeyDown)
    this.#keys.right.off(Input.Keyboard.Events.DOWN, this.onKeyDown)
    this.#keys.action.off(Input.Keyboard.Events.DOWN, this.onKeyDown)
    this.#keys.up.off(Input.Keyboard.Events.UP, this.onKeyUp)
    this.#keys.down.off(Input.Keyboard.Events.UP, this.onKeyUp)
    this.#keys.left.off(Input.Keyboard.Events.UP, this.onKeyUp)
    this.#keys.right.off(Input.Keyboard.Events.UP, this.onKeyUp)
    this.#keys.action.off(Input.Keyboard.Events.UP, this.onKeyUp)
  }
}
