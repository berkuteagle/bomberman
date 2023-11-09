import {
    defineQuery,
    defineSystem,
    enterQuery,
    exitQuery,
    hasComponent
} from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Player,
    Position,
    Velocity
} from '../component.js';

export const createArcadeSpriteSystem = (animations) => {

    const entriesQueryAll = defineQuery([ArcadeSprite, Position]);
    const entriesQueryEnter = enterQuery(entriesQueryAll);
    const entriesQueryExit = exitQuery(entriesQueryAll);

    return defineSystem(world => {

        const { spriteGroups, spritesMap, texturesMap } = world;

        for (const entry of entriesQueryEnter(world)) {
            const toGroup = spriteGroups.get(ArcadeSprite.group[entry]);
            const texture = texturesMap.get(ArcadeSprite.texture[entry]);
            const sprite = toGroup.get(Position.x[entry], Position.y[entry], texture);

            spritesMap.set(entry, sprite);

            if (hasComponent(world, Player, entry)) {
                sprite.setCircle(5);
                sprite.setOffset(3, 6);
                sprite.setDrag(300, 300);
            }

            sprite.setDepth(ArcadeSprite.depth[entry]);

            // sprite.setImmovable(!hasComponent(world, Velocity, entry));
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

            const fromGroup = spriteGroups.get(ArcadeSprite.group[entry]);

            fromGroup.remove(sprite, true);
            spritesMap.delete(entry);
        }

        return world;
    });
}
