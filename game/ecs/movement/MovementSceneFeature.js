import { pipe } from '../../bitecs.js';

import { BaseSceneFeature } from '../common.js';

import { createMovementAnimationSystem, createMovementSystem } from './system.js';

export default class MovementSceneFeature extends BaseSceneFeature {

    #system = null;

    create() {

        const { spritesMap } = this.config;

        this.#system = pipe(
            createMovementSystem(spritesMap),
            createMovementAnimationSystem()
        );

        super.create();
    }

    update(...args) {
        this.#system?.(this.world);

        super.update(...args);
    }
}
