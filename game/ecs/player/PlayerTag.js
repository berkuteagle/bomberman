import { defineComponent, addComponent } from '../../bitecs.js';

export const PlayerTag = defineComponent();

export const addPlayerTag = () => (world, eid) => {
    addComponent(world, PlayerTag, eid);
}
