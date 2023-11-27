import { defineQuery } from '../../bitecs.js';
import {
    withAnimation,
    withSpriteDepth,
    withSpriteTag
} from '../../ecs-phaser.js';
import {
    Position,
    System,
    withPosition,
    withStore
} from '../../ecs.js';
import {
    GameObjects,
    Math
} from '../../phaser.js';
import {
    BombTag,
    PlaceBombRequest
} from './components.js';
import { withBombTag } from './utils.js';

export default class BombRequestsSystem extends System {

    #placeBombQuery;
    #bombsQuery;

    constructor(ecs) {
        super(ecs);

        this.#placeBombQuery = defineQuery([PlaceBombRequest]);
        this.#bombsQuery = defineQuery([BombTag]);
    }

    preUpdate() {
        const { world } = this.ecs;

        for (const request of this.#placeBombQuery(world)) {

            const x = Math.Snap.To(PlaceBombRequest.x[request], 16);
            const y = Math.Snap.To(PlaceBombRequest.y[request], 16);

            if (this.#bombsQuery(world).some(
                bombEid => Position.x[bombEid] === x && Position.y[bombEid] === y
            )) {
                continue;
            }

            const sprite = new GameObjects.Sprite(
                world.scene,
                x, y,
                'Bomb'
            );

            this.ecs.addEntity(
                withSpriteTag(),
                withBombTag(),
                withPosition(x, y),
                withStore({ sprite }),
                withAnimation('Bomb'),
                withSpriteDepth(5)
            );

        }
    }
}