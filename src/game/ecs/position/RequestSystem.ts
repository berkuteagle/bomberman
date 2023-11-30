import { Query, addComponent, defineQuery, enterQuery, hasComponent } from 'bitecs';
import { ISceneSystem, ISceneWorld, WorldEidFunction, vec2 } from '../index';
import { Position, PositionRequest, PositionRequestType } from './Components';

export default class RequestSystem implements ISceneSystem {

    #requestsQuery: Query<ISceneWorld>;

    constructor() {
        this.#requestsQuery = enterQuery(defineQuery([PositionRequest]));
    }

    preUpdate(world: ISceneWorld): void {
        this.#requestsQuery(world).forEach(request => {

            const entity = PositionRequest.eid[request];

            if (!hasComponent(world, Position, entity)) {
                return;
            }

            switch (PositionRequest.type[request] as PositionRequestType) {
                case PositionRequestType.Set:
                    vec2.copy(Position.vec2[entity], PositionRequest.vec2[request]);
                    break;
                case PositionRequestType.Add:
                    vec2.add(Position.vec2[entity], PositionRequest.vec2[request]);
                    break;
            }
        });
    }
}

export function setRequest(entity: number, x: number, y: number): WorldEidFunction {
    return (world, eid) => {

        addComponent(world, PositionRequest, eid);

        PositionRequest.type[eid] = PositionRequestType.Set;
        PositionRequest.eid[eid] = entity;
        vec2.set(PositionRequest.vec2[eid], x, y);

        return eid;
    };
}

export function addRequest(entity: number, dx: number, dy: number): WorldEidFunction {
    return (world, eid) => {

        addComponent(world, PositionRequest, eid);

        PositionRequest.type[eid] = PositionRequestType.Add;
        PositionRequest.eid[eid] = entity;
        vec2.set(PositionRequest.vec2[eid], dx, dy);

        return eid;
    };
}
