import {
    Feature,
    withPosition,
    withStore
} from '../../ecs.js';

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

}
