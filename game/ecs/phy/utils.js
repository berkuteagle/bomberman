import { addComponent, addEntity, hasComponent } from '../../bitecs.js';

import { Collision } from './Collision.js';
import { CollisionEntities } from './CollisionEntities.js';
import { CollisionTag } from './CollisionTag.js';

export function createCollision(world, eid0, eid1) {

    if (hasComponent(world, CollisionTag, eid0) && hasComponent(world, CollisionTag, eid1)) {
        const collision = addEntity(world);

        addComponent(world, Collision, collision);
        addComponent(world, CollisionEntities, collision);

        CollisionEntities.entities[collision] = [eid0, eid1];
        Collision.state[collision] = 0;
    }

}
