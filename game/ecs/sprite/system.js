import { Not, defineQuery, defineSystem, enterQuery, exitQuery, hasComponent } from '../../bitecs.js';

import { Position } from '../common.js';

import { Sprite } from './Sprite.js';
import { SpriteDepth } from './SpriteDepth.js';
import { SpriteGroup } from './SpriteGroup.js';

export const createEnterSpriteSystem = () => {

    const allEntities = defineQuery([Sprite, Position]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {

            const sprite = hasComponent(world, SpriteGroup, entity)
                ? world.scene.ecs.getGroup(SpriteGroup.key[entity]).create(
                    Position.x[entity],
                    Position.y[entity],
                    world.scene.ecs.getTextureKey(Sprite.texture[entity])
                )
                : world.scene.physics.add.sprite(
                    Position.x[entity],
                    Position.y[entity],
                    world.scene.ecs.getTextureKey(Sprite.texture[entity])
                );

            world.scene.ecs.addSprite(entity, sprite);

        }

    });
}

export const createExitSpriteSystem = () => {

    const allEntities = defineQuery([Sprite]);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of exitEntities(world)) {
            world.scene.ecs.removeSprite(entity);
        }

    });
}

export const createSpritePositionSystem = () => {

    const allEntities = defineQuery([Sprite, Position]);

    return defineSystem(world => {

        for (const entity of allEntities(world)) {
            const sprite = world.scene.ecs.getSprite(entity);
            Position.x[entity] = sprite.x;
            Position.y[entity] = sprite.y;
        }

    });
}

export const createSpriteDepthSystem = () => {

    const allEntities = defineQuery([Sprite, SpriteDepth]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            world.scene.ecs.getSprite(entity)?.setDepth(SpriteDepth.depth[entity]);
        }

    });
}

export const createSpriteSceneSystem = () => {

    const allEntities = defineQuery([Sprite, Not(SpriteGroup)]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            world.scene.add.existing(world.scene.ecs.getSprite(entity));
        }

    });
}

export const createSpriteGroupSystem = () => {

    const allEntities = defineQuery([Sprite, SpriteGroup]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            world.scene.ecs.getGroup(SpriteGroup.key[entity]).add(world.scene.ecs.getSprite(entity));
        }

    });
}
