import { defineQuery } from '../../bitecs.js';
import { System } from '../../ecs.js';

import { ControlKeyDownEvent, ControlKeysState } from './components.js';

export default class ControlSystem extends System {

    #controlEvents;
    #controlKeysState;

    constructor(ecs) {
        super(ecs);

        this.#controlEvents = defineQuery([ControlKeyDownEvent]);
        this.#controlKeysState = defineQuery([ControlKeysState]);
    }

    update() {
        for (const event of this.#controlEvents(this.ecs.world)) {
            console.log('control event. code: ', ControlKeyDownEvent.code[event]);
        }

        for (const entity of this.#controlKeysState(this.ecs.world)) {
            if (ControlKeysState.state[entity]) {
                console.log('control keys state: ', ControlKeysState.state[entity]);
            }
        }
    }

}
