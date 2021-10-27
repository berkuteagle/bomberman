import EventsQueue from './eventsQueue.js';
import { argGuard } from './utils.js';

const _events = Symbol('events');
const _all = Symbol('all');
const _names = Symbol('names');

export default class EventsEmitter {
    constructor() {
        this[_events] = new Set();
        this[_names] = new WeakMap();
    }

    getEvents(eventName = argGuard('Event name must be defined!')) {
        const queue = new EventsQueue();

        this[_events].add(queue);
        this[_names].set(queue, eventName)

        return queue;
    }

    get events() {
        return this.getEvents(_all);
    }

    emmit(event) {
        for (const q of this[_events]) {
            const name = this[_names].get(q);
            if (event.name === name || _all === name) {
                q.emmit(event);
            }
        }
    }
}