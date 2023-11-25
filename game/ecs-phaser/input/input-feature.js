import { Feature } from '../../ecs.js';

import GamepadSystem from './gamepad-system.js';
import KeyboardSystem from './keyboard-system.js';
import TouchSystem from './touch-system.js';

/**
 * @typedef {Object} InputFeatureConfig
 * @property {'keyboard'|'gamepad'|'touch'} inputType
 * @property {import('./keyboard-system.js').KeyboardSystemConfig} keyboardConfig
 */

/**
 * @extends Feature<InputFeatureConfig>
 */
export default class InputFeature extends Feature {

    /** @override */
    init() {

        let system;

        switch (this.config.inputType) {
            case 'keyboard':
                system = new KeyboardSystem(this.ecs, this.config.keyboardConfig);
                break;
            case 'touch':
                system = new TouchSystem(this.ecs, this.config.touchConfig);
                break;
            case 'gamepad':
                system = new GamepadSystem(this.ecs, this.config.gamepadConfig);
                break;
        }

        this.addSystem('input', system);
    }

    /** @override */
    static defaultConfig() {
        return { inputType: 'keyboard' };
    }

}
