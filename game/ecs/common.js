import { addEntity } from '../bitecs.js';

import { addRequest } from './common/Request.js';
import { addEvent } from './common/Event.js';

export { Event } from './common/Event.js';
export { Request } from './common/Request.js';

export const createEntity = (...ext) => world => {
    const eid = addEntity(world);

    for (const fn of ext) {
        fn(world, eid);
    }

    return eid;
}

export const createRequest = (ttl, ...ext) => createEntity(addRequest(ttl), ...ext);

export const createEvent = (...ext) => createEntity(addEvent(), ...ext);
