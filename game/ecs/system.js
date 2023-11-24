/**
 * Base System class
 */
export default class System {

    /** @type {import('../ecs.js').ECS} */
    #ecs;

    /**
     * @param {import('../ecs.js').ECS} ecs - ECS instance
     */
    constructor(ecs) {
        this.#ecs = ecs;
    }

    /**
     * @returns {import('../ecs.js').ECS}
     */
    get ecs() {
        return this.#ecs;
    }

    /**
     * @param {Number} time - Time from game start
     * @param {Number} delta - Time from previous frame
     */
    preUpdate(time, delta) { }

    /**
     * @param {Number} time - Time from game start
     * @param {Number} delta - Time from previous frame
     */
    update(time, delta) { }

    /**
     * @param {Number} time - Time from game start
     * @param {Number} delta - Time from previous frame
     */
    postUpdate(time, delta) { }

}
