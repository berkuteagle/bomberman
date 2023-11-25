import { defineQuery } from '../../bitecs.js';
import { System, createEvent } from '../../ecs.js';
import { Input } from '../../phaser.js';

import { ControlKeysState } from './components.js';
import { ControlKeyCode } from './enums.js';
import { addControlKeyDownEvent } from './utils.js';

/**
 * Keyboard control configuration
 * @typedef {Object} KeyboardSystemConfig
 * @property {Number} upKeyCode
 * @property {Number} downKeyCode
 * @property {Number} leftKeyCode
 * @property {Number} rightKeyCode
 * @property {Number} actionKeyCode
 */

/**
 * Keyboard control system
 */
export default class KeyboardSystem extends System {

    #keys;
    #controlKeysState;

    /**
     * @param {*} ecs 
     * @param {KeyboardSystemConfig} config 
     */
    constructor(ecs, config = {}) {
        super(ecs);

        const {
            upKeyCode: up = Input.Keyboard.KeyCodes.UP,
            downKeyCode: down = Input.Keyboard.KeyCodes.DOWN,
            leftKeyCode: left = Input.Keyboard.KeyCodes.LEFT,
            rightKeyCode: right = Input.Keyboard.KeyCodes.RIGHT,
            actionKeyCode: action = Input.Keyboard.KeyCodes.SPACE
        } = config;

        this.#keys = this.ecs.world.scene.input.keyboard.addKeys({ up, down, left, right, action });

        this.#keys.up.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this);
        this.#keys.down.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this);
        this.#keys.left.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this);
        this.#keys.right.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this);
        this.#keys.action.on(Input.Keyboard.Events.DOWN, this.onKeyDown, this);

        this.#controlKeysState = defineQuery([ControlKeysState]);
    }

    onKeyDown(key) {
        if (key === this.#keys.up) {
            this.emit(createEvent(addControlKeyDownEvent(ControlKeyCode.UP)));
        } else if (key === this.#keys.down) {
            this.emit(createEvent(addControlKeyDownEvent(ControlKeyCode.DOWN)));
        } else if (key === this.#keys.left) {
            this.emit(createEvent(addControlKeyDownEvent(ControlKeyCode.LEFT)));
        } else if (key === this.#keys.right) {
            this.emit(createEvent(addControlKeyDownEvent(ControlKeyCode.RIGHT)));
        } else if (key === this.#keys.action) {
            this.emit(createEvent(addControlKeyDownEvent(ControlKeyCode.ACTION)));
        }
    }

    getKeysState() {
        let state = 0;

        if (this.#keys.up.isDown) {
            state |= ControlKeyCode.UP;
        }

        if (this.#keys.down.isDown) {
            state |= ControlKeyCode.DOWN;
        }

        if (this.#keys.left.isDown) {
            state |= ControlKeyCode.LEFT;
        }

        if (this.#keys.right.isDown) {
            state |= ControlKeyCode.RIGHT;
        }

        if (this.#keys.action.isDown) {
            state |= ControlKeyCode.ACTION;
        }

        return state;
    }

    preUpdate() {
        const entities = this.#controlKeysState(this.ecs.world);

        if (entities.length) {
            const state = this.getKeysState();

            for (const entity of entities) {
                ControlKeysState.state[entity] = state;
            }
        }

    }

    destroy() {
        this.#keys.up.off(Input.Keyboard.Events.DOWN, this.onKeyDown);
        this.#keys.down.off(Input.Keyboard.Events.DOWN, this.onKeyDown);
        this.#keys.left.off(Input.Keyboard.Events.DOWN, this.onKeyDown);
        this.#keys.right.off(Input.Keyboard.Events.DOWN, this.onKeyDown);
        this.#keys.action.off(Input.Keyboard.Events.DOWN, this.onKeyDown);
    }

}
