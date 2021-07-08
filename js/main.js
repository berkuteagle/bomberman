import Connection from './connection.js';

const peer = new Peer(null, {});
const connection = new Connection(peer);

console.log(connection);

window.con = connection;