export default class SceneFeature {

    #ecs;
    #config;
    #systems;
    #enabledSystems;

    /**
     * 
     * @param {*} ecs 
     * @param {*} config 
     */
    constructor(ecs, config = {}) {
        this.#ecs = ecs;
        this.#config = config;
        this.#systems = new Map();
        this.#enabledSystems = new Set();
    }

    get ecs() {
        return this.#ecs;
    }

    get config() {
        return this.#config;
    }

    get systems() {
        return this.#systems;
    }

    addSystem(key, system) {
        this.#systems.set(key, system);
        this.#enabledSystems.add(key);
    }

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

    /**
     * 
     */
    init() { }

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
