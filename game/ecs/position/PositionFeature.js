import SceneFeature from '../SceneFeature.js';
import PositionSystem from './PositionSystem.js';

export default class PositionFeature extends SceneFeature {

    /**
     * @override
     */
    init() {
        this.addSystem('position', new PositionSystem(this.ecs));
    }

}
