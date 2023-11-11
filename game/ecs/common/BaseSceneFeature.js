function requiredArgument(name) {
    throw new Error('Required argument: ' + name);
}

export default class BaseSceneFeature {

    #scene;
    #config;

    constructor(scene = requiredArgument('scene'), config = {}) {
        this.#scene = scene;
        this.#config = config;
    }

    get config() {
        return this.#config;
    }

    get scene() {
        return this.#scene;
    }

    preload() {
    }

    create() {
    }

    update() {
    }

}
