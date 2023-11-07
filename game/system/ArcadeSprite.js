import { defineQuery, defineSystem, enterQuery, exitQuery, hasComponent } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Player,
    Position,
    Velocity
} from '../component.js';

export const createArcadeSpriteSystem = (group, staticGroup, textures, animations) => {
    const spritesMap = new Map();

    const entriesQueryAll = defineQuery([ArcadeSprite, Position]);
    const entriesQueryEnter = enterQuery(entriesQueryAll);
    const entriesQueryExit = exitQuery(entriesQueryAll);

    return defineSystem(world => {

        for (const entry of entriesQueryEnter(world)) {
            const toGroup = hasComponent(world, Velocity, entry) ? group : staticGroup;
            const sprite = toGroup.get(Position.x[entry], Position.y[entry], textures[ArcadeSprite.texture[entry]]);

            spritesMap.set(entry, sprite);

            if (hasComponent(world, Player, entry)) {
                sprite.setCircle(5);
                sprite.setOffset(3, 6);
                sprite.setDrag(300, 300);
                sprite.setDepth(10);
            }
        }

        for (const entry of entriesQueryAll(world)) {
            const sprite = spritesMap.get(entry);
            if (!sprite) continue;

            if (hasComponent(world, Velocity, entry)) {
                sprite.setVelocity(
                    Velocity.x[entry],
                    Velocity.y[entry]
                );
            }

            if (hasComponent(world, Animation, entry)) {
                const animationIndex = Animation.animation[entry];
                if (animationIndex) {
                    sprite.play(animations[animationIndex], true);
                } else {
                    sprite.stop();
                }
            }

            Position.x[entry] = sprite.x;
            Position.y[entry] = sprite.y;
        }

        for (const entry of entriesQueryExit(world)) {

            const sprite = spritesMap.get(entry);
            if (!sprite) continue;

            const fromGroup = hasComponent(world, Velocity, entry) ? group : staticGroup;

            fromGroup.killAndHide(sprite);
            spritesMap.delete(entry);
        }

        return world;
    });
}
