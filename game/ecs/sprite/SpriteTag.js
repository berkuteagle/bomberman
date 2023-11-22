import { addComponent, defineComponent, hasComponent } from '../../bitecs.js';
import { GameObjects } from '../../phaser.js';

import { createEntity } from '../common.js';

export const SpriteTag = defineComponent();

export const addSpriteTag = (x, y, texture) => (world, eid) => {
    world.scene.ecs.sprites.add(eid, new GameObjects.Sprite(world.scene, x, y, texture));

    addComponent(world, SpriteTag, eid);
}

export const createSprite = ({ x, y, texture }, ...ext) => createEntity(addSpriteTag(x, y, texture), ...ext);

export const hasSpriteTag = (world, ...eids) => eids.every(eid => hasComponent(world, SpriteTag, eid));
