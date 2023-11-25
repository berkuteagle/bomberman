import {
    createEvent,
    createRequest
} from './common.js';

/**
 * Base Feature class
 * @template TConfig
 */
export default class Feature {

    /** @type {import('../ecs.js').ECS} */
    #ecs;
    /** @type {TConfig} */
    #config;
    /** @type {Map<String, import('./system.js').default>} */
    #systems = new Map();
    /** @type {Set<String>} */
    #enabledSystems = new Set();

    #events = new Set();

    /**
     * @param {import('../ecs.js').ECS} ecs - ECS instance
     * @param {TConfig} config - Feature configuration
     */
    constructor(ecs, config = {}) {
        this.#ecs = ecs;
        this.#config = config;
    }

    /**
     * @returns {import('../ecs.js').ECS}
     */
    get ecs() {
        return this.#ecs;
    }

    get config() {
        return this.#config;
    }

    get systems() {
        return this.#systems;
    }

    /**
     * Add system to feature
     * @param {String} key
     * @param {*} system
     */
    addSystem(key, system) {
        this.#systems.set(key, system);
        this.#enabledSystems.add(key);
    }

    /**
     * Remove system from feature
     * @param {String} key
     */
    removeSystem(key) {
        this.#systems.delete(key);
        this.#enabledSystems.delete(key);
    }

    disableSystem(key) {
        this.#enabledSystems.delete(key);
    }

    enableSystem(key) {
        if (this.#systems.has(key)) {
            this.#enabledSystems.add(key);
        }
    }

    init() { }

    destroy() {
        for (const system of this.#systems) {
            system.destroy();
        }
    }

    emit(...ext) {
        if (ext.length) {
            this.#events.add(
                createEvent(...ext)
            );
        }
    }

    request(ttl, ...ext) {
        if (ttl && ext.length) {
            this.#events.add(
                createRequest(ttl, ...ext)
            );
        }
    }

    processEvents() {
        if (this.#events.size) {
            for (const eventFn of this.#events) {
                eventFn(this.ecs.world);
            }
            this.#events.clear();
        }

        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey).processEvents();
        }
    }

    /**
     * 
     * @param {*} time 
     * @param {*} delta 
     */
    preUpdate(time, delta) {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey).preUpdate(time, delta);
        }
    }

    /**
     * 
     * @param {*} time 
     * @param {*} delta 
     */
    update(time, delta) {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey).update(time, delta);
        }
    }

    /**
     * 
     * @param {*} time 
     * @param {*} delta 
     */
    postUpdate(time, delta) {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey).postUpdate(time, delta);
        }
    }

    static defaultConfig() {
        return {};
    }
}
