import { Feature } from '../../ecs.js';
import { GameObjects } from '../../phaser.js';

import SpriteDepthSystem from './SpriteDepthSystem.js';
import SpriteSystem from './SpriteSystem.js';
import { addSpriteTag } from './SpriteTag.js';

export default class SpriteFeature extends Feature {

    /**
     * @override
     */
    init() {
        this.ecs.store.register('sprite');

        this.addSystem('sprite', new SpriteSystem(this.ecs));
        this.addSystem('sprite_depth', new SpriteDepthSystem(this.ecs));
    }

    addSpriteTag() {
        return addSpriteTag();
    }

    create(x, y, texture, ...ext) {
        const eid = this.ecs.getFeature('position').create(
            x, y,
            addSpriteTag(),
            ...ext
        );

        this.ecs.store.setValue(
            eid,
            'sprite',
            new GameObjects.Sprite(this.ecs.world.scene, x, y, texture)
        );

        return eid;
    }
}
