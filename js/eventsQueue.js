const _resolver = Symbol('resolver');
const _buffer = Symbol('buffer');

export default class EventsQueue {
    constructor() {
        this[_buffer] = [];
    }

    async *[Symbol.asyncIterator]() {
        while (true) {
            if (this[_buffer].length) {
                yield this[_buffer].shift();
            }
            const event = await new Promise(resolve => { this[_resolver] = resolve; });
            yield event;
        }
    }

    emmit(event) {
        if (this[_resolver]) {
            this[_resolver](event);
        } else {
            this[_buffer].push(event);
        }
    }
}