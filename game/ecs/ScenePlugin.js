import { createWorld } from '../bitecs.js';
import { Animations, Plugins, Scenes, Textures } from '../phaser.js';

export default class SceneWorldPlugin extends Plugins.ScenePlugin {

    #world;
    #features = new Map();
    #enabledFeatures = new Set();

    #updateSystems = new Map();

    #texturesIndex = new Map();
    #textures = new Map();

    #animationsIndex = new Map();
    #animations = new Map();

    #groupsIndex = new Map();
    #groups = new Map();

    #spritesMap = new Map();

    constructor(scene, pluginManager) {

        super(scene, pluginManager);

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

        //TODO
        for (const system of this.#updateSystems.values()) {
            system(this.#world, time, delta);
        }

        for (const featureKey of this.#enabledFeatures) {
            this.#features.get(featureKey).postUpdate(time, delta);
        }
    }

    #addTexture(key, texture) {

        const index = this.#texturesIndex.size;

        this.#texturesIndex.set(key, index);
        this.#textures.set(index, [key, texture]);

    }

    #addAnimation(key, animation) {

        const index = this.#animationsIndex.size;

        this.#animationsIndex.set(key, index);
        this.#animations.set(index, [key, animation]);

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

    addSystem(key, systemFn) {

        this.#updateSystems.set(key, systemFn);

    }

    removeSystem(key) {

        return this.#updateSystems.delete(key);

    }

    get world() { return this.#world; }

    addSprite(index, sprite) {
        this.#spritesMap.set(index, sprite);
    }

    removeSprite(index) {
        this.#spritesMap.get(index).destroy();
        this.#spritesMap.delete(index);
    }

    getSprite(index) {
        return this.#spritesMap.get(index);
    }

    addGroup(key, group) {
        const index = this.#groupsIndex.size;

        this.#groupsIndex.set(key, index);
        this.#groups.set(index, [key, group]);
    }

    getGroupKey(index) {
        return this.#groups.get(index)[0];
    }

    getGroup(index) {
        return this.#groups.get(index)[1];
    }

    getGroupIndex(key) {
        return this.#groupsIndex.get(key);
    }

    getTextureKey(index) {
        return this.#textures.get(index)[0];
    }

    getTexture(index) {
        return this.#textures.get(index)[1];
    }

    getTextureIndex(key) {
        return this.#texturesIndex.get(key);
    }

    getAnimationKey(index) {
        return this.#animations.get(index)[0];
    }

    getAnimation(index) {
        return this.#animations.get(index)[1];
    }

    getAnimationIndex(key) {
        return this.#animationsIndex.get(key);
    }
}
