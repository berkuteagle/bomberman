export default class Data {
  #fieldEntityData = new Map()
  #entityFields = new Map()
  #weak = new WeakMap()

  destroy() {
    this.#fieldEntityData.clear()
    this.#entityFields.clear()
  }

  unset(eid: number, field?: string): void {
    if (field) {
      if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid)) {
        this.#fieldEntityData.get(field).delete(eid)
        this.#entityFields.get(eid).delete(field)
      }
    }
    else {
      if (this.#entityFields.has(eid)) {
        for (const field of this.#entityFields.get(eid))
          this.#fieldEntityData.get(field).delete(eid)

        this.#entityFields.delete(eid)
      }
    }
  }

  set<V>(eid: number, field: string | Record<string, any>, value: V): void {
    if (typeof field === 'string') {
      if (!this.#fieldEntityData.has(field))
        this.#fieldEntityData.set(field, new Map())

      if (!this.#entityFields.has(eid))
        this.#entityFields.set(eid, new Set())

      this.#entityFields.get(eid).add(field)
      this.#fieldEntityData.get(field).set(eid, value)
    }
    else if (typeof field === 'object') {
      for (const [k, v] of Object.entries(field))
        this.set(eid, k, v)
    }
  }

  get<V>(eid: number, field?: string): V | void | Record<string, V> {
    if (field) {
      if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid) && this.#entityFields.get(eid).has(field))
        return this.#fieldEntityData.get(field).get(eid)
    }
    else {
      if (this.#entityFields.has(eid)) {
        const result = {} as Record<string, V>
        for (const field of this.#entityFields.get(eid))
          result[field] = this.#fieldEntityData.get(field).get(eid)

        return result
      }
    }
  }

  setEid<T extends object>(object: T, eid: number): void {
    this.#weak.set(object, eid)
  }

  getEid<T extends object>(object: T): number | void {
    return this.#weak.get(object)
  }
}
