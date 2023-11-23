import { Feature } from '../../ecs.js';

import GamepadSystem from './gamepad_system.js';
import KeyboardSystem from './keyboard_system.js';
import TouchSystem from './touch_system.js';

/**
 * @typedef {Object} ControlFeatureConfig
 * @property {import('./keyboard_system.js').KeyboardSystemConfig} keyboardConfig
 */

/**
 * @extends Feature<ControlFeatureConfig>
 */
export default class ControlFeature extends Feature {

    /** @override */
    init() {

        let system;

        switch (this.config.controlType) {
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

        this.addSystem('control', system);
    }

    /** @override */
    static defaultConfig() {
        return { controlType: 'keyboard' };
    }

}
