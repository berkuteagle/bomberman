import ECS from './ECS';

/**
 * Base System class
 */
export default class System {

    #ecs: ECS;

    constructor(ecs: ECS) {
        this.#ecs = ecs;
    }

    get ecs(): ECS {
        return this.#ecs;
    }

    preUpdate(_time: number, _delta: number) { }

    update(_time: number, _delta: number) { }

    postUpdate(_time: number, _delta: number) { }

    destroy() { }

}
