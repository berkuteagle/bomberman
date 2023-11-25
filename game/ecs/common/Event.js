import { addComponent, defineComponent } from '../../bitecs.js';

export const Event = defineComponent();

export const withEvent = () => (world, eid) => {
    addComponent(world, Event, eid);
}
