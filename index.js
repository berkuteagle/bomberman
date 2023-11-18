import Bomberman from './game/Bomberman.js';

window.bomberman = new Bomberman();

if ('serviceWorker' in navigator) {
    if (location.hostname === 'berkuteagle.github.io') {
        navigator.serviceWorker.register('/bomberman/sw.js', { scope: '/bomberman/' });
    } else {
        navigator.serviceWorker.register('/sw.js');
    }
}
