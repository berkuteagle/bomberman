import { Feature } from '../../ecs.js';

import ControlSystem from './control-system.js';
import GamepadSystem from './gamepad-system.js';
import KeyboardSystem from './keyboard-system.js';
import TouchSystem from './touch-system.js';

import { addControlKeysState, addControlTag } from './utils.js';

/**
 * @typedef {Object} ControlFeatureConfig
 * @property {import('./keyboard-system.js').KeyboardSystemConfig} keyboardConfig
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

        this.addSystem('control-type', system);
        this.addSystem('control', new ControlSystem(this.ecs));

        this.ecs.addEntity(addControlKeysState());
    }

    addControlTag() {
        return addControlTag();
    }

    /** @override */
    static defaultConfig() {
        return { controlType: 'keyboard' };
    }

}
