import SceneFeature from '../SceneFeature.js';
import GamepadSystem from './GamepadSystem.js';
import KeyboardSystem from './KeyboardSystem.js';
import TouchSystem from './TouchSystem.js';

export default class ControlFeature extends SceneFeature {

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

    static defaultConfig() {
        return { controlType: 'keyboard' };
    }

}
