import Feature from '../feature.js';
import PositionSystem from './PositionSystem.js';

export default class PositionFeature extends Feature {

    /**
     * @override
     */
    init() {
        this.addSystem('position', new PositionSystem(this.ecs));
    }

}
