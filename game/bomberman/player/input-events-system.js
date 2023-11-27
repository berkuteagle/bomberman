import {
    defineQuery,
    enterQuery
} from '../../bitecs.js';
import {
    ControlKeyCode,
    ControlKeyDownEvent,
    Position,
    System
} from '../../ecs.js';
import { withPlaceBombRequest } from '../bomb.js';

export default class InputEventsSystem extends System {

    #playerEid;
    #inputEventsQuery;

    constructor(ecs, playerEid) {
        super(ecs);

        this.#playerEid = playerEid;
        this.#inputEventsQuery = enterQuery(defineQuery([ControlKeyDownEvent]));
    }

    update() {
        for (const request of this.#inputEventsQuery(this.ecs.world)) {
            if (ControlKeyDownEvent.code[request] === ControlKeyCode.BUTTON_A) {
                this.ecs.request(
                    withPlaceBombRequest(
                        Position.x[this.#playerEid],
                        Position.y[this.#playerEid]
                    )
                )
            }
        }
    }
}
