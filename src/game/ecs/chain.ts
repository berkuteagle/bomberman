import type { ISceneWorld } from './types'

export type WorldFunction = (world: ISceneWorld, eid: number) => number

export function chain(...ext: (WorldFunction | null)[]): WorldFunction {
  return (world, eid) => {
    ext.forEach(fn => fn?.(world, eid))

    return eid
  }
}
