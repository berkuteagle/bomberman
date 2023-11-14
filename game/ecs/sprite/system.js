import { Not, defineQuery, defineSystem, enterQuery, exitQuery } from '../../bitecs.js';

import { Position } from '../position.js';

import { SpriteDepth } from './SpriteDepth.js';
import { SpriteGroup } from './SpriteGroup.js';
import { SpriteTag } from './SpriteTag.js';

export const createExitSpriteSystem = () => {

    const allEntities = defineQuery([SpriteTag]);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of exitEntities(world)) {
            world.scene.ecs.sprites.destroy(entity);
        }

    });
}

export const createSpritePositionSystem = () => {

    const allEntities = defineQuery([SpriteTag, Position]);

    return defineSystem(world => {

        for (const entity of allEntities(world)) {
            const sprite = world.scene.ecs.sprites.get(entity);
            if (sprite) {
                sprite.x = Position.x[entity];
                sprite.y = Position.y[entity];
            }
        }

    });
}

export const createSpriteDepthSystem = () => {

    const allEntities = defineQuery([SpriteTag, SpriteDepth]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            world.scene.ecs.sprites.get(entity)?.setDepth(SpriteDepth.depth[entity]);
        }

    });
}

export const createSpriteSceneSystem = () => {

    const allEntities = defineQuery([SpriteTag, Not(SpriteGroup)]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            const sprite = world.scene.ecs.sprites.get(entity);

            if (sprite) {
                world.scene.add.existing(sprite);
            }
        }

    });
}

export const createSpriteGroupSystem = () => {

    const allEntities = defineQuery([SpriteTag, SpriteGroup]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            const sprite = world.scene.ecs.sprites.get(entity);
            const group = world.scene.ecs.groups.get(SpriteGroup.key[entity]);

            if (sprite && group) {
                group.add(sprite, true);
            }
        }

    });
}
