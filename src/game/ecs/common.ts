import { addComponent, defineComponent, IWorld } from 'bitecs';

export type WithComponentFn<W extends IWorld> = (world: W, eid: number) => number;

export const DataTag = defineComponent();
export const EventTag = defineComponent();
export const RequestTag = defineComponent();

export function withData<W extends IWorld>(): WithComponentFn<W> {
    return (world: W, eid: number) => (addComponent(world, DataTag, eid), eid);
}

export function withEvent<W extends IWorld>(): WithComponentFn<W> {
    return (world: W, eid: number) => (addComponent(world, Event, eid), eid);
}

export function withRequest<W extends IWorld>(): WithComponentFn<W> {
    return (world: W, eid: number) => (addComponent(world, Request, eid), eid);
}

export function chain<W extends IWorld>(...ext: (WithComponentFn<W> | null)[]): WithComponentFn<W> {
    return (world: W, eid: number) => (ext.forEach(withComponentFn => withComponentFn?.(world, eid)), eid);
}
