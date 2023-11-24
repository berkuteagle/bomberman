import { System } from '../../ecs.js';

/**
 * Keyboard control configuration
 * @typedef {Object} KeyboardSystemConfig
 * @property {Number} upKeyCode
 * @property {Number} downKeyCode
 * @property {Number} leftKeyCode
 * @property {Number} rightKeyCode
 */

/**
 * Keyboard control system
 */
export default class KeyboardSystem extends System {

    /**
     * @param {*} ecs 
     * @param {KeyboardSystemConfig} config 
     */
    constructor(ecs, config) {
        super(ecs);
    }


}
