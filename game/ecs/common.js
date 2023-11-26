import { addComponent, addEntity, defineComponent, Types } from '../bitecs.js';

export const Store = defineComponent();

export const Event = defineComponent();

export const Request = defineComponent({
    ttl: Types.i8
});

export const withStore = (data = {}) => (world, eid) => {
    addComponent(world, Store, eid);

    world[Symbol.for('ecs-store')].set(eid, data);
}

export const withEvent = () => (world, eid) => {
    addComponent(world, Event, eid);
}

export const withRequest = (ttl = 1) => (world, eid) => {
    addComponent(world, Request, eid);

    Request.ttl[eid] = ttl;
}

export const createEntity = (...ext) => world => {
    const eid = addEntity(world);

    for (const fn of ext) {
        if (fn) {
            fn(world, eid);
        }
    }

    return eid;
}
