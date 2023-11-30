import './index.css';

import Bomberman from './game/Bomberman';

declare global {
    var bomberman: Bomberman;
}

window.bomberman = new Bomberman();
