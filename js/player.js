const _uuid = Symbol('uuid');
const _number = Symbol('number');
const _state = Symbol('state');

export default class Player {
    constructor(uuid) {
        this[_uuid] = uuid;
        this[_number] = null;
        this[_state] = 'new';
        this.row = 1;
        this.col = 1;
    }

    set number(newValue) {
        if (this[_number] === null) {
            this[_number] = newValue;
        }
    }

    get number() {
        return this[_number];
    }

    set state(newValue) {
        if (newValue === 'ready') {
            this[_state] = newValue;
        }
    }

    get ready() {
        return this[_state] === 'ready';
    }

    get uuid() {
        return this[_uuid];
    }
}
