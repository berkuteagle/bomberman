import Feature from '../feature.js';

import ControlVelocitySystem from './control-velocity-system.js';

import {
    withControlKeysState,
    withControlLeftStickState,
    withControlRightStickState
} from './utils.js';

export default class ControlFeature extends Feature {

    /** @override */
    init() {
        this.addSystem('control-velocity', new ControlVelocitySystem(this.ecs));

        this.ecs.addEntity(
            withControlKeysState(),
            withControlLeftStickState(),
            withControlRightStickState()
        );
    }

}
