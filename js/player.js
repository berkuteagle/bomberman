export default class Player {

    #uuid;
    #number = null;
    #state = 'new';

    constructor(uuid) {
        this.#uuid = uuid;
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
