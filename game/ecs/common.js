import { addEntity } from '../bitecs.js';

import { withEvent } from './common/Event.js';
import { withRequest } from './common/Request.js';

export { Event } from './common/Event.js';
export { Request } from './common/Request.js';

export const createEntity = (...ext) => world => {
    const eid = addEntity(world);

    for (const fn of ext) {
        if (fn) {
            fn(world, eid);
        }
    }

    return eid;
}

export const createRequest = (ttl, ...ext) => createEntity(withRequest(ttl), ...ext);

export const createEvent = (...ext) => createEntity(withEvent(), ...ext);
