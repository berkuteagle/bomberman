import {
    defineQuery,
    enterQuery
} from 'bitecs';
import {
    ControlKeyCode,
    ControlKeyDownEvent,
    Position,
    System
} from '../../ecs.js';
import { withPlaceBombRequest } from '../bomb.js';

export default class InputEventsSystem extends System {

    #player;
    #inputEventsQuery;

    constructor(ecs, player) {
        super(ecs);

        this.#player = player;
        this.#inputEventsQuery = enterQuery(defineQuery([ControlKeyDownEvent]));
    }

    update() {
        for (const request of this.#inputEventsQuery(this.ecs.world)) {
            if (ControlKeyDownEvent.code[request] === ControlKeyCode.BUTTON_A) {
                this.ecs.request(
                    withPlaceBombRequest(
                        Position.x[this.#player.eid],
                        Position.y[this.#player.eid]
                    )
                )
            }
        }
    }
}
