export default class EventsQueue {
    constructor() {
        this.#buffer = [];
    }

    async *[Symbol.asyncIterator]() {
        while (true) {
            if (this.#buffer.length) {
                yield this.#buffer.shift();
            }
            const event = await new Promise(resolve => { this.#resolver = resolve; });
            yield event;
        }
    }

    emmit(event) {
        if (this.#resolver) {
            this.#resolver(event);
        } else {
            this.#buffer.push(event);
        }
    }
}