import { Feature } from '../../ecs.js';
import { GameObjects } from '../../phaser.js';

import { withSpriteTag } from './utils.js';

import SpriteDepthSystem from './sprite-depth-system.js';
import SpriteSystem from './sprite-system.js';

export default class SpriteFeature extends Feature {

    /**
     * @override
     */
    init() {
        this.ecs.store.register('sprite');

        this.addSystem('sprite', new SpriteSystem(this.ecs));
        this.addSystem('sprite-depth', new SpriteDepthSystem(this.ecs));
    }

    create(x, y, texture, ...ext) {
        return this.ecs.getFeature('position').create(
            x, y,
            withSpriteTag(),
            (_, eid) => this.ecs.store.setValue(eid, 'sprite', new GameObjects.Sprite(this.ecs.world.scene, x, y, texture)),
            ...ext
        );
    }
}
