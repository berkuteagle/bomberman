export default class Store {

    #fieldEntityData = new Map();
    #entityFields = new Map();

    destroy() {
        this.#fieldEntityData.clear();
        this.#entityFields.clear();
    }

    registerField(field) {
        if (!this.#fieldEntityData.has(field)) {
            this.#fieldEntityData.set(field, new Map());
        }
    }

    removeFields(eid) {
        if (this.#entityFields.has(eid)) {
            for (const field of this.#entityFields.get(eid)) {
                this.#fieldEntityData.get(field).delete(eid);
            }
            this.#entityFields.delete(eid);
        }
    }

    addField(eid, field) {
        if (this.#fieldEntityData.has(field)) {
            if (!this.#entityFields.has(eid)) {
                this.#entityFields.set(eid, new Set());
            }

            this.#entityFields.get(eid).add(field);
        }
    }

    removeField(eid, field) {
        if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid)) {
            this.#fieldEntityData.get(field).delete(eid);
            this.#entityFields.get(eid).delete(field);
        }
    }

    setValue(eid, field, value) {
        if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid)) {
            this.#fieldEntityData.get(field).set(eid, value);
        }
    }

    getValue(eid, field) {
        if (this.#fieldEntityData.has(field) && this.#entityFields.has(eid) && this.#entityFields.get(eid).has(field)) {
            return this.#fieldEntityData.get(field).get(eid);
        }
    }

    setData(eid, data) {
        for (const field of Object.keys(data)) {
            this.setValue(eid, field, data[field]);
        }
    }

    getData(eid) {
        if (this.#entityFields.has(eid)) {
            let result = {};
            for (const field of this.#entityFields.get(eid)) {
                result[field] = this.#fieldEntityData.get(field).get(eid);
            }
        }
    }

}
