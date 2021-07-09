import Connection from './connection.js';
import Level from './level.js';

const connection = new Connection();
const level = new Level();

console.log(connection);
console.log(level);

window.con = connection;
window.lvl = level;