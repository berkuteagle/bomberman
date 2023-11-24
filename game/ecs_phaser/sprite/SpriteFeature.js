import { Feature } from '../../ecs.js';
import { GameObjects } from '../../phaser.js';

import SpriteDepthSystem from './SpriteDepthSystem.js';
import SpriteSystem from './SpriteSystem.js';

export default class SpriteFeature extends Feature {

    /**
     * @override
     */
    init() {
        this.ecs.store.register('sprite');

        this.addSystem('sprite', new SpriteSystem(this.ecs));
        this.addSystem('sprite_depth', new SpriteDepthSystem(this.ecs));
    }

    create(x, y, texture, eid) {
        this.ecs.store.setValue(eid, 'sprite', new GameObjects.Sprite(this.ecs.world.scene, x, y, texture));
    }
}
