import { defineQuery } from '../../bitecs.js';
import { Input, Math } from '../../phaser.js';

import { createBomb } from '../entity.js';
import Feature from '../feature.js';
import { Position } from '../position.js';

import { Sapper } from './Sapper.js';

export default class SapperFeature extends Feature {

    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Sapper, Position]);
    }

    update() {
        if (Input.Keyboard.JustDown(this.config.bombKey)) {
            for (const entity of this.#allEntities(this.ecs.world)) {
                if (Sapper.count[entity]) {
                    createBomb(
                        this.ecs.world,
                        Math.Snap.To(Position.x[entity], 16),
                        Math.Snap.To(Position.y[entity], 16),
                        entity
                    );
                }
            }
        }
    }

}
