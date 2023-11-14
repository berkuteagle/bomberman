import { Types, addComponent, addEntity, defineComponent } from '../../bitecs.js';
import { Request } from '../common.js';

export const AnimationRequest = defineComponent({
    key: Types.ui16,
    state: Types.ui8,
    sprite: Types.eid
});

export function sendAnimationRequest(world, key, state, entity) {
    const request = addEntity(world);

    addComponent(world, AnimationRequest, request);
    addComponent(world, Request, request);

    AnimationRequest.key[request] = key;
    AnimationRequest.state[request] = state;
    AnimationRequest.sprite[request] = entity;
    Request.ttl[request] = 1;
}
