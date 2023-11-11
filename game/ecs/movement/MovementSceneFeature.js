
import { BaseSceneFeature } from '../common.js';

import { createMovementAnimationSystem, createMovementSystem } from './system.js';

export default class MovementSceneFeature extends BaseSceneFeature {

    create() {

        this.scene.ecs.addSystem('movement', createMovementSystem());
        this.scene.ecs.addSystem('movementAnimation', createMovementAnimationSystem());

        super.create();
    }

}
