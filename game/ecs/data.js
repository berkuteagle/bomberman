export default class Data {

    #fieldEntityData = new Map();
    #entityFields = new Map();

    destroy() {
        this.#fieldEntityData.clear();
        this.#entityFields.clear();
    }

    register(field) {
        if (!this.#fieldEntityData.has(field)) {
            this.#fieldEntityData.set(field, new Map());
        }
    }

    unset(eid, field) {
        if (field) {
            if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid)) {
                this.#fieldEntityData.get(field).delete(eid);
                this.#entityFields.get(eid).delete(field);
            }
        } else {
            if (this.#entityFields.has(eid)) {
                for (const field of this.#entityFields.get(eid)) {
                    this.#fieldEntityData.get(field).delete(eid);
                }
                this.#entityFields.delete(eid);
            }
        }
    }

    set(eid, field, value) {
        if (typeof field === 'string') {
            if (this.#fieldEntityData.has(field)) {
                if (!this.#entityFields.has(eid)) {
                    this.#entityFields.set(eid, new Set());
                }

                this.#entityFields.get(eid).add(field);
            }

            if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid)) {
                this.#fieldEntityData.get(field).set(eid, value);
            }
        } else if (typeof field === 'object') {
            for (const [k, v] of Object.entries(field)) {
                this.set(eid, k, v);
            }
        }
    }

    get(eid, field) {
        if (field) {
            if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid) && this.#entityFields.get(eid).has(field)) {
                return this.#fieldEntityData.get(field).get(eid);
            }
        } else {
            if (this.#entityFields.has(eid)) {
                let result = {};
                for (const field of this.#entityFields.get(eid)) {
                    result[field] = this.#fieldEntityData.get(field).get(eid);
                }
                return result;
            }
        }
    }

}
