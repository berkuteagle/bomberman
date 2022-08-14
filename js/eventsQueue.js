export default class EventsQueue {
    
    #buffer = [];
    #resolver;

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