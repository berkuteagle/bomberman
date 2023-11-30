import ECS from './ECS';
import System from './System';

/**
 * Base Feature class
 */
export default class Feature<TConfig> {

    #ecs: ECS;
    #config: TConfig;
    #systems = new Map<string, System>();
    #enabledSystems = new Set<string>();

    constructor(ecs: ECS, config: TConfig) {
        this.#ecs = ecs;
        this.#config = config;
    }

    get ecs(): ECS {
        return this.#ecs;
    }

    get config(): TConfig {
        return this.#config;
    }

    get systems() {
        return this.#systems;
    }

    addSystem(key: string, system: System): void {
        this.#systems.set(key, system);
        this.#enabledSystems.add(key);
    }

    removeSystem(key: string): void {
        this.#systems.delete(key);
        this.#enabledSystems.delete(key);
    }

    disableSystem(key: string): void {
        this.#enabledSystems.delete(key);
    }

    enableSystem(key: string): void {
        if (this.#systems.has(key)) {
            this.#enabledSystems.add(key);
        }
    }

    init() { }

    destroy() {
        for (const system of this.#systems.values()) {
            system.destroy();
        }
        this.#systems.clear();
    }

    preUpdate(time: number, delta: number): void {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey)!.preUpdate(time, delta);
        }
    }

    update(time: number, delta: number): void {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey)!.update(time, delta);
        }
    }

    postUpdate(time: number, delta: number): void {
        for (const systemKey of this.#enabledSystems) {
            this.#systems.get(systemKey)!.postUpdate(time, delta);
        }
    }

    static defaultConfig() {
        return {};
    }
}
