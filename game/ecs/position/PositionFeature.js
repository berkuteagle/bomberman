import SceneFeature from '../SceneFeature.js';
import PositionSystem from './PositionSystem.js';

export default class PositionFeature extends SceneFeature {

    #positionSystem = null;

    /**
     * @override
     */
    init() {
        this.#positionSystem = new PositionSystem(this.ecs);
    }

    /**
     * @override
     */
    update(time, delta) {
        this.#positionSystem.update(time, delta);
    }

}
