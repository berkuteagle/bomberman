import { Query, addComponent, defineQuery, enterQuery, hasComponent } from 'bitecs';
import { ISceneSystem, ISceneWorld, WorldEidFunction, vec2 } from '../index';
import { Velocity, VelocityRequest, VelocityRequestType } from './Components';

export default class RequestSystem implements ISceneSystem {

    #requestsQuery: Query<ISceneWorld>;

    constructor() {
        this.#requestsQuery = enterQuery(defineQuery([VelocityRequest]));
    }

    preUpdate(world: ISceneWorld): void {
        this.#requestsQuery(world).forEach(request => {

            const entity = VelocityRequest.eid[request];

            if (!hasComponent(world, Velocity, entity)) {
                return;
            }

            switch (VelocityRequest.type[request] as VelocityRequestType) {
                case VelocityRequestType.Set:
                    vec2.copy(Velocity.vec2[entity], VelocityRequest.vec2[request]);
                    break;
                case VelocityRequestType.Add:
                    vec2.add(Velocity.vec2[entity], VelocityRequest.vec2[request]);
                    break;
            }

            vec2.clampLength(Velocity.vec2[entity], Velocity.max[entity]);
        });
    }
}

export function setRequest(entity: number, x: number, y: number): WorldEidFunction {
    return (world, eid) => {

        addComponent(world, VelocityRequest, eid);

        VelocityRequest.type[eid] = VelocityRequestType.Set;
        VelocityRequest.eid[eid] = entity;
        vec2.set(VelocityRequest.vec2[eid], x, y);

        return eid;
    };
}

export function addRequest(entity: number, dx: number, dy: number): WorldEidFunction {
    return (world, eid) => {

        addComponent(world, VelocityRequest, eid);

        VelocityRequest.type[eid] = VelocityRequestType.Add;
        VelocityRequest.eid[eid] = entity;
        vec2.set(VelocityRequest.vec2[eid], dx, dy);

        return eid;
    };
}
