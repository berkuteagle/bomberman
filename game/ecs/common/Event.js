import { defineComponent, addComponent } from '../../bitecs.js';

export const Event = defineComponent();

export const addEvent = () => (world, eid) => {
    addComponent(world, Event, eid);
}
