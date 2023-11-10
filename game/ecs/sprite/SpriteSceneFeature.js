import { pipe } from '../../bitecs.js';

import { BaseSceneFeature } from '../common.js';

import { createEnterSpriteSystem, createExitSpriteSystem, createSpriteDepthSystem, createSpriteGroupSystem, createSpriteSceneSystem } from './system.js';

export default class SpriteSceneFeature extends BaseSceneFeature {

    #spritesMap = new Map();
    #groupsMap = new Map();
    #texturesMap = new Map();
    #system = null;

    get spritesMap() {
        return this.#spritesMap;
    }

    get texturesMap() {
        return this.#texturesMap;
    }

    get groupsMap() {
        return this.#groupsMap;
    }

    preload() {

        const { spritesheets = [], defaultConfig = {} } = this.config;

        spritesheets.forEach(({ key, path, config = {} }, idx) => {
            this.#texturesMap.set(idx, key);
            this.scene.load.spritesheet(
                key,
                path,
                {
                    ...defaultConfig,
                    ...config
                }
            );
        });

        super.preload();
    }

    create() {

        const { groups = [] } = this.config;

        groups.forEach((_, idx) => {
            this.#groupsMap.set(idx, this.scene.physics.add.group());
        });

        this.#system = pipe(
            createEnterSpriteSystem(this.scene, this.#spritesMap, this.#texturesMap),
            createSpriteDepthSystem(this.#spritesMap),
            createSpriteSceneSystem(this.scene, this.#spritesMap),
            createSpriteGroupSystem(this.#spritesMap, this.#texturesMap),
            createExitSpriteSystem(this.#spritesMap)
        );

        super.create();
    }

    update() {

        this.#system?.(this.world);

        super.update();
    }
}
