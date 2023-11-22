import { createEntity } from '../common.js';

import { addCollisionEntities } from './CollisionEntities.js';
import { addCollisionState } from './CollisionState.js';

export const createCollision = (firstEid, secondEid) => createEntity(
    addCollisionState(0),
    addCollisionEntities(firstEid, secondEid)
);
