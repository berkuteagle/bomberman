import { vue } from './deps.js';

const players = vue.ref([]);
const connected = vue.ref(false);

export {
    players,
    connected
};
