
import { BaseSceneFeature } from '../common.js';

import { createEnterSpriteSystem, createExitSpriteSystem, createSpriteDepthSystem, createSpriteGroupSystem, createSpritePositionSystem, createSpriteSceneSystem } from './system.js';

export default class SpriteSceneFeature extends BaseSceneFeature {

    create() {

        const { groups = [] } = this.config;

        for (const groupKey of groups) {
            const group = this.scene.physics.add.group();

            group.defaults = {
                setCollideWorldBounds: true
            };

            this.scene.ecs.addGroup(groupKey, group);
        }

        this.scene.ecs.addSystem('spriteEnter', createEnterSpriteSystem(), 'preUpdate');

        this.scene.ecs.addSystem('spriteDepth', createSpriteDepthSystem());
        this.scene.ecs.addSystem('sprite', createSpriteSceneSystem());
        this.scene.ecs.addSystem('spriteGroup', createSpriteGroupSystem());
        this.scene.ecs.addSystem('spritePosition', createSpritePositionSystem());

        this.scene.ecs.addSystem('spriteExit', createExitSpriteSystem(), 'postUpdate');

        super.create();
    }

}
