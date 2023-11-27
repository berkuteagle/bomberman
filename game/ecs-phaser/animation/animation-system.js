import {
    defineQuery,
    enterQuery,
    exitQuery
} from '../../bitecs.js';
import { System } from '../../ecs.js';
import { hasSpriteTag } from '../sprite.js';
import { AnimationTag } from './components.js';

export default class AnimationSystem extends System {

    #enterAnimationQuery;
    #exitAnimationQuery;

    constructor(ecs) {
        super(ecs);

        this.#enterAnimationQuery = enterQuery(defineQuery([AnimationTag]));
        this.#exitAnimationQuery = exitQuery(defineQuery([AnimationTag]));
    }

    update() {
        const { store, world } = this.ecs;

        for (const entity of this.#enterAnimationQuery(world)) {
            if (hasSpriteTag(world, entity)) {
                const sprite = store.get(entity, 'sprite');
                const animation = store.get(entity, 'animation');

                if (sprite && animation) {
                    sprite.play(animation);
                }
            }
        }

        for (const entity of this.#exitAnimationQuery(world)) {
            if (hasSpriteTag(world, entity)) {
                const sprite = store.get(entity, 'sprite');

                if (sprite) {
                    sprite.stop();
                }
            }
        }
    }
}
