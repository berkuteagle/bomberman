import { ISceneWorld } from './types';

export type WorldFunction = (world: ISceneWorld, eid: number) => number;

export function chain(...ext: (WorldFunction | null)[]): WorldFunction {
    return (world, eid) => (ext.forEach(link => link?.(world, eid)), eid);
}
