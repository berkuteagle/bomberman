import { addComponent, defineComponent } from '../../bitecs.js';
import { GameObjects } from '../../phaser.js';

import { createEntity } from '../common.js';
import { addSpriteDepth } from './SpriteDepth.js';
import { addSpriteGroup } from './SpriteGroup.js';

export const SpriteTag = defineComponent();

export const addSpriteTag = () => (world, eid) => {
    addComponent(world, SpriteTag, eid);
}

export const createSprite = ({ x, y, texture }, ...subs) => world => {
    const { scene } = world;

    const eid = createEntity(
        addSpriteTag(),
        ...subs
    )(world);

    scene.ecs.sprites.add(eid, new GameObjects.Sprite(scene, x, y, texture));

    return eid;
}
