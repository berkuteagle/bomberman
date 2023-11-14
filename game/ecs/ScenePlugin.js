import { createWorld } from '../bitecs.js';
import { Animations, GameObjects, Plugins, Scenes, Textures } from '../phaser.js';

class EntityObjectStore {

    #store = new Map();
    #storeIndex = new Map();

    getKey(index) {
        return this.#store.get(index)[0];
    }

    get(index) {
        return this.#store.get(index)[1];
    }

    getIndex(key) {
        return this.#storeIndex.get(key);
    }

    add(key, object) {
        const index = this.#storeIndex.size;

        this.#store.set(index, [key, object]);
        this.#storeIndex.set(key, index);

        return index;
    }

}

class EntityGroupStore {

    #groups = new Map();
    #groupsIndex = new Map();
    #scene;

    constructor(scene) {
        this.#scene = scene;
    }

    getName(index) {
        return this.#groups.get(index)[0];
    }

    get(index) {
        return this.#groups.get(index)[1];
    }

    getIndex(name) {
        return this.#groupsIndex.has(name)
            ? this.#groupsIndex.get(name)
            : this.create(name);
    }

    create(name) {
        const index = this.#groups.size;
        const group = this.#scene.add.group({ name, runChildUpdate: true });

        this.#groups.set(index, [name, group]);
        this.#groupsIndex.set(name, index);

        return index;
    }
}

class EntitySpriteStore {

    #sprites = new Map();
    #spritesIndex = new Map();
    #scene;

    constructor(scene) {
        this.#scene = scene;
    }

    get(entity) {
        return this.#sprites.get(entity);
    }

    getEntity(sprite) {
        return this.#spritesIndex.get(sprite);
    }

    create(entity, x, y, texture) {
        const sprite = new GameObjects.Sprite(this.#scene, x, y, texture);

        this.#sprites.set(entity, sprite);
        this.#spritesIndex.set(sprite, entity);
    }

    destroy(entity) {
        const sprite = this.#sprites.get(entity);

        if (sprite) {
            this.#spritesIndex.delete(sprite);
            this.#sprites.delete(entity);

            sprite.destroy();
        }

    }
}

export default class SceneWorldPlugin extends Plugins.ScenePlugin {

    #world;
    #features = new Map();
    #enabledFeatures = new Set();
    #systems = new Map();
    #enabledSystems = new Set();

    #anims = new EntityObjectStore();
    #textures = new EntityObjectStore();
    #groups;
    #sprites;

    constructor(scene, pluginManager) {

        super(scene, pluginManager);

        this.#groups = new EntityGroupStore(scene);
        this.#sprites = new EntitySpriteStore(scene);

        this.#world = createWorld({ scene });

    }

    boot() {

        this.scene.events.on(Scenes.Events.UPDATE, this.#updateScene, this);
        this.scene.events.on(Scenes.Events.ADDED_TO_SCENE, this.#addGameObject, this);
        this.scene.events.on(Scenes.Events.REMOVED_FROM_SCENE, this.#removeGameObject, this);
        this.scene.textures.on(Textures.Events.ADD, this.#addTexture, this);
        this.scene.anims.on(Animations.Events.ADD_ANIMATION, this.#addAnimation, this);

    }

    destroy() {

        this.scene.events.off(Scenes.Events.UPDATE, this.#updateScene);
        this.scene.events.off(Scenes.Events.ADDED_TO_SCENE, this.#addGameObject);
        this.scene.events.off(Scenes.Events.REMOVED_FROM_SCENE, this.#removeGameObject);
        this.scene.textures.off(Textures.Events.ADD, this.#addTexture);
        this.scene.anims.off(Animations.Events.ADD_ANIMATION, this.#addAnimation);

    }

    #updateScene(time, delta) {

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).preUpdate(time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).update(time, delta);
        }

        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey)(this.#world, time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).postUpdate(time, delta);
        }
    }

    #addTexture(key, texture) {
        this.#textures.add(key, texture);
    }

    #addAnimation(key, animation) {
        this.#anims.add(key, animation);
    }

    #addGameObject(gameObject) {

        switch (gameObject.type) {
            case 'TilemapLayer':
                break;
            case 'Text':
                break;
            case 'Sprite':
                break;
            default:
                console.log(gameObject.type);
        }

    }

    #removeGameObject(gameObject) {

        switch (gameObject.type) {
            case 'TilemapLayer':
                break;
            case 'Text':
                break;
            case 'Sprite':
                break;
            default:
                console.log(gameObject.type);
        }

    }

    addFeature(featureKey, FeatureClass, config = {}) {
        const feature = new FeatureClass(this, {
            ...FeatureClass.defaultConfig(),
            ...config
        });

        feature.init();

        this.#features.set(featureKey, feature);
        this.#enabledFeatures.add(featureKey);
    }

    disableFeature(featureKey) {
        this.#enabledFeatures.delete(featureKey);
    }

    enableFeature(featureKey) {
        if (this.#features.has(featureKey)) {
            this.#enabledFeatures.add(featureKey);
        }
    }

    removeFeature(featureKey) {
        if (this.#features.has(featureKey)) {
            this.#enabledFeatures.delete(featureKey);
            this.#features.delete(featureKey);
        }
    }

    addSystem(systemKey, systemFn) {
        this.#systems.set(systemKey, systemFn);
        this.#enabledSystems.add(systemKey);
    }

    disableSystem(systemKey) {
        this.#enabledSystems.delete(systemKey);
    }

    enableSystem(systemKey) {
        if (this.#systems.has(systemKey)) {
            this.#enabledSystems.add(systemKey);
        }
    }

    removeSystem(systemKey) {
        this.#enabledSystems.delete(systemKey);
        this.#systems.delete(systemKey);
    }

    get world() { return this.#world; }

    get sprites() {
        return this.#sprites;
    }

    get groups() {
        return this.#groups;
    }

    get textures() {
        return this.#textures;
    }

    get anims() {
        return this.#anims;
    }

}
