import { Types, defineComponent, addComponent } from '../../bitecs.js';

export const Request = defineComponent({
    ttl: Types.i8
});

export const addRequest = (ttl = 1) => (world, eid) => {
    addComponent(world, Request, eid);

    Request.ttl[eid] = ttl;
}
