import {
    addComponent,
    defineComponent
} from '../bitecs.js';

export const Store = defineComponent();
export const Event = defineComponent();
export const Request = defineComponent();

export const withStore = (data = {}) => (world, eid) => {
    addComponent(world, Store, eid);

    world[Symbol.for('ecs-data')].set(eid, data);
}

export const withEvent = () => (world, eid) => {
    addComponent(world, Event, eid);
}

export const withRequest = () => (world, eid) => {
    addComponent(world, Request, eid);
}

export const chain = (...ext) => (world, eid) => {
    for (const extFn of ext) {
        if (extFn) {
            extFn(world, eid);
        }
    }

    return eid;
}
