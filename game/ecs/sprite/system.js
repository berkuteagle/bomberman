import { defineQuery, defineSystem, enterQuery, exitQuery, Not } from '../../bitecs.js';
import { Physics } from '../../phaser.js';

import { Position } from '../common.js';

import { Sprite } from './Sprite.js';
import { SpriteDepth } from './SpriteDepth.js';
import { SpriteGroup } from './SpriteGroup.js';

export const createEnterSpriteSystem = (scene, spritesMap, texturesMap) => {

    const allEntities = defineQuery([Sprite, Position]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            spritesMap.set(
                entity,
                scene.physics.world.enableBody(
                    new Physics.Arcade.Sprite(
                        scene,
                        Position.x[entity],
                        Position.y[entity],
                        texturesMap.get(Sprite.key[entity])
                    )
                )
            );
        }

    });
}

export const createExitSpriteSystem = (spritesMap) => {

    const allEntities = defineQuery([Sprite, Position]);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of exitEntities(world)) {
            spritesMap.get(entity).destroy();
            spritesMap.delete(entity);
        }

    });
}

export const createSpriteDepthSystem = (spritesMap) => {
    const allEntities = defineQuery([Sprite, SpriteDepth]);
    const enterEntities = enterQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            spritesMap.get(entity)?.setDepth(SpriteDepth.depth[entity]);
        }

    });
}

export const createSpriteSceneSystem = (scene, spritesMap) => {

    const allEntities = defineQuery([Sprite, Not(SpriteGroup)]);
    const enterEntities = enterQuery(allEntities);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            scene.add.existing(spritesMap.get(entity));
        }

        for (const entity of exitEntities(world)) {
            spritesMap.get(entity).setActive(false).setVisible(false);
        }

    });
}

export const createSpriteGroupSystem = (spritesMap, groupsMap) => {

    const allEntities = defineQuery([Sprite, SpriteGroup]);
    const enterEntities = enterQuery(allEntities);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            groupsMap.get(SpriteGroup.key[entity]).add(spritesMap.get(entity));
        }

        for (const entity of exitEntities(world)) {
            groupsMap.get(SpriteGroup.key[entity]).remove(spritesMap.get(entity));
        }

    });
}
