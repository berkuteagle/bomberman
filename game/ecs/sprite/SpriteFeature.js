import SceneFeature from '../SceneFeature.js';

import SpriteDepthSystem from './SpriteDepthSystem.js';
import SpriteGroupSystem from './SpriteGroupSystem.js';
import SpriteSystem from './SpriteSystem.js';

export default class SpriteFeature extends SceneFeature {

    /**
     * @override
     */
    init() {
        this.addSystem('sprite', new SpriteSystem(this.ecs));
        this.addSystem('sprite_depth', new SpriteDepthSystem(this.ecs));
        this.addSystem('sprite_group', new SpriteGroupSystem(this.ecs));
    }

}
