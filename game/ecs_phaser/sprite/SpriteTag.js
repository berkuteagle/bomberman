import { addComponent, defineComponent, hasComponent } from '../../bitecs.js';
import { createEntity } from '../../ecs.js';

export const SpriteTag = defineComponent();

export const addSpriteTag = () => (world, eid) => {
    addComponent(world, SpriteTag, eid);
}

export const createSprite = (...ext) => createEntity(addSpriteTag(), ...ext);

export const hasSpriteTag = (world, ...eids) => eids.every(eid => hasComponent(world, SpriteTag, eid));
