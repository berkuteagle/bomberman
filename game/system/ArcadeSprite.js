import { defineQuery, defineSystem, enterQuery, exitQuery, hasComponent } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { ArcadeSprite } from '../component/ArcadeSprite.js';
import { Player } from '../component/Player.js';
import { Position } from '../component/Position.js';
import { Velocity } from '../component/Velocity.js';

export const createArcadeSpriteSystem = (group, staticGroup, textures) => {
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
            if (hasComponent(world, Velocity, entry)) {
                const sprite = spritesMap.get(entry);
                if (!sprite) continue;

                sprite.setVelocity(Velocity.x[entry], Velocity.y[entry]);
            }
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
