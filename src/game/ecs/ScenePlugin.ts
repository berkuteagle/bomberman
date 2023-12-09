import type {
  Deserializer,
  Query,
  Serializer,
} from 'bitecs'

import {
  DESERIALIZE_MODE,
  addEntity,
  createWorld,
  defineDeserializer,
  defineQuery,
  defineSerializer,
  defineSystem,
  deleteWorld,
  enterQuery,
  removeComponent,
  removeEntity,
  removeQuery,
} from 'bitecs'

import { Plugins, Scenes } from 'phaser'
import type { ISceneWorld, SceneSystem, WorldEidFunction } from './types'

import { EventTag, withEvent } from './Event'
import { RequestTag, withRequest } from './Request'
import Store from './Store'
import { SyncTag } from './Sync'
import { chain } from './chain'
import { PlayerTag } from './player'

export default class ScenePlugin extends Plugins.ScenePlugin {
  #world!: ISceneWorld

  #pre_systems: Set<SceneSystem> = new Set()
  #update_systems: Set<SceneSystem> = new Set()
  #post_systems: Set<SceneSystem> = new Set()

  #events: Set<WorldEidFunction> = new Set()
  #requests: Set<WorldEidFunction> = new Set()

  #exitDataQuery: Query<ISceneWorld> | null = null
  #eventsQuery: Query<ISceneWorld> | null = null
  #requestsQuery: Query<ISceneWorld> | null = null

  #serializer: Serializer<ISceneWorld> | null = null
  #deserializer: Deserializer<ISceneWorld> | null = null

  #syncQuery: Query<ISceneWorld> | null = null
  #out_sync_resolver: Function | null = null
  #in_sync_packets: Set<ArrayBuffer> = new Set()

  #destroyed: boolean = false

  async *outSync(): AsyncGenerator<{ sync?: ArrayBuffer, requests?: ArrayBuffer }> {
    while (!this.#destroyed) {
      yield new Promise<{ sync?: ArrayBuffer, requests?: ArrayBuffer }>((resolve) => {
        this.#out_sync_resolver = resolve
      })
    }
  }

  inSync({ sync }: { sync?: ArrayBuffer }): void {
    if (sync?.byteLength)
      this.#in_sync_packets.add(sync)
  }

  definePreSystems(...fns: SceneSystem[]): void {
    fns.forEach(fn => this.#pre_systems.add(defineSystem(fn)))
  }

  defineUpdateSystems(...fns: SceneSystem[]): void {
    fns.forEach(fn => this.#update_systems.add(defineSystem(fn)))
  }

  definePostSystems(...fns: SceneSystem[]): void {
    fns.forEach(fn => this.#post_systems.add(defineSystem(fn)))
  }

  preUpdate(time: number, delta: number): void {
    this.#out_sync_resolver?.({
      sync: this.#serializer!(this.#syncQuery!(this.#world)),
    })

    if (this.#in_sync_packets.size) {
      const in_sync_packets = Array.from(this.#in_sync_packets)
      this.#in_sync_packets.clear()

      for (const packet of in_sync_packets) {
        for (const entity of this.#deserializer!(this.#world, packet, DESERIALIZE_MODE.MAP)) {
          removeComponent(this.#world, SyncTag, entity)
          removeComponent(this.#world, PlayerTag, entity)
        }
      }
    }

    for (const systemFn of this.#pre_systems)
      systemFn(this.#world, time, delta)
  }

  update(time: number, delta: number): void {
    for (const systemFn of this.#update_systems)
      systemFn(this.#world, time, delta)
  }

  postUpdate(time: number, delta: number): void {
    for (const entity of (this.#eventsQuery?.(this.#world)) || [])
      removeEntity(this.#world, entity)

    for (const entity of (this.#requestsQuery?.(this.#world)) || [])
      removeEntity(this.#world, entity)

    for (const systemFn of this.#post_systems)
      systemFn(this.#world, time, delta)

    for (const requestFn of this.#requests)
      this.addEntity(requestFn)

    for (const eventFn of this.#events)
      this.addEntity(eventFn)

    this.#events.clear()
    this.#requests.clear()
  }

  addEntity(...ext: (WorldEidFunction | null)[]): number {
    return chain(...ext)(this.#world, addEntity(this.#world))
  }

  removeEntity(eid: number): void {
    removeEntity(this.#world, eid)
  }

  emit(...ext: (WorldEidFunction | null)[]): void {
    if (ext.length)
      this.#events.add(chain(withEvent(), ...ext))
  }

  request(...ext: (WorldEidFunction | null)[]): void {
    if (ext.length)
      this.#requests.add(chain(withRequest(), ...ext))
  }

  boot() {
    this.#world = createWorld<ISceneWorld>({
      scene: this.scene!,
      store: new Store(),
    })

    this.#serializer = defineSerializer(this.#world)
    this.#deserializer = defineDeserializer(this.#world)

    this.#syncQuery = defineQuery([SyncTag])
    this.#eventsQuery = defineQuery([EventTag])
    this.#requestsQuery = defineQuery([RequestTag])

    this.scene!.events.on(Scenes.Events.PRE_UPDATE, this.preUpdate, this)
    this.scene!.events.on(Scenes.Events.UPDATE, this.update, this)
    this.scene!.events.on(Scenes.Events.POST_UPDATE, this.postUpdate, this)
  }

  destroy() {
    this.scene!.events.off(Scenes.Events.PRE_UPDATE, this.preUpdate)
    this.scene!.events.off(Scenes.Events.UPDATE, this.update)
    this.scene!.events.off(Scenes.Events.POST_UPDATE, this.postUpdate)

    this.#pre_systems.clear()
    this.#update_systems.clear()
    this.#post_systems.clear()

    this.#events.clear()
    this.#requests.clear()

    removeQuery(this.#world, this.#eventsQuery!)
    removeQuery(this.#world, this.#requestsQuery!)
    removeQuery(this.#world, this.#exitDataQuery!)

    deleteWorld(this.#world)
  }
}
