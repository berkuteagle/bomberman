import Ninja from './actor/ninja.js';

export default class Player extends Ninja {
    constructor(scene, x, y) {
        super(scene, x, y, 'GreenNinja');
    }

    update() {

    }
}