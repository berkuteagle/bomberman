import SceneFeature from '../SceneFeature.js';

import SpriteSystem from './SpriteSystem.js';
import SpriteDepthSystem from './SpriteDepthSystem.js';
import SpriteGroupSystem from './SpriteGroupSystem.js';

export default class SpriteFeature extends SceneFeature {

    #spriteSystem = null;
    #spriteDepthSystem = null;
    #spriteGroupSystem = null;

    init() {
        this.#spriteSystem = new SpriteSystem(this.ecs);
        this.#spriteDepthSystem = new SpriteDepthSystem(this.ecs);
        this.#spriteGroupSystem = new SpriteGroupSystem(this.ecs);
    }

    /**
     * @override
     */
    preUpdate(time, delta) {
        this.#spriteSystem?.preUpdate(time, delta);
        this.#spriteDepthSystem?.preUpdate(time, delta);
        this.#spriteGroupSystem?.preUpdate(time, delta);
    }

    /**
     * @override
     */
    update(time, delta) {
        this.#spriteSystem?.update(time, delta);
        this.#spriteDepthSystem?.update(time, delta);
        this.#spriteGroupSystem?.update(time, delta);

    }

    /**
     * @override
     */
    postUpdate(time, delta) {
        this.#spriteSystem?.postUpdate(time, delta);
        this.#spriteDepthSystem?.postUpdate(time, delta);
        this.#spriteGroupSystem?.postUpdate(time, delta);
    }
}
