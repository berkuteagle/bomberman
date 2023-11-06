import { defineQuery, defineSystem, enterQuery, exitQuery } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { Sprite } from '../component/ArcadeSprite.js';
import { Position } from '../component/Position.js';

export const createSpriteSystem = (scene, textures) => {
    const spritesMap = new Map();

    const entriesQueryAll = defineQuery([Sprite, Position]);
    const entriesQueryEnter = enterQuery(entriesQueryAll);
    const entriesQueryExit = exitQuery(entriesQueryAll);

    return defineSystem(world => {

        for (const entry of entriesQueryEnter(world)) {
            spritesMap.set(entry, scene.add.sprite(0, 0, textures[Sprite.texture[entry]]));
        }

        for (const entry of entriesQueryAll(world)) {
            const sprite = spritesMap.get(entry);
            if (!sprite) continue;
            sprite.x = Position.x[entry];
            sprite.y = Position.y[entry];
        }

        for (const entry of entriesQueryExit(world)) {
            const sprite = spritesMap.get(entry);
            if (!sprite) continue;
            sprite.destroy();
            spritesMap.delete(entry);
        }

        return world;
    });
}
