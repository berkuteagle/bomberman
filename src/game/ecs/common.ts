import { addComponent, defineComponent, IWorld } from 'bitecs';

export const Store = defineComponent();
export const Event = defineComponent();
export const Request = defineComponent();

export interface W extends IWorld {
    [key: symbol]: Map<number, any>;
}

export type WorldFn = (world: IWorld, eid: number) => void;

export const withStore = (data = {}) => (world: W, eid: number) => {
    addComponent(world, Store, eid);

    world[Symbol.for('ecs-data')].set(eid, data);
}

export const withEvent = () => (world: IWorld, eid: number) => {
    addComponent(world, Event, eid);
}

export const withRequest = () => (world: IWorld, eid: number) => {
    addComponent(world, Request, eid);
}

export const chain = (...ext: WorldFn[]): WorldFn => (world: IWorld, eid: number) => {
    for (const extFn of ext) {
        if (extFn) {
            extFn(world, eid);
        }
    }

    return eid;
}
