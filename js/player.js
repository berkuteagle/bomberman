export default class Player {
    constructor(uuid) {
        this.#uuid = uuid;
        this.#number = null;
        this.#state = 'new';
        this.row = 1;
        this.col = 1;
    }

    set number(newValue) {
        if (this.#number === null) {
            this.#number = newValue;
        }
    }

    get number() {
        return this.#number;
    }

    get state() {
        return this.#state;
    }

    set state(newValue) {
        if (newValue === 'ready') {
            this.#state = newValue;
        }
    }

    get ready() {
        return this.#state === 'ready';
    }

    get uuid() {
        return this.#uuid;
    }
}
