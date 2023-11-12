export default class SceneFeature {

    #ecs;
    #config;

    /**
     * 
     * @param {*} scene 
     * @param {*} ecs 
     * @param {*} config 
     */
    constructor(ecs, config = {}) {
        this.#ecs = ecs;
        this.#config = config;
    }

    get ecs() {
        return this.#ecs;
    }

    get config() {
        return this.#config;
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
    preUpdate(time, delta) { }

    /**
     * 
     * @param {*} time 
     * @param {*} delta 
     */
    update(time, delta) { }

    /**
     * 
     * @param {*} time 
     * @param {*} delta 
     */
    postUpdate(time, delta) { }

    static defaultConfig() {
        return {};
    }
}