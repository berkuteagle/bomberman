function requiredArgument(name) {
    throw new Error('Required argument: ' + name);
}

export default class BaseSceneFeature {

    #scene;
    #world;
    #config;

    constructor(scene = requiredArgument('scene'), world = requiredArgument('world'), config = {}) {
        this.#scene = scene;
        this.#world = world;
        this.#config = config;
    }

    get config() {
        return this.#config;
    }

    get scene() {
        return this.#scene;
    }

    get world() {
        return this.#world;
    }

    preload() {
    }

    create() {
    }

    update() {
    }

    getTextureIndex() {
    }
}
