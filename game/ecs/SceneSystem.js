/**
 * 
 */
export default class SceneSystem {

    #ecs;

    /**
     * @param {*} ecs
     */
    constructor(ecs) {
        this.#ecs = ecs;
    }

    get ecs() {
        return this.#ecs;
    }

    /**
     * 
     * @param {Number} time - Time from game start
     * @param {Number} delta - Time from previous frame
     */
    preUpdate(time, delta) { }

    /**
     * 
     * @param {Number} time - Time from game start
     * @param {Number} delta - Time from previous frame
     */
    update(time, delta) { }

    /**
     * 
     * @param {Number} time - Time from game start
     * @param {Number} delta - Time from previous frame
     */
    postUpdate(time, delta) { }

}
